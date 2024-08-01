'use client'
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import React, { ReactEventHandler, SyntheticEvent } from "react";
import styles from "../../../../styles/Confirm.module.scss";
import Image from "next/image";
import { createClient } from "@/supabase/clientt";
import { AccomDataType } from "@/app/util/types";
import { CiImageOff } from "react-icons/ci";

interface AccomType {
  params: {
    id: string;
  };
}

interface BookingDataType{
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  start_date: Date;
  end_date: Date;
  guest_numbers: number | null;
  order_status: string;
  total_price: string;
  accom_name?: string; 
  accom_type?: string; 
  extra_adult?: number;
  extra_child?: number;
};

const page = async ({params} : AccomType) => {
  const supabase = createClient();
  let accomData :AccomDataType |null = null
    
  try{
    const { data, error } = await supabase
  .from('accoms')
  .select()
  .eq('id', params.id)

  if(error){
    throw new Error ('Supabase Data is an issue')
  }

  if(data && data.length > 0){
    accomData = data[0] as AccomDataType
  } else{
    console.log("There is no data for give ID");
  }

  } catch(e){
    console.log('Supabase has some issue', e)
  }




  const handleSumbit = async (e:SyntheticEvent) =>{
    e.preventDefault();
    console.log("ddd")

    const bookingData : BookingDataType ={
      guest_name: 'someValue', 
      guest_email: 'otherValue',
      guest_phone: 'test',
      start_date: new Date('2024-07-07'),
      end_date: new Date('2024-07-07'),
      guest_numbers: null,
      order_status: 'confirm',
      total_price: "123032409",
      accom_name: accomData?.accom_name,
      accom_type: accomData?.accom_type,
      extra_adult: 12,
      extra_child: 2,
    };


  const { data, error } = await supabase
  .from('bookings')
  .insert([bookingData])
  .select();

  if (error) {
    console.error("Error inserting booking data:", error);
    // Handle error, e.g., display an error message to the user
    return;
  }

  if (data && data.length > 0) {
    // Handle successful insertion, e.g., show a success message
    console.log("Booking inserted successfully:", data);
  } else {
    console.error("Unexpected response from Supabase");
  }

  }

    return (
      <>
        <Header type="" />
        <main className={styles.confirmMain}>
          <section className={styles.confirmHeader}>
            <h3>숙박 예약</h3>
            <p>예약정보</p>
          </section>
  
          <section className={styles.confirmAccomWrap}>
            <div className={styles.confirmAccomImage}>
              {accomData ? (
                <Image
                  src={accomData.img_url}
                  fill
                  alt="본인 아바타"
                />
              ) : (
                <CiImageOff />
              )}
            </div>
  
            <ul>
              <li>
                <h3>{accomData?.accom_name}</h3>
              </li>
              <li>
                <p>{accomData?.accom_type}</p>
                <p>{accomData?.city} {accomData?.cityGu}</p>
              </li>
              <li>2024.07.07 ~ 2024.07.07 (3일)</li>
            </ul>
          </section>
  
          <section
            className={styles.confirmPersonalInfo}
          >
            <h3>예약 정보</h3>
            <form>
              <div>
                <label htmlFor="name">
                  예약자 이름
                  <input type="text" id="name" />
                </label>
              </div>
              <div>
                <label htmlFor="tel">
                  연락처
                  <input
                    type="tel"
                    id="tel"
                    placeholder="010-1234-1234"
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                    required
                  />
                </label>
              </div>
              <div>
                <label htmlFor="email">
                  이메일
                  <input
                    type="email"
                    id="email"
                    placeholder="soo@sooparkle.xyz"
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                    required
                  />
                </label>
              </div>
            </form>
          </section>
  
          <section
            className={styles.confirmFinial}
          >
            <h3>숙박 결제 정보</h3>
            <div>
              <ul>
                <li>2024.07.07 ~ 2024.07.07 (3일)</li>
                <li>추가 인원</li>
              </ul>
              <p>₩ 1,3445</p>
            </div>
          </section>

          <button
            type="submit"
            onClick={handleSumbit}
            className={styles.confirmSubmitBtn}
          >
            예약하기
          </button>

        </main>
        <Footer />
      </>
    );
  };


export default page