import { BadgeCheck } from "lucide-react";

export const metadata = { title: "Certifications" };

export default function CertificationsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="h-16 w-16 rounded-2xl bg-emerald/20 flex items-center justify-center mb-6" style={{ boxShadow: "0 0 30px rgba(16, 185, 129, 0.2)" }}>
        <BadgeCheck className="h-8 w-8 text-emerald" />
      </div>
      <h1 className="text-2xl font-bold text-white">Certifications</h1>
      <p className="mt-2 text-slate-400 max-w-sm">
        Download your certificates of completion here once you finish a course.
        Feature coming soon!
      </p>
    </div>
  );
}
