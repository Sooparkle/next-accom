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
        <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              clipRule="evenodd"
              d="M12.1904 2.64611C12.9026 1.09713 15.0974 1.09713 15.8096 2.64611L18.607 8.72957L25.2394 9.51836C26.9281 9.71921 27.6063 11.813 26.3578 12.9711L21.4543 17.5197L22.7559 24.0907C23.0874 25.7638 21.3118 27.0578 19.8279 26.2246L14 22.9523L8.17211 26.2246C6.6882 27.0578 4.91264 25.7638 5.24406 24.0907L6.54569 17.5197L1.64223 12.9711C0.3937 11.813 1.07191 9.71921 2.76065 9.51836L9.39298 8.72957L12.1904 2.64611ZM14.4543 4.4713C14.2758 4.08315 13.7242 4.08315 13.5457 4.4713L11.2026 9.56685C10.9123 10.1981 10.3159 10.6328 9.62762 10.7147L4.06902 11.3758C3.64578 11.4261 3.47555 11.949 3.78803 12.2388L7.89874 16.0521C8.40759 16.5241 8.63541 17.2274 8.50034 17.9093L7.40955 23.4159C7.32661 23.8346 7.77263 24.158 8.14481 23.949L13.0266 21.208C13.6314 20.8684 14.3686 20.8684 14.9734 21.208L19.8552 23.949C20.2274 24.158 20.6734 23.8346 20.5905 23.4159L19.4997 17.9093C19.3646 17.2274 19.5924 16.5241 20.1013 16.0521L24.212 12.2388C24.5244 11.949 24.3542 11.4261 23.931 11.3758L18.3724 10.7147C17.6841 10.6328 17.0877 10.1982 16.7974 9.56685L14.4543 4.4713Z"
              fill={isClicked ? 'red' : '#000000'}
              fillRule="evenodd"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  )
}
