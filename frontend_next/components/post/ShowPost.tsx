import React, {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image'
  

export default function ShowPost({children, post}:{children:React.ReactNode, post:PostType}) {
    const [open, setOpen] = useState(false)
  return (
    <div>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className='w-full lg:min-w-[700] max-h-screen overflow-y-scroll'>
                <DialogHeader>
                    <DialogTitle>Show Post</DialogTitle>
                </DialogHeader>
                <div>
                    <h1 className='text-3xl font-bold'>{post.title}</h1>
                    <Image 
                        src={post.image_url}
                        width={400}
                        height={400}
                        alt='Post Image'
                        className='w-full rounded-lg my-2'
                    />
                    <p>{post.description}</p>
                </div>
            </DialogContent>
        </Dialog>

    </div>
  )
}
