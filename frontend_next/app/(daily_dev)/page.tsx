import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Navbar from "@/components/base/Navbar";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <h1>I'm Homepage</h1>
    </div>
  );
}
