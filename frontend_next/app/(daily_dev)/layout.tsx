import Navbar from "@/components/base/Navbar";
import Sidebar from "@/components/base/Sidebar";

export default function DailyDevLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <div className="h-screen">
        <Navbar/>
        <div className="flex">
            <Sidebar/>
            {children}
        </div>
     </div>
    );
  }
  