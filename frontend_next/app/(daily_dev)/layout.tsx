import Navbar from "@/components/base/Navbar";
import Sidebar from "@/components/base/Sidebar";

export default async function DailyDevLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <div className="h-screen">
        <Navbar/>
        <div className="flex">
            <Sidebar/>
            <div className="flex justify-center items-center w-full">
              {children}
            </div>
        </div>
     </div>
    );
  }
  