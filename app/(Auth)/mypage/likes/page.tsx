
import React from 'react';
import styles from '../../../styles/Mypage.module.scss';
import BackButton from '@/app/components/BackButton';
import Image from 'next/image';
import { IoCloseOutline } from "react-icons/io5";

export const runtime = 'edge';

const page = async () => {

  const likesCounter : number = 3
  const isLiked: boolean = true

  return (
    <main
      className={styles.mypageMain}
    >
      {/* header area */}
      <section
        className={styles.head}
      >
        <h3>찜한 숙소</h3>
        <p>총 : 4개</p>
      </section>

      {/* contents area */}
      {
        likesCounter > 0 &&
        <article>
          <ul
            className={styles.likesListWrap}
          >
            <li>
              <h4>하루하루하루숙소이여야</h4>
              <div
                className={styles.likesDetailWrap}
              >
                <div
                  className={styles.likesEachImageWrap}
                >
                <Image 
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  fill
                  alt='0000 숙소'
                  />
                </div>

                <div
                  className={styles.likesDetail}
                >
                  <p>HomeCation은 국내외 비즈니스 고객과 관광객 모두를 위한 프리미엄 비즈니스호텔입니다. 지하철과 공항버스를 비롯한 대중교통 이용이 매우 편리하며, 서울 도심 및 시내 관광지로의 접근성이 매우 뛰어납니다. 연회장, 휘트니스센터, 사우나 및 실외수영장을 포함한 최신시설과 차별화된 서비스로 편안한 휴식과 즐거운 여행을 만들어드릴 것입니다</p>
                  <div
                    className={styles.likesDetailPrice}
                  >
                    <p><strong>140,000 (1박)</strong></p>
                    <p>기본 인원 : <span>4</span> (최대:<span>2</span>)</p>
                  </div>
                </div>

                <button
                  className={styles.likesCancelBtn}
                >

                  <IoCloseOutline className={styles.heatFilled}/>

                </button>
              </div>
            </li>
            <li>
              <h4>하루하루하루숙소이여야</h4>
              <div
                className={styles.likesDetailWrap}
              >
                <div
                  className={styles.likesEachImageWrap}
                >
                <Image 
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  fill
                  alt='0000 숙소'
                  />
                </div>

                <div
                  className={styles.likesDetail}
                >
                  <p>HomeCation은 국내외 비즈니스 고객과 관광객 모두를 위한 프리미엄 비즈니스호텔입니다. 지하철과 공항버스를 비롯한 대중교통 이용이 매우 편리하며, 서울 도심 및 시내 관광지로의 접근성이 매우 뛰어납니다. 연회장, 휘트니스센터, 사우나 및 실외수영장을 포함한 최신시설과 차별화된 서비스로 편안한 휴식과 즐거운 여행을 만들어드릴 것입니다</p>
                  <div
                    className={styles.likesDetailPrice}
                  >
                    <p><strong>140,000 (1박)</strong></p>
                    <p>기본 인원 : <span>4</span> (최대:<span>2</span>)</p>
                  </div>
                </div>

                <button
                  className={styles.likesCancelBtn}
                >

                  <IoCloseOutline className={styles.heatFilled}/>

                </button>
              </div>
            </li>
            <li>
              <h4>하루하루하루숙소이여야</h4>
              <div
                className={styles.likesDetailWrap}
              >
                <div
                  className={styles.likesEachImageWrap}
                >
                <Image 
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  fill
                  alt='0000 숙소'
                  />
                </div>

                <div
                  className={styles.likesDetail}
                >
                  <p>HomeCation은 국내외 비즈니스 고객과 관광객 모두를 위한 프리미엄 비즈니스호텔입니다. 지하철과 공항버스를 비롯한 대중교통 이용이 매우 편리하며, 서울 도심 및 시내 관광지로의 접근성이 매우 뛰어납니다. 연회장, 휘트니스센터, 사우나 및 실외수영장을 포함한 최신시설과 차별화된 서비스로 편안한 휴식과 즐거운 여행을 만들어드릴 것입니다</p>
                  <div
                    className={styles.likesDetailPrice}
                  >
                    <p><strong>140,000 (1박)</strong></p>
                    <p>기본 인원 : <span>4</span> (최대:<span>2</span>)</p>
                  </div>
                </div>

                <button
                  className={styles.likesCancelBtn}
                >

                  <IoCloseOutline className={styles.heatFilled}/>

                </button>
              </div>
            </li>


          </ul>
        </article>
      }
      <BackButton href='/mypage' />
    </main>
  )
}

export default page