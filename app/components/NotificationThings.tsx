
'use client'
import React, { useEffect, useState } from 'react';
import styles from '../styles/Setting.module.scss';

const NotificationThings = () => {
  const [ allSetting, setAllSetting ] = useState<boolean>(false);
  const [isBanner, toggleBanner ]= useState<boolean>(false)
  const [isEmail, toggleEmail ]= useState<boolean>(false)
  const [isSMS, toggleSMS ]= useState<boolean>(false)  
  


  useEffect(()=>{
    if(allSetting === true){
      setAllSetting(true)
      toggleBanner(true)
      toggleEmail(true)
      toggleSMS(true)
    }
    if(allSetting === false){
      setAllSetting(false)
      toggleBanner(false)
      toggleEmail(false)
      toggleSMS(false)
    }

  },[allSetting])

  return (
    <section>
      {/* main all notification set  */}
      <div
        className={styles.allNotification}
      >
        <dl>
          <dt>{allSetting ? "알람 설정 끄기" : "알람 설정 켜기" }</dt>
          <dd>마케팅 및 프로모션 활동에 활용 할 수 있도록 사용</dd>
        </dl>
        <label
          className={styles.notificationLabel}
        >
          <input
            type="checkbox"
            checked={allSetting}
            aria-label="알람 설정 켜기/끄기 토글 버튼"
            onChange={()=>setAllSetting(prev =>!prev)}
          />
          <span className={styles.sider} ></span>
        </label>
      </div>


      <div
        className={styles.restOfNotification}
      >
      <div
        className={styles.banner}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="#999" d="M5 5h1.998v6.008s-.035.93.521 1.481c.573.567 1.49.51 1.49.51H15V15H8a3 3 0 0 1-3-3V5Z"></path></svg>
        <dl>
          <dt>{allSetting ? "맞춤형 광고 설정 끄기" : "맞춤형 광고 설정 켜기" }</dt>
          <dd>맞춤형 배너 광고를 위한 형태 정보</dd>
        </dl>
        <label
          className={styles.bannerLabel}
        >
          <input
            type="checkbox"
            checked={isBanner}
            aria-label="맞춤형 광고 설정 켜기/끄기 토글 버튼"
            onChange={() => toggleBanner(prev => !prev)}
          />
          <span className={styles.sider} ></span>
        </label>
      </div>

      <div
        className={styles.notificationEmail}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="#999" d="M5 5h1.998v6.008s-.035.93.521 1.481c.573.567 1.49.51 1.49.51H15V15H8a3 3 0 0 1-3-3V5Z"></path></svg>

        <dl>
          <dt>{allSetting ? "이메일 수진 동의 설정 끄기" : "이메일 수진 동의 설정 켜기" }</dt>
          <dd>이벤트 및 다양한 혜택정보 이메일 수신 허용</dd>
        </dl>
        <label
          className={styles.notificationEmailLabel}
        >
          <input
            type="checkbox"
            checked={isEmail}
            aria-label="이메일 수진 동의 설정 켜기/끄기 토글 버튼"
            onChange={() => toggleEmail(prev => !prev)}
          />
          <span className={styles.sider} ></span>
        </label>
      </div>

      <div
        className={styles.SMS}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="#999" d="M5 5h1.998v6.008s-.035.93.521 1.481c.573.567 1.49.51 1.49.51H15V15H8a3 3 0 0 1-3-3V5Z"></path></svg>

        <dl>
          <dt>{allSetting ? "SMS 수신 설정 끄기" : "SMS 수신 설정 켜기" }</dt>
          <dd>이벤트 및 다양한 혜택정보 SMS 수신 허용</dd>
        </dl>
        <label
          className={styles.SMSLabel}
        >
          <input
            type="checkbox"
            checked={isSMS}
            aria-label="SMS 수신 설정 켜기/끄기 토글 버튼"
            onChange={() => toggleSMS(prev => !prev)}
          />
          <span className={styles.sider} ></span>
        </label>
      </div>

      </div>
      
    </section>
  )
}

export default NotificationThings