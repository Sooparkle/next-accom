import Link from 'next/link';
import React from 'react';

interface BackButtonType {
  href : string
}

export const BackButton = ({href} : BackButtonType) => {

  return (
    <div
      className='backBtn'
    >
      <Link
        href={href}
        >뒤로가기
      </Link>
    </div>
  )
}

export default BackButton