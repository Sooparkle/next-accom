import React from 'react';
import styles from '../../../styles/Setting.module.scss';
import Link from 'next/link';


interface noticeContentsProps {
  id:number,
  title : string,
  description : string
}



const NoticeList = ({
  id,
  title,
  description
} : noticeContentsProps) => {
  return (
    <>
    {
      <li
        className={styles.noticeEachWrap}
      >
        <p className={styles.noticeEachId}>{id}</p>
        <Link 
          href={`notice/${id}`}
          className={styles.noticeEachTitle}
        >
          {title}
        </Link>
      </li>
    }
    </>
  )
}


const page = () => {

  const noticeContents : noticeContentsProps[]=[
    {
      id : 1,
      title : "2024.03 홈페이지 오픈",
      description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis atque eos rem vel natus reprehenderit dicta culpa alias, fuga iusto illo ut dolorem architecto maiores esse at magni, iste optio!"
    },
    {
      id : 2,
      title : "좀쉼쉼 홈페이지 오픈 이벤트를 진행하오니 많은 참여 하겠습니다.",
      description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis atque eos rem vel natus reprehenderit dicta culpa alias, fuga iusto illo ut dolorem architecto maiores esse at magni, iste optio!"
    },
    {
      id : 3,
      title : "점검 안내, 2024년 6월 홈페이지 점검 안내",
      description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis atque eos rem vel natus reprehenderit dicta culpa alias, fuga iusto illo ut dolorem architecto maiores esse at magni, iste optio!"
    },
    {
      id : 4,
      title : "숙박 선택 시 유의해야 할 사항",
      description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis atque eos rem vel natus reprehenderit dicta culpa alias, fuga iusto illo ut dolorem architecto maiores esse at magni, iste optio!"
    },

  ]




  
  return (
    <main
      className={styles.mypageMain}
    >
      
      {/* head area */}
      <section
        className={styles.head}
      >
        <h3>공지사항</h3>
      </section>

      {/* notice body */}
      <article
        className={styles.mypageNotice}
      >
        <div
          className={styles.noticeHeader}
        >
          <p>번호</p>
          <p>제목</p>
        </div>

        <ul
          className={styles.noticeListWrap}
        >
          {
            noticeContents.map((item, index) =>(
              <NoticeList {...item} key={item.id} />
            ))
          }

        </ul>

      </article>
    </main>
  )
}

export default page