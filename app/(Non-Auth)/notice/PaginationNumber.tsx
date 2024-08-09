'use client'
import React from 'react'
import styles from "@/app/styles/Boards.module.scss";
import Link from 'next/link';

const PaginationNumber = ({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) => {
  const {
    paginationNumberBar,
    "rounded-l-md": roundedLeftMD,
    "rounded-r-md": roundedRightMD,
    active,
    "text-gray-300": textGray300,
  } = styles;

  const className = `
  ${paginationNumberBar} 
    ${position === "first" || position === "single" ? ` ${roundedLeftMD}` : ""}
    ${position === "last" || position === "single" ? ` ${roundedRightMD}` : ""}
    ${isActive ? ` ${active}` : ""}
    ${position === "middle" ? ` ${textGray300}` : ""}`;
  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link className={className} href={href}>
      {page}
    </Link>
  );
};


export default PaginationNumber