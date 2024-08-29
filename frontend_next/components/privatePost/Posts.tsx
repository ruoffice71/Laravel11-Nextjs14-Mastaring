"use client";
import React,{useState, useEffect} from 'react';
import {useImmer} from 'use-immer';
import PostCard from './PostCard';
import { laraEcho, pvtLaralEcho} from '@/lib/echo.config';
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';

export default function Posts({data, user}:{data:ApiResponseType<PostType>, user:CustomUser}) {
    const [posts, setPosts] = useImmer<ApiResponseType<PostType>> (data)

    useEffect(() => {
      /* const pvtLaraEcho = pvtLaralEcho(user.token!);
      pvtLaraEcho.private(`App.Models.User.${user.id}`)
      .listen("TestEvent", (event:any) => {
        console.log("The private realtime data is:", event);
      });

      return () => {
        pvtLaraEcho.leave(`App.Models.User.${user.id}`);
      }; */

      laraEcho.channel("post-broadcast")
      .listen("PostBroadCastEvent", (event:any) => {
        console.log("The realtime data is:", event);
        const post:PostType = event.post;
        setPosts((prevState) => {
          prevState.data = [post, ...prevState.data];
        });
      })
      .listen("PostCommentCountEvent", (event:any) => {
        console.log("The comment count increment:", event);
        setPosts((prev) => {
          const index = prev.data.findIndex((item) => item.id === event.post_id);
          if (index != -1) {
            prev.data[index].comment_count += 1;
          }
        });
      });

      return () => {
        laraEcho.leave(`post-broadcast`);
      };
      
    }, []);
  return (
    <div className='pt-4 p-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4' style={{ height: "90vh" }}>
        {posts.data && 
            posts.data.length > 0 && 
            posts.data.map((item, index) => <PostCard post={item} key={index} />)}
    </div>
  )
}
