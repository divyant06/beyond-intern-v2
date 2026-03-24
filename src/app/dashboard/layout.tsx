import { Sidebar } from "@/components/dashboard/sidebar";
import { TopHeader } from "@/components/dashboard/top-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Beyond Intern student dashboard — track courses, achievements, and certifications.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-navy">
      <Sidebar />
      <div className="flex flex-1 flex-col ml-[256px]">
        <TopHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
