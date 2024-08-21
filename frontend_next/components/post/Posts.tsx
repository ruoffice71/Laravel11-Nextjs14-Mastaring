"use client";
import React,{useState, useEffect} from 'react';
import PostCard from './PostCard';
import { laraEcho, pvtLaralEcho} from '@/lib/echo.config';
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';

export default function Posts({data, user}:{data:ApiResponseType<PostType>, user:CustomUser}) {
    const [posts, setPosts] = useState<ApiResponseType<PostType>> (data)

    useEffect(() => {
      /* const pvtLaraEcho = pvtLaralEcho(user.token!);
      pvtLaraEcho.private(`App.Models.User.${user.id}`)
      .listen("TestEvent", (event:any) => {
        console.log("The private realtime data is:", event);
      });

      return () => {
        pvtLaraEcho.leave(`App.Models.User.${user.id}`);
      }; */

      laraEcho.channel("test-channel")
      .listen("TestEvent", (event:any) => {
        console.log("The realtime data is:", event);
      });

      return () => {
        laraEcho.leave("test-channel");
      };
      
    }, []);
  return (
    <div className='pt-4 p-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
        {posts.data && 
            posts.data.length > 0 && 
            posts.data.map((item, index) => <PostCard post={item} key={index} />)}
    </div>
  )
}
