import { Trophy } from "lucide-react";

export const metadata = { title: "Achievements" };

export default function AchievementsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="h-16 w-16 rounded-2xl bg-gold/20 flex items-center justify-center mb-6" style={{ boxShadow: "0 0 30px rgba(245, 158, 11, 0.2)" }}>
        <Trophy className="h-8 w-8 text-gold" />
      </div>
      <h1 className="text-2xl font-bold text-white">Achievements</h1>
      <p className="mt-2 text-slate-400 max-w-sm">
        Your milestones, badges, and learning streaks will be tracked here.
        Feature coming soon!
      </p>
    </div>
  );
}
