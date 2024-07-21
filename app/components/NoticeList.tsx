"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Boards.module.scss";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface noticeContentsProps {
  id: number;
  title: string;
  created_at: string;
  index: number;
}

interface dataType {
  data: noticeContentsProps[];
  totalPages: number;
}

const NoticeList = ({ data, totalPages }: dataType) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState(page);

  console.log("dd",searchParams);
  console.log("dd",pathname);
  const maxVisiblePages = 5;

  const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  return (
    <>
      <ul className={styles.noticeListWrap}>
        {data.map((item, index) => {
          const { id, title, created_at } = item;
          const formatDate = new Date(created_at).toLocaleDateString("en-CA");

          return (
            <li className={styles.noticeEachWrap} key={index}>
              <Link href={`notice/${id}`} className={styles.noticeEachTitle}>
                {title}
              </Link>
              <p className={styles.noticeEachId}>{formatDate}</p>
            </li>
          );
        })}
      </ul>

      <div className={styles.pagination}>
        <button
          className={styles.pageLink}
          disabled={page <= 1}
          onClick={() =>
            (window.location.href = `${pathname}?page=${page - 1}`)
          }
        >
          Prev
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => i + 1).map(
          (pageNum) => (
            <Link
              key={pageNum}
              href={`${pathname}?page=${pageNum}`}
              className={`${styles.pageLink}  ${pageNum === page ? styles.activePageLink : ""} `}
            >
              {pageNum}
            </Link>
          )
        )}
        <button
          className={styles.pageLink}
          disabled={page >= totalPages}
          onClick={() =>
            (window.location.href = `${pathname}?page=${page + 1}`)
          }
        >
          Next
        </button>
      </div>
    </>
  );
};

export default NoticeList;
