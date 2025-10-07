import { supabase } from "@/lib/supabase";

export type EnergyEntryType = "energizing" | "draining";

export interface EnergyEntryData {
  type: EnergyEntryType;
  activity: string;
  intensity: number;
  description?: string;
  reflection?: string;
}

export interface EnergyEntry extends EnergyEntryData {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const energyEntriesService = {
  // Create a new energy entry
  async create(data: EnergyEntryData): Promise<EnergyEntry> {
    const { data: user } = await supabase.auth.getUser();

    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { data: entry, error } = await supabase
      .from("energy_entries")
      .insert({
        ...data,
        user_id: user.user.id,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating energy entry:", error);
      throw new Error(error.message);
    }

    return entry;
  },

  // Get all entries for the current user
  async getAll(): Promise<EnergyEntry[]> {
    const { data: entries, error } = await supabase
      .from("energy_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching energy entries:", error);
      throw new Error(error.message);
    }

    return entries || [];
  },

  // Get entries by type
  async getByType(type: EnergyEntryType): Promise<EnergyEntry[]> {
    const { data: entries, error } = await supabase
      .from("energy_entries")
      .select("*")
      .eq("type", type)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching energy entries by type:", error);
      throw new Error(error.message);
    }

    return entries || [];
  },

  // Get recent entries (last 7 days)
  async getRecent(): Promise<EnergyEntry[]> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: entries, error } = await supabase
      .from("energy_entries")
      .select("*")
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching recent energy entries:", error);
      throw new Error(error.message);
    }

    return entries || [];
  },

  // Update an entry
  async update(
    id: string,
    data: Partial<EnergyEntryData>
  ): Promise<EnergyEntry> {
    const { data: entry, error } = await supabase
      .from("energy_entries")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating energy entry:", error);
      throw new Error(error.message);
    }

    return entry;
  },

  // Delete an entry
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("energy_entries")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting energy entry:", error);
      throw new Error(error.message);
    }
  },

  // Get statistics
  async getStats(): Promise<{
    totalEntries: number;
    energizingCount: number;
    drainingCount: number;
    averageEnergyLevel: number;
  }> {
    const entries = await this.getAll();

    const energizingEntries = entries.filter((e) => e.type === "energizing");
    const drainingEntries = entries.filter((e) => e.type === "draining");

    const totalIntensity = entries.reduce(
      (sum, entry) => sum + entry.intensity,
      0
    );
    const averageEnergyLevel =
      entries.length > 0 ? totalIntensity / entries.length : 0;

    return {
      totalEntries: entries.length,
      energizingCount: energizingEntries.length,
      drainingCount: drainingEntries.length,
      averageEnergyLevel: Math.round(averageEnergyLevel * 100) / 100,
    };
  },
};
