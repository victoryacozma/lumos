export interface EnergyEntry {
  date: string; // ISO date
  type: "energizing" | "draining";
  activity: string;
  description?: string;
  intensity: number;
  category:
    | "people"
    | "work"
    | "hobbies"
    | "nature"
    | "exercise"
    | "learning"
    | "rest"
    | "creativity"
    | "food"
    | "other";
  mood_before?: number;
  mood_after?: number;
  reflection?: string;
}
