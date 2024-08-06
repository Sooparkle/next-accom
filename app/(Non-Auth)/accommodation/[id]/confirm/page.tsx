'use server'
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import React, { ReactEventHandler, SyntheticEvent } from "react";
import styles from "../../../../styles/Confirm.module.scss";
import Image from "next/image";
import { AccomDataType } from "@/app/util/types";
import { CiImageOff } from "react-icons/ci";
import { createClient as DB } from "@/supabase/clientt";
import SubmitBtn from "./SubmitBtn";
import { createClient } from "@/utils/supabase/server";



interface AccomType {
  params: {
    id: string;
  };
}


export const formBtn = (formData : FormData) =>{
  console.log("work")
  const rawFormData = {
    customerId: formData.get('name'),
    email: formData.get('email'),
    tel: formData.get('tel'),
  }

  console.log("rawFormData", rawFormData);
}




const page = async ({params} : AccomType) => {
  const supabaseDB = DB();
  const supabase = await createClient();


  let accomData :AccomDataType |null = null
  
  const { data : {user} } = await supabase.auth.getUser();


  

// call User Information
  try{
    const { data, error } = await supabaseDB
    .from('accoms')
    .select()
    .eq('id', params.id)

    if(error){
      throw new Error ('Supabase Data is an issue')
    }

    if(data && data.length > 0 && accomData === null){
      accomData = data[0] as AccomDataType
    } else{
      console.log("There is no data for give ID");
    }

  } catch(e){
    console.log('Supabase has some issue', e)
  }



  const handleSumbit = async (e:SyntheticEvent) =>{
    e.preventDefault();

    // Updata order-status to confirm
    const { data, error } = await supabaseDB
    .from('bookings')
    .insert({
      order_status: 'confirm',
    })
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
              <li>{accomData?.description}</li>
            </ul>
          </section>
  

          
          <SubmitBtn  />


        </main>
        <Footer />
      </>
    );
  };


export default page