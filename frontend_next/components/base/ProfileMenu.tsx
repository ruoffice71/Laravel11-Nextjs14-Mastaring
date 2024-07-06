"use client"
import React, {useState} from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from '../common/UserAvatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import myAxios from '@/lib/axios.config'
import { LOGOUT_URL, UPDATE_PROFILE } from '@/lib/apiEndPoint'
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions'
import { toast } from 'react-toastify'

import { signOut } from 'next-auth/react'
import { Input } from '../ui/input'
import { useSession } from 'next-auth/react'

  
export default function ProfileMenu() {
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<File|null>(null)
  const [errors, setErrors] = useState({
    profile_image:[]
  })

  const {data, update} = useSession()
  const user = data?.user as CustomUser

  const handleImageChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log("Selected file is: ", file);
    if (file) {
      setImage(file)
    }
  }

  const updateProfile = (event:React.FormEvent) => {
    event.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("profile_image", image??"");
    myAxios.post(UPDATE_PROFILE, formData, {
      headers:{
        Authorization:`Bearer ${user.token}`
      }
    }).then((res) => {
      const response = res.data
      update({profile_image:response.image})
      toast.success("Profile updated successfully!")
      setLoading(false)
      setProfileOpen(false)
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

  const logoutUser = async () => {
    // console.log('logout', user);
    myAxios.post(LOGOUT_URL, {}, {headers: {
        Authorization: `Bearer ${user.token}`
    }}).then((res) =>  {
      signOut({
        callbackUrl:"/login",
        redirect:true
      })
    })
    .catch((err) => {
      toast.error("Something went wrong!")
    })
  }
  return (
    <div>

        {/* Logout Dialog  */}
        <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
          {/* <DialogTrigger>Open</DialogTrigger> */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action expire your current session. To access homepage you need to login again!
              </DialogDescription>
            </DialogHeader>
            <div className='flex justify-end space-x-4'>
              <Button variant="destructive" onClick={logoutUser}>Yes Logout!</Button>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        {/* Profile Updade Dialog  */}
        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          {/* <DialogTrigger>Open</DialogTrigger> */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={updateProfile}>
              <div className='mb-2'>
                <label htmlFor="profile_image">Profile Image</label>
                <Input 
                  type='file'
                  className='file:text-white' 
                  accept='image/png, image/svg, image/jpg, image/jpeg, image/gif, image/webp'
                  onChange={handleImageChange}
                />
              </div>
              <div className="mb-2">
                <Button className='w-full' disabled={loading}>{loading ? "Processing.." : "Update Profile"}</Button>
              </div>
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar image={user?.profile_image ?? undefined}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setProfileOpen(true)}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLogoutOpen(true)}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
