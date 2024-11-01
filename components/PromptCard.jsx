"use client"
import { useState } from "react";
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const [copied, setCopied] = useState("");
  const {data: session} = useSession();
  const router = useRouter();
  const pathName = usePathname();


  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);

  }

  const handleProfileClick = () => {
    console.log(post);
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  }

  return (
    <div className="prompt_card flex flex-col justify-start p-4">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex flex-row justify-between gap-3 cursor-pointer w-full relative">
          {/* User Info */}
          <div className="flex flex-row items-center gap-3" onClick={handleProfileClick}>
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col justify-center items-start">
              <h3>{post.creator.username}</h3>
              <p className="text-gray-600">{post.creator.email}</p>
            </div>
          </div>

          {/* Copy Button */}
          <div className="copy_btn absolute bottom-30 right-0" onClick={handleCopy}>
            <Image
              src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
              width={12}
              height={12}
              alt="logo"
            />
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick (post.tag)}>{post.tag}</p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}
          >
            Edit
          </p>
          <p
          className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )} 
    </div>

  )
}

export default PromptCard