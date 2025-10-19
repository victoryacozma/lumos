import { supabase } from "@/lib/supabase";
import { energyEntriesService, EnergyEntry } from "@/service/EnergyEntry";
import { useGlobalRefetch } from "@/hooks/useGlobalRefetch";

import { useEffect, useState, useCallback } from "react";

export function useEnergyEntries() {
  const [entries, setEntries] = useState<EnergyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { registerRefetch } = useGlobalRefetch();

  // Debug: Log when entries state changes
  useEffect(() => {
    console.log(
      "🏪 useEnergyEntries: State updated with",
      entries?.length || 0,
      "entries"
    );
  }, [entries]);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await energyEntriesService.getAll();
      console.log("📊 useEnergyEntries: Fetched", data?.length || 0, "entries");
      setEntries(data);
      setError(null);
    } catch (err) {
      console.error("❌ useEnergyEntries: Error fetching entries:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
    console.log("Setting up real-time subscription for energy entries");

    // Register for global refetch
    const unregister = registerRefetch(fetchEntries);

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
        (payload) => {
          console.log("🔔 Real-time update received:", payload.eventType);
          // Add a small delay to ensure data is consistent
          setTimeout(() => {
            fetchEntries();
          }, 100);
        }
      )
      .subscribe();

    return () => {
      console.log("Unsubscribing from real-time updates");
      unregister();
      subscription.unsubscribe();
    };
  }, [fetchEntries, registerRefetch]);

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
