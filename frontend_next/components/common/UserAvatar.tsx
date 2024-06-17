import Image from 'next/image'
import React from 'react'

export default function UserAvatar({image}:{image?:string}) {
  return (
    <div>
        {image ? <Image src="{image}" alt="avatar" width={40} height={40} /> : <Image src="/avatar.png" alt="avatar" width={40} height={40} />}
    </div>
  )
}
