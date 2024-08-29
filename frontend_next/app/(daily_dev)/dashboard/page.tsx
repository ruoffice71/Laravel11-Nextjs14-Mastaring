import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { fetchPrivatePosts } from "@/dataFatch/privatePostFatch";
import Posts from "@/components/privatePost/Posts";

export default async function Home() {
  const session:CustomSession | null = await getServerSession(authOptions);
  const posts:ApiResponseType<PostType> = await fetchPrivatePosts(session?.user?.token!)
  return (
    <div>
      <h1>My Posts:</h1>
      <Posts data={posts} user={session?.user!}/>
    </div>
  );
}
