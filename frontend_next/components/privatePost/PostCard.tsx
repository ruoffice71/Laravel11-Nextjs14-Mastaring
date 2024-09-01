import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import UserAvatar from '../common/UserAvatar'
import Image from 'next/image'
import { SquarePen, LinkIcon, MessageSquare } from 'lucide-react'
import { formatDate, trimString } from '../../lib/utils';
import { toast } from 'react-toastify'
import ShowPost from './ShowPost'
import EditPost from './EditPost'

export default function PostCard({post}:{post:PostType}) {
    const copyUrl = () => {
        navigator.clipboard.writeText(post.url)
        toast.success("Link copied successfully!");
    }
  return (
    <div>
        <Card className='w-full md:w-[300px] md:h-[500px] bg-muted'>
            <ShowPost post={post}>
                <div>
                    <CardHeader>
                        <UserAvatar image={post.user.profile_image} />
                        <CardTitle className='text-2xl font-bold'>{trimString(post.title)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-sm mb-2 px-2'>{formatDate(post.created_at)}</p>
                        <figure>
                            <Image src={post.image_url} 
                            alt="post" 
                            width={250} height={250} 
                            className="w-full h-40 object-cover rounded-lg" />
                        </figure>
                    </CardContent>
                </div>
            </ShowPost>
            <CardFooter className='flex justify-between items-center'>
                <EditPost post={post}>
                    <SquarePen size={25}/>
                </EditPost>
                <div className='flex space-x-2 items-center'>
                    <MessageSquare size={20}/>
                    {post.comment_count > 0 && <span>{post.comment_count}</span>}
                </div>
                <LinkIcon size={20} onClick={() => copyUrl()}/>
            </CardFooter>
        </Card>

    </div>
  )
}
