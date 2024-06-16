import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div>Hey I'm app folder's page.tsx

      <Button>Click Here</Button>

      <p>{JSON.stringify(session)}</p>

    </div>
  );
}
