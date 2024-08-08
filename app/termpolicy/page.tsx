import React from 'react';
import styles from '../styles/Policy.module.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

const page = () => {
  return (
    <>
      <Header type='' />
      <main
      className={styles.policyMain}
      >
        <article
          className={styles.privacyWrap}
        >
          <h2>이용약관</h2>
          <section>
            <h3
              className={styles.head}
            >게스트 약관</h3> 
            
            <h3 id={styles.a}>1. 좀쉼쉼에서의 검색 및 예약.</h3>
            <h4><strong>1.1 검색.</strong></h4>
            <p>호스트 서비스 유형, 리스팅 유형, 여행 목적지, 여행 날짜, 게스트 수 등을 기준으로 호스트 서비스를 검색할 수 있습니다. 필터 기능을 사용하면 검색 결과 정확도를 높일 수 있습니다. 검색 결과는 검색어와의 관련성 및 기타 기준에 근거해 표시됩니다. 관련성에는 요금, 예약 가능 여부, 후기, 고객 서비스 상담 내역, 예약 취소 내역, 인기도, 이전 여행 내역 및 저장된 리스팅, 호스트가 설정한 조건(예: 최소 또는 최대 숙박 가능 일수) 등의 요인이 고려됩니다. 도움말 센터에서 검색 결과에 대해 자세히 알아보세요. </p>
            <h4><strong>1.2 예약.</strong></h4>
            <p>리스팅을 예약하면, 리스팅 요금, 좀쉼쉼 서비스 수수료, 오프라인 수수료, 관련 세금, 결제 시 표시되는 기타 항목 등 모든 예약 요금(총칭하여 '<strong>전체 요금</strong>')을 지불하는 데 동의하시게 됩니다. 호스트가 리스팅에 설정한 통화와 다른 통화로 결제하시는 경우, 표시되는 요금은 당사가 정한 환율에 따라 산정됩니다. 또한, 좀쉼쉼가 좀쉼쉼 페이먼츠를 통해 (본 약관 제14조에 명시된 바와 같이) 손해배상 청구액의 수금을 위해 (결제 서비스 약관에 명시된 바와 같이) 예약 시 사용한 결제 수단으로 청구하는 데 동의하는 것입니다. </p>
            <p>예약 확정 메시지를 받으면 회원님과 호스트 간에 호스트 서비스 계약('<strong>예약</strong>')이 직접적으로 체결됩니다.  예약을 하면 계약 조건에 동의하는 것입니다.  계약 조건에는 본 약관은 물론, 환불 정책, 리스팅에 명시되어 있거나 예약 결제 시 안내받은 기타 규칙, 기준, 정책, 요건 등 예약에 적용되는 모든 조건이 포함됩니다. 리스팅을 예약하기 전에 이러한 약관과 예약에 적용되는 모든 조건(규칙, 기준, 정책 및 요건 등)을 포함한 계약 조건을 읽고 이해하는 것은 게스트의 책임입니다.  일부 호스트는 공동 호스트나 다른 팀원과 함께 호스트 서비스를 제공한다는 사실에 유념해 주세요. </p>
            <h4><strong>1.3 숙소 예약.</strong></h4>
            <p>숙소 예약은 숙소 출입, 점유 및 사용에 대한 제한적인 허가입니다. 호스트는 (i) 합리적으로 필요하고, (ii) 호스트와 게스트 간의 계약에 의해 허용되며, (iii) 관련 법규에서 허용하는 범위 내에서 게스트가 머무는 동안 숙소에 다시 들어갈 수 있는 권리를 보유합니다. 체크아웃 시간을 지나 숙소에 머물 경우, 호스트에게는 초과 숙박에 대해 관련법에서 허용하는 방식으로 합리적인 페널티를 부과하는 것을 포함하여 게스트를 숙소에서 퇴거시킬 권한이 있습니다. 최대 숙박 인원을 초과하여 숙박할 수 없습니다. </p>

            <h3 id={styles.b}>2. 취소, 예약 문제, 환불 및 예약 변경. </h3>
            <h4><strong>2.1 취소, 예약 문제 및 환불.</strong></h4>
            <p>일반적으로 게스트가 예약을 취소하면 해당 예약에 적용되는 호스트의 환불 정책에 따라 환불 금액이 결정됩니다. 그러나 특정 상황에서는 기타 정책이 우선적으로 적용되어 환불금이 결정됩니다. 통제할 수 없는 상황에 의해 예약을 취소해야 하는 경우중대 재해 정책에 따라 일부 또는 전액 환불을 받는 것이 가능할 수도 있습니다. 호스트가 예약을 취소하거나 예약 문제(재예약 및 환불 정책에서 정의)가 발생한 경우, 재예약 및 환불 정책에 따라 재예약을 지원받거나 일부 또는 전액을 환불받을 수 있습니다. 특정 카테고리의 리스팅에는 다른 정책이 적용됩니다. 예를 들어 체험 예약에는 체험 게스트 환불 정책이 적용됩니다. 적용 대상과 각 상황에 따른 환불과 관련한 자세한 내용은 추가 법률 약관이나 정책을 참조하세요. 좀쉼쉼 고객지원 팀에 연락하여 당사의 결정에 대해 이의를 제기할 수 있습니다.</p>
            <h4><strong>2.2 예약 변경.</strong></h4>
            <p>호스트와 게스트가 좀쉼쉼 플랫폼을 통해 또는 좀쉼쉼 고객 서비스가 당사자를 대신해 직접 예약을 변경하도록 동의한 경우(이하 '<strong>예약 변경</strong>'), 게스트와 호스트는 해당 예약에 대해 책임을 지며 예약 변경으로 인해 발생하는 추가 금액, 수수료 또는 세금을 지불하는 데 동의합니다.</p>
            
            <h3 id={styles.c}>3. 회원의 책임과 위험 인수.</h3>
            <h4><strong>3.1 회원의 책임.</strong></h4>
            <p>회원님은 본인의 작위와 부작위에 대한 의무와 책임이 있으며, 숙소 및 숙소가 있는 장소에서 숙소와 관련해 호스트와 게스트가 합법적으로 사용할 수 있는 모든 공간과 시설('<strong>공용 공간</strong>'), 체험 또는 기타 호스트 서비스에 참여하거나 이를 이용할 수 있도록 초대하거나 출입을 허용한 모든 사람의 작위와 부작위에 대해서도 책임을 집니다. 예를 들면 다음과 같은 책임이 있습니다. (i) 체크아웃할 때의 숙소 (및 관련된 개인 재산) 또는 공용 공간의 상태가 도착했을 때와 동일하도록 책임져야 하며, (ii) 합당한 수준의 손해 배상 청구 금액을 지급할 책임이 있으며, (iii) 정직하게 행동하고, 상대방을 존중하며, 관련 법률을 항상 준수해야 합니다. 미성년자인 추가 게스트를 대신해 예약하거나 미성년자를 호스트 서비스에 데려올 경우, 회원님에게 미성년자를 대리할 수 있는 법적 권한이 있어야 하며, 해당 미성년자를 감독할 책임은 전적으로 회원님에게 있습니다. </p>
            <h4><strong>3.2 위험 인수.</strong></h4>
            <p><strong>회원님은 다양한 활동에 고유한 위험이 수반됨을 인정하며, 좀쉼쉼 플랫폼에 접속하고 좀쉼쉼 플랫폼이나 (제9조에서 정의한) 콘텐츠를 이용함으로써 발생하는 모든 위험에 대해 관련 법률이 허용하는 최대 한도에서 책임지는 것에 동의합니다. 여기에는 숙소에서의 모든 숙박, 체험 참여, 그 밖의 다른 호스트 서비스 이용 또는 직접 대면 또는 온라인을 통한 다른 회원과의 상호작용이 포함됩니다. 즉, 호스트 서비스가 본인에게 적합한지 여부를 확인할 책임은 본인에게 있습니다. 예컨대, 호스트 서비스에는 질병, 부상, 장애 또는 사망 위험이 따를 수 있으며, 회원님은 해당 호스트 서비스에 참여를 결정함으로써 자발적인 의지에 따라 상기 위험을 감수하는 것입니다. </strong></p>
            </section>
    
      </article>
      </main>
      <Footer />
    </>
  )
}

export default page