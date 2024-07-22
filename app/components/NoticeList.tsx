"use client";

import React from "react";
import styles from "../styles/Boards.module.scss";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BiLeftArrow,BiRightArrow } from "react-icons/bi";
import { generatePagination } from "../util/paginationArray";


interface noticeContentsProps {
  id: number;
  title: string;
  created_at: string;
  numbers : number;
  index: number;
}

interface dataType {
  data: noticeContentsProps[];
  totalPages: number;
}

const NoticeList = ({ data, totalPages }: dataType) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);


  // const maxVisiblePages = Math.min(5, totalPages);
  // const startPage = Math.max(1, currentPage - Math.floor((visiblePageCount - 1) / 2));
  // const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);
  // console.log(startPage)
  // console.log(endPage)

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <ul className={styles.noticeListWrap}>
        {data.map((item, index) => {
          const { id, title, created_at, numbers } = item;
          const formatDate = new Date(created_at).toLocaleDateString("en-CA");

          return (
            <li className={styles.noticeEachWrap} key={index}>
              <Link href={`notice/${numbers}`} className={styles.noticeEachTitle}>
                {title}
              </Link>
              <p className={styles.noticeEachId}>{formatDate}</p>
            </li>
          );
        })}
      </ul>


      {/* pagination area */}
      <div className={styles.pagination}>

        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />

      </div>
    </>
  );
};

export default NoticeList;

const PaginationNumber = ({
  page,
  href,
  isActive,
  position,
}:{
  page : number | string;
  href : string;
  position? : 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;

}) => {
  const { 
    paginationNumberBar, 
    'rounded-l-md': roundedLeftMD, 
    'rounded-r-md': roundedRightMD, 
    active, 
    'text-gray-300': textGray300 
  } = styles;


  const className = `
  ${paginationNumberBar} 
    ${position === 'first' || position === 'single' ? ` ${roundedLeftMD}` : ''}
    ${position === 'last' || position === 'single' ? ` ${roundedRightMD}` : ''}
    ${isActive ? ` ${active}` : ''}
    ${position === 'middle' ? ` ${textGray300}` : ''}`;
  return isActive || position === 'middle' ? (
    <div
      className={className}
    >{page}</div>
  ) : (
    <Link className={className}  href={href} >{page}</Link>
  );
}


const PaginationArrow = ({
  href,
  direction,
  isDisabled,
}:{
  href : string;
  direction : 'left' | 'right';
  isDisabled : boolean;

}) =>{
  const icon =
  direction === 'left' ? (
    <BiLeftArrow />
  ) : (
    <BiRightArrow />
  );

  const className =`${styles.arrowDirection}`

  return isDisabled ? (
    <div
      className={className}
    >{icon}</div>
  ) : (
    <Link
      className={className}
      href={href}
    >
      {icon}
    </Link>
  )
}