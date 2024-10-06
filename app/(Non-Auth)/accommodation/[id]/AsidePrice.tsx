"use client";
import React, {
  SyntheticEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import styles from "../../../styles/AccommmodationDetail.module.scss";
import CalendarArea from "./CalendarArea";
import { AccomDataType, UserDBType } from "@/app/util/types";
import { formatCurrency } from "@/app/util/currencyFormat";
import { FiPlus } from "react-icons/fi";
import StayingNumberBtn from "./StayingNumber";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/clientt";
import useAccommodationStore from "@/app/util/useAccommodationStore";
import useAccoms from "@/app/util/useAccoms";

interface zustandDataType {
  start_date: Date | null;
  end_date: Date | null;
  guest_numbers: number;
  total_price: number;
  accom_name: string;
  accom_type: string;
  accom_id: number;
  extra_adult: number;
  extra_child: number;
}

const AsidePrice = ({
  accomData,
  user,
}: {
  accomData: AccomDataType;
  user: UserDBType | null;
}) => {
  const asideRef = useRef<HTMLElement>(null);
  const supabase = createClient();
  const router = useRouter();
  const [isCalendarOn, setIsCalendarOn] = useState(false);
  const [isNumbersOn, setIsNumbersOn] = useState(false);
  const [isOpenId, setIsOpenId] = useState<number | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndtDate] = useState<Date | null>(null);
  const [totalNights, setTotalNights] = useState<number | null>(null);

  const [totalNumbers, setTotalNumbers] = useState<number>(0);
  const [adult, setAdult] = useState<number>(0);
  const [child, setChild] = useState<number>(0);

  const todayDate = new Date().toLocaleDateString("ko-KR");
  const AccommdationStore = useAccommodationStore();

  // calendar popup shutdown logic
  useEffect(() => {
    const closePopup = () => setIsOpenId(null);
    if (isOpenId !== null) {
      // setEndtDate(null);
      window.addEventListener("click", closePopup);
    }
    return () => window.removeEventListener("click", closePopup);
  }, [isOpenId]);

  // useEffect(()=>{
  //   const closeNumber = () => setIsNumbersOn(false);
  //   if(isNumbersOn){
  //     window.addEventListener('click', closeNumber);
  //   }
  //   return () =>window.removeEventListener('click', closeNumber)
  // },[isNumbersOn])

  const handlePopupOpen = (id: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpenId((prev) => (prev === id ? null : id));
  };

  //Total staying night counter
  const calculateStayingNights = () => {
    if (!(startDate === null) && !(endDate === null)) {
      if (startDate >= endDate) {
        throw new Error(
          "일자 선택 오류 입니다. 체크인과 체크아웃을 다시 선택해 주세요."
        );
      }

      const oneDayMS = 24 * 60 * 60 * 1000;
      const timeGap = endDate.getTime() - startDate.getTime();
      const numberOfDays = Math.ceil(timeGap / oneDayMS);
      setTotalNights(numberOfDays - 1);
    }
  };

  //
  const handleStayingNightSet = () => {
    if (setUpStartDate === setUpEndtDate) {
      window.alert("선택한 날짜가 같아요. 다시 선택해 주세요!");
      return;
    } else {
      calculateStayingNights();
      setIsOpenId(null);
    }
  };

  // for a browser display information
  const setUpStartDate = startDate?.toLocaleDateString();
  const setUpEndtDate = endDate?.toLocaleDateString();

  const stringToNumber = accomData?.price.replace(",", "");
  const totalPrice =
    totalNights !== null || (totalNights !== null && totalNumbers > 0)
      ? Number(stringToNumber) * totalNights +
        (adult * accomData.extra_adult + child * accomData.extra_child)
      : 0;

  // Currentcy Localization function
  let totalLocalFormatCurrency = formatCurrency(totalPrice);

  // counter for adult
  const handleAdult = (buttonType: string) => {
    if (buttonType === "plus") {
      if (totalNumbers < accomData.max_occupancy) {
        setTotalNumbers((prev) => prev + 1);
        setAdult((prev) => prev + 1);
        return;
      }
    }

    if (buttonType === "minus") {
      if (adult >= 0) {
        setTotalNumbers((prev) => prev - 1);
        setAdult((prev) => prev - 1);
        return;
      }
    }
  };

  //counter for child
  const handleChild = (buttonType: string) => {
    if (buttonType === "plus") {
      if (totalNumbers < accomData.max_occupancy) {
        setTotalNumbers((prev) => prev + 1);
        setChild((prev) => prev + 1);
        return;
      }
    }

    if (buttonType === "minus") {
      if (child >= 0) {
        setTotalNumbers((prev) => prev - 1);
        setChild((prev) => prev - 1);
        return;
      }
    }
  };

  // zustand storing proecess
  const accommodationData = useAccommodationStore();

  const handleConfirm = async () => {
    if (totalNights === null) {
      window.alert("날짜를 선택해 주세요.");
      return;
    }

    if (!user?.name) {
      window.alert("로그인 정보가 필요합니다. 로그인을 먼저 해주세요!");
      router.push("/login");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          guest_name: user.name,
          guest_email: user.email,
          guest_phone: null,
          start_date: startDate,
          end_date: endDate,
          guest_numbers: totalNumbers,
          order_status: "pre-confirm",
          total_price: totalPrice,
          accom_name: accomData?.accom_name,
          accom_type: accomData?.accom_type,
          accom_id: accomData.id,
          extra_adult: adult,
          extra_child: child,
        })
        .select();

      if (error) {
        console.log("숙박 예약 실패", error);
        return;
        // throw new Error("숙박 예약 실패")
      }

      // store confirm datas into Zustand
      const zustandData = {
        start_date: startDate,
        end_date: endDate,
        guest_numbers: totalNumbers,
        total_price: totalPrice,
        accom_name: accomData?.accom_name,
        accom_type: accomData?.accom_type,
        accom_id: accomData.id,
        extra_adult: adult,
        extra_child: child,
      };
      if (zustandData) {
        accommodationData.setAccomData(zustandData as zustandDataType);
      } else {
        window.alert("데이터가 맞지 않습니다. 다시 한번 확인해 예약해 주세요.");
      }
    } catch (e) {
      console.log("예약 실패, DB 왈", e);
    }

    router.push(`${accomData.id}/confirm`);
  };

  return (
    <aside ref={asideRef}>
      {accomData ? (
        <section
          className={`${styles.accommodationRightBodyWrap} 
        }`}
        >
          <h3>₩ {accomData.price}</h3>
          <div className={styles.accomAsideDateNumberBox}>
            <div onClick={handlePopupOpen(2)}>
              <div>
                <p>체크인</p>
                {startDate ? setUpStartDate : todayDate}
              </div>
              <div>
                <p>체크아웃</p>
                {endDate ? setUpEndtDate : "일정이 없어요."}
              </div>
            </div>

            {/* 달력 팝업 */}
            <section
              className={`${styles.popupCalendarWrap} ${
                isOpenId === 2 ? styles.active : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>날짜 선택</h3>
              <p>여행 날짜를 입력하여 정확한 요금을 확인하세요.</p>

              <CalendarArea start={setStartDate} end={setEndtDate} />

              <button
                className={styles.calendarConfirmBtn}
                onClick={() => handleStayingNightSet()}
              >
                확인
              </button>
            </section>



            {/* 인원수 추가 버튼 */}
            {accomData.rooms && (
              <div
                onClick={handlePopupOpen(1)}
                className={styles.accomAsideNumbersWrap}
                tabIndex={0}
                role="button"
              >
                {totalNumbers > 0 ? (
                  <ul
                    className={styles.accomAddBtn}
                  >
                    <li>
                      <span>성인 : {adult}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                      <span>어린이 : {child}</span>
                    </li>
                  </ul>
                  ) : (
                  <ul
                    className={styles.accomAddBtn}
                  >
                    <li>
                      <FiPlus />
                      인원수
                    </li>
                  </ul>
                )}

                {/* 숙박 인원 팝업 창 */}
                {accomData.rooms && (
                  <section
                    onClick={(e) => e.stopPropagation()}
                    className={`${styles.accomAsideNumbers} ${
                      isOpenId === 1 ? styles.active : ""
                    }`}
                  >
                    <h4>숙박 인원</h4>
                    <p>
                      추가 가능 인원 : {accomData?.max_occupancy - totalNumbers}
                    </p>
                    <ul>
                      <li>
                        <p>성인</p>
                        <div className={styles.accomAsideNumberSetBtns}>
                          <button
                            disabled={totalNumbers === accomData.max_occupancy}
                            onClick={() => handleAdult("plus")}
                          >
                            <CiCirclePlus />
                          </button>
                          {adult}
                          <button
                            disabled={adult === 0}
                            onClick={() => handleAdult("minus")}
                          >
                            <CiCircleMinus />
                          </button>
                        </div>
                      </li>

                      <li>
                        <p>어린이</p>
                        <div className={styles.accomAsideNumberSetBtns}>
                          <button
                            disabled={totalNumbers === accomData.max_occupancy}
                            onClick={() => handleChild("plus")}
                          >
                            <CiCirclePlus />
                          </button>
                          {child}
                          <button
                            disabled={child === 0}
                            onClick={() => handleChild("minus")}
                          >
                            <CiCircleMinus />
                          </button>
                        </div>
                      </li>
                    </ul>

                    <div className={styles.accomTotalNumberCounter}>
                      총 인원 : {accomData.min_occupancy + totalNumbers}
                    </div>
                    <button
                      className={styles.accomTotalNumverConfirm}
                      onClick={handlePopupOpen(1)}
                    >
                      확인
                    </button>
                  </section>
                )}
              </div>
            )}

            <button onClick={() => handleConfirm()}>예약하기</button>
          </div>

          <p className={styles.accommodationPriceWrap}>
            <span>₩ {accomData.price}</span>x
            <span>{totalNights ? totalNights : "(숙박일 수)"}</span>
          </p>

          {accomData.rooms && (
            <p className={styles.accommodationPriceWrap}>
              {totalNights ? (
                <>
                  <span>₩ {totalNights * Number(stringToNumber)}</span>
                  <span>
                    성인 {adult} + 어린이 {child}
                  </span>
                </>
              ) : (
                <>
                  <span>숙박일수</span>
                  <span>추가 인원</span>
                </>
              )}
            </p>
          )}

          <div
            className={`${styles.accommodationPriceWrap} ${styles.accommodationTotalPriceWrap}`}
          >
            {totalLocalFormatCurrency}
          </div>
        </section>
      ) : (
        "현재 불러올 수 있는 데이터가 없습니다."
      )}
    </aside>
  );
};

export default AsidePrice;
