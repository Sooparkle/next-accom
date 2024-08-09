"use client";
import React from "react";
import styles from "@/app/styles/Boards.module.scss";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "../../util/paginationArray";
import PaginationNumber from "./PaginationNumber";
import PaginationArrow from "./PaginationArrow";



interface noticeContentsProps {
  id : string;
  created_at : string;
  title : string;
  description : string;
  numbers : number;
}

interface dataType {
  data: noticeContentsProps[] | null;
  totalPages: number;
}

const NoticeList = ({ data:propData, totalPages }: dataType) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;



  
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  let totalPageCounter =  totalPages ? totalPages : 0;
  const data = propData ? propData : 0 ;
  const allPages = generatePagination(currentPage, totalPageCounter)();


  return (
    <>
      {/* contents body */}
      <ul className={styles.noticeListWrap}>
        {data && data.map((item, index) => {
          const { id, title, created_at, numbers } = item;
          const formatDate = new Date(created_at).toLocaleDateString("en-CA");

          return (
            <li className={styles.noticeEachWrap} key={index}>
              <Link
                href={`notice/${numbers}`}
                className={styles.noticeEachTitle}
              >
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
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

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



