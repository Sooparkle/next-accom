import Link from 'next/link';
import React from 'react';

export const BackButton = () => {

  return (
    <div
      className='backBtn'
    >
      <Link
        href="/mypage"
        >뒤로가기
      </Link>
    </div>
  )
}

export default BackButton