'use client'

import React, { useState } from 'react'
import styles from '@/app/styles/AccommmodationDetail.module.scss'
import { createClient as DB } from '@/supabase/clientt'
import { useParams } from 'next/navigation'

interface LikeButtonProps {
  user: string | null
  // 이미 좋아요한 상태라면 true, 아니면 false
  initialLiked?: boolean
}

export const LikeButton = ({ user, initialLiked }: LikeButtonProps) => {
  const [isClicked, setIsClicked] = useState(initialLiked)
  const param = useParams()
  const supabaseDB = DB()

  const handleLikeUpdate = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }


    // 먼저 현재 좋아요 상태(레코드 존재 여부)를 확인합니다.
    const { data: existingLikes, error: selectError } = await supabaseDB
      .from('likes')
      .select('id')
      .eq('accom', Number(param.id))
      .eq('users', user)

    if (selectError) {
      console.error(selectError)
      alert('좋아요 상태 확인 중 오류가 발생했습니다.')
      return
    }

    // 이미 좋아요가 되어 있다면, 좋아요 해제(삭제) 진행
    if (existingLikes && existingLikes.length > 0) {
      // 좋아요 해제: delete 쿼리 실행
      const { error } = await supabaseDB
        .from('likes')
        .delete()
        .eq('accom', Number(param.id))
        .eq('users', user)

      if (error) {
        console.error(error)
        alert('좋아요 해제 중 오류가 발생했습니다.')
        return
      }

      alert('좋아요 해제되었습니다.')
      setIsClicked(false)
    } else {
      // 좋아요 등록: insert 실행
      const { error } = await supabaseDB
        .from('likes')
        .insert({
          like: true,
          accom: Number(param.id),
          users: user
        })

      if (error) {
        console.error(error)
        alert('좋아요 등록 중 오류가 발생했습니다.')
        return
      }

      alert('좋아요 등록되었습니다.')
      setIsClicked(true)
    }
  }

  return (
    <div className={styles.likesButtonContainer}>
      <button onClick={handleLikeUpdate}>
      <svg 
      style={{ fill: isClicked ? "red" : "" }} 
      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </button>
    </div>
  )
}
