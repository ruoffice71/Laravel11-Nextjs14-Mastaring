import Link from 'next/link'
import React from 'react'
import UserAvatar from '../common/UserAvatar'
import { ArrowBigUp, Flame, Search, Link as LinkIcon } from 'lucide-react'
import SidebarLinks from './SidebarLinks'

export default function Sidebar() {
  return (
    <div className='hidden lg:block w-[260px] border-r p-4 h-full'>
        <SidebarLinks/>
    </div>
  )
}
