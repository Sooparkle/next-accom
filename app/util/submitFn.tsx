'use server'


import { createClient as DB } from "@/supabase/clientt";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface fetchDBType {
  id :string
}

export async function confirmSumbitFn(prevState: any, formData: FormData) {
  
  const supabaseDB = DB();
  const supabase = await createClient();


  // checkt the form data and reject
  if(!formData.get("name")){
    return { message : "이름을 입력해 주세요."}
  }
  if(!formData.get("tel")){
    return { message : "연락처를 입력해 주세요."}
  }
  if(!formData.get("email")){
    return { message : "E-mail을 입력해 주세요."}
  }
  if(!formData.get("start")){
    return { message : "시작일을 입력해 주세요."}
  }
  if(!formData.get("end")){
    return { message : "종료일을 입력해 주세요."}
  }


  // User information converting email form DB
  const {data : {user}} = await supabase.auth.getUser();
  const userEmail = user ? user.email : undefined

  console.log("이메일 테스트를 시작합니다.----", )

// Fetch BookingData from DB in order to Updata
let fetchedBookingData: fetchDBType[] | null =null

// Fetch data from Recent data at DB
  const {data : fetchDB, error:fetchError } = await supabaseDB
    .from('bookings')
    .select("id")
    .order('created_at', { ascending: false })
    .eq('guest_email', userEmail)
    .limit(1)

  if(fetchError){
    console.error("Fetch User Data is error", fetchError);
    return
  }

  if (fetchDB && fetchDB.length > 0){
    const fetchedBookingData = fetchDB[0].id;

    // Update data oder_status into 'confirm' status
    const {data:upgradeData, error:upgradeErrorData} = await supabaseDB
      .from('bookings')
      .update({ order_status: 'confirm' })
      .eq('id', fetchedBookingData);

  if(upgradeErrorData){
    console.error("Update User Data is error", upgradeErrorData);
    return
  }

  return  redirect(`/?message=예약에 성공하셨습니다.`);


  } else{
    console.error("Unexpected Matching Usert and Email failed")
    return{
      message : "사용자와 회원 이메일이 일치하지 않습니다. 확인이 필요합니다."
    }
  }
  


  console.log("Fetch User Email", fetchedBookingData )

  // Update Confirm Data into DB

}
