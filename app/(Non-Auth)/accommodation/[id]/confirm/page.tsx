
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import React, { ReactEventHandler, SyntheticEvent } from "react";
import styles from "../../../../styles/Confirm.module.scss";
import Image from "next/image";
import SubmitBtn from "./SubmitBtn";
import { AccomDataType, UserType } from "@/app/util/types";
import { createClient as DB } from "@/supabase/clientt";
import { createClient } from "@/utils/supabase/server";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { CiImageOff } from "react-icons/ci";
import { redirect } from "next/navigation";

export const runtime = 'edge';

interface AccomType {
  params: {
    id: string;
  };
}


const page = async ({params} : AccomType) => {
  const supabaseDB = DB();
  const supabase = await createClient();

  let accomData :AccomDataType |null = null
  


// call accommodataion Information through params
  try{
    const { data, error } = await supabaseDB
    .from('accoms')
    .select("*")
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


 // the onSubmit btn will be deleted 
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

  // Call user information
  const { data : {user} } = await supabase.auth.getUser();

  if(!user){
    redirect(`/accommodation/${params}`);
  }

    return (
      <>
        <Header type="" />
        <main className={styles.confirmMain}>
          <section className={styles.confirmHeader}>
            <div 
            ><FaHouseChimneyUser />
            </div>
            <p>예약정보</p>
          </section>
  
          <section className={styles.confirmAccomWrap}>
            <div className={styles.confirmAccomImage}>
              {accomData ? (
                <Image
                  src={accomData.img_url}
                  fill
                  alt="본인 아바타"
                  sizes="(max-width: 300px) 100%, (max-width: 500px) 100%"
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
              {/* <li>{accomData?.description}</li> */}
            </ul>
          </section>


          <SubmitBtn accommodation={accomData as AccomDataType} user={user as UserType || null} params={params.id} />


        </main>
        <Footer />
      </>
    );
  };


export default page