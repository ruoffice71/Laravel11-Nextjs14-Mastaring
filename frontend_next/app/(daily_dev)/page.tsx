import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/authOptions";
import { fetchPosts } from "@/dataFatch/postFatch";
import Posts from "@/components/post/Posts";

export default async function Home() {
  const session:CustomSession | null = await getServerSession(authOptions);
  const posts:ApiResponseType<PostType> = await fetchPosts(session?.user?.token!)
  return (
    <div>
      <Posts data={posts} user={session?.user!}/>
    </div>
  );
}
