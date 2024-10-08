
import React from 'react';
import Header from '../components/Header';
import Fooder from '../components/Footer';
import styles from '@/app/styles/Policy.module.scss'

export const runtime = 'edge';

const page = async () => {
  return (
    <>
    <Header type="" />
    <main 
      className={styles.policyMain}
    >
      <article
        className={styles.privacyWrap}
      >
        <h2>개인정보 처리방침</h2>

      <section>
        <p id={styles.one} >1. 좀쉼쉼이 수집하는 개인정보</p>
        <p>
          <strong>1.1 좀쉼쉼 플랫폼을 이용하는데 필요한 정보.</strong>
          당사는 회원님이 좀쉼쉼 플랫폼을 이용할 때 회원님의 개인정보를 수집합니다. 그렇지 않은 경우, 좀쉼쉼는 요청하신 서비스를 회원님께 제공하지 못할 수 있습니다. 이러한 정보에는 다음이 포함됩니다.
        </p>
        <p>
          <strong>1.1.1 연락처, 계정 및 프로필 정보.</strong>
          회원님의 이름, 전화번호, 우편 주소, 이메일 주소, 생년월일, 프로필 사진. 이러한 정보 중 일부는 회원님이 사용하는 기능에 따라 수집 여부가 달라질 수 있습니다.
        </p>
        <p>
          <strong>1.1.2 본인 인증 정보.</strong>
          적절한 경우, 당사는 신분증 인증 시 (관련 법률에 따라) 정부 발급 신분증의 이미지, 기타 인증 정보 및/또는 셀카 사진을 요청할 수 있습니다. 회원님의 신분증 사본이 제출되는 경우, 당사는 신분증에서 정보를 가져옵니다. 본인 인증에 대한 자세한 내용은 도움말 센터에서 확인하세요.
        </p>
        <p>
          <strong>1.1.3 결제 정보.</strong>
          결제 계좌 또는 은행 계좌 정보. 좀쉼쉼 사용자가 아닌 경우, 좀쉼쉼는 귀하와 관련된 결제 정보를 받을 수 있습니다. 예를 들면, 좀쉼쉼 사용자가 예약을 완료하기 위해 귀하의 결제 카드를 제공하는 경우가 있습니다.다른 사람을 대신한 결제 및 대금 수령과 관련한 도움말 센터 게시글을 참조하세요.
        </p>
        <p>
          <strong>1.2. 회원님이 좀쉼쉼에 자발적으로 제공하는 정보.</strong>
          회원님은 다음과 같은 추가적인 개인정보를 좀쉼쉼에 자발적으로 제공할 수 있습니다.
        </p>
        <p>
          <strong>1.2.1. 추가적인 프로필 정보.</strong>
          성별, 선호하는 언어, 도시, 인적 사항.
        </p>
        <p>
          <strong>1.2.2. 다른 사람에 대한 정보.</strong>
          다른 사람 소유의 결제 수단이나 연락처 정보, 또는 동반 일행에 대한 정보. 타인에 대한 개인정보를 제공함으로써, 회원님은 본 개인정보 처리방침에 명시된 목적을 위해 해당 정보를 좀쉼쉼에 제공할 권한이 있음을 확인하고, 해당 타인에게 좀쉼쉼 개인정보 처리방침을 공유했음을 확인합니다.
        </p>
        <p>
          <strong>1.2.3. 생체정보.</strong>
          사용자가 인증을 위해 사진 및 신분증 서류를 제출한 경우, 사진 및 서류에서 추출된 안면 인식 데이터, 관련 법률에서 요구하는 경우 사용자 동의를 얻은 후 수집.
        </p>
      </section>
      </article>
    </main>
    <Fooder />
    </>
  )
}

export default page