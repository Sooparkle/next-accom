'use client'
import Link from 'next/link';
import React from 'react';
import styles from "@/app/styles/Boards.module.scss";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";



const PaginationArrow = ({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled: boolean;
}) => {
  const icon = direction === 'left' ? <BiLeftArrow /> : <BiRightArrow />;

  const className = styles.arrowDirection;

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
};

export default PaginationArrow