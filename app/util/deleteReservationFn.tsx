'use server'

import React from 'react'
import { createClient } from '@/supabase/clientt';
import { revalidatePath } from 'next/cache';


const deleteReservationFn = async (preveState :any , formData : FormData) => {
  const supabaseDB = createClient();
  const bookingId = formData.get('bookingId');

  try{
    const {error} = await supabaseDB
      .from('bookings')
      .delete()
      .eq('id', bookingId);
  
      if(error){
        console.log('There is something issue deleting Booking data', error)
        throw new Error ('Failed to delete reservation');
      }
  
      revalidatePath('/mypage/reservations');
      return { message: "예약취소 완료" };

  } catch(e){
    console.error("Delete Reservation data failed with some issues",e)
  }


  return (
    <div></div>
  )
}

export default deleteReservationFn