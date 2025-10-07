import { supabase } from "@/lib/supabase";
import { energyEntriesService, EnergyEntry } from "@/service/EnergyEntry";

import { useEffect, useState } from "react";

export function useEnergyEntries() {
  const [entries, setEntries] = useState<EnergyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();

    // Set up real-time subscription
    const subscription = supabase
      .channel("energy_entries_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "energy_entries",
        },
        () => {
          fetchEntries();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const data = await energyEntriesService.getAll();
      setEntries(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { entries, loading, error, refetch: fetchEntries };
}

export function useEnergyStats() {
  const [stats, setStats] = useState({
    totalEntries: 0,
    energizingCount: 0,
    drainingCount: 0,
    averageEnergyLevel: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await energyEntriesService.getStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refetch: fetchStats };
}
