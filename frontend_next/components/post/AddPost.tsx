import React, {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Link as LinkIcon } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import Image from 'next/image'
import { isValidUrl } from '@/lib/utils'
import axios from 'axios'
import { toast } from 'react-toastify'
import myAxios from '@/lib/axios.config'
import { POST_URL } from '@/lib/apiEndPoint'
import { useSession } from 'next-auth/react'
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions'
  
export default function AddPost() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [postState, setPostState] = useState<PostStateType>({
        title:"",
        url:"",
        image_url:"",
        description:"",
    });
    const [errors, setErrors] = useState({
        title:[],
        url:[],
        description:[]
    })
    const {data} = useSession()
    const user:CustomUser = data?.user as CustomUser
    const loadPreview = async () => {
        if (postState?.url && isValidUrl(postState.url!)) {
            setLoading(true)
            axios.post("/api/image-preview", {url:postState.url})
            .then((res) => {
                setLoading(false)
                const response:ImagePreviewResType = res.data?.data;
                const img = response.images.length > 0 ? response.images[0] : "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true"
                setPostState({
                    ...postState,
                     image_url: img,
                     title: response.title,
                     description: response.description ?? "",
                    })
            })
            .catch((err) => {
                setLoading(false)
                toast.error("Something went wrong while fatch data from url!")
            })
        }
    }

    const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault()
        setLoading(true)
        myAxios.post(POST_URL, postState, {
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        })
        .then((res) => {
            const response = res.data
            setLoading(false)
            setPostState({})
            setOpen(false)
            toast.success("Post Added Successfully!")
        })
        .catch((err) => {
            setLoading(false)
            if (err.response?.status === 422) {
              setErrors(err.response?.data.errors);
            }
            else {
              toast.error("Something went wrong. Please try again!")
            }
          })
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <div className='flex space-x-3 items-center mv-4' onClick={() => setOpen(true)}>
            <LinkIcon className='w-5 h-5' />
            <p>Submit Artical</p>
        </div>
        </DialogTrigger>
        <DialogContent 
            onInteractOutside={(e) => e.preventDefault()} // it prevent dialog close when click outside.
            className='overflow-y-scroll max-h-screen'>
            <DialogHeader>
                <DialogTitle>Add Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                {
                    postState.image_url && (
                        <Image
                            src={postState.image_url}
                            width={450}
                            height={450}
                            alt='image_url'
                            className='object-contain w-full rounded-xl my-2'
                        />
                    )
                }
                <div className="mb-4">
                    <Label htmlFor='url'>URL</Label>
                    <Input type='text' 
                        id='url' 
                        value={postState.url} 
                        onChange={(e) => setPostState({...postState, url:e.target.value})} 
                        onBlur={() => loadPreview()}
                        placeholder='Paste your url here..'/>
                        <span className='text-red-500'>{errors.url?.[0]}</span>
                </div>
                <div className="mb-4">
                    <Label htmlFor='title'>Title</Label>
                    <Input type='text' 
                        id='title' 
                        value={postState.title} 
                        onChange={(e) => setPostState({...postState, title:e.target.value})} 
                        autoFocus
                        placeholder='Type here..'/>
                    <span className='text-red-500'>{errors.title?.[0]}</span>
                </div>
                <div className="mb-4">
                    <Label htmlFor='description'>Description</Label>
                    <Textarea 
                        id='description' 
                        value={postState.description} 
                        onChange={(e) => setPostState({...postState, description:e.target.value})} 
                        rows={10} 
                        placeholder='Type here..'/>
                        <span className='text-red-500'>{errors.description?.[0]}</span>
                </div>
                <div className="mb-4">
                    <Button className='w-full' disabled={loading}>{loading ? "Processing.." : "Submit"}</Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>

  )
}
