'use server'
import React from 'react';
import { createClient } from '@/supabase/clientt';
import { create } from 'zustand'





const searchFn = async (prevState : any, formData:FormData) => {
const supabase = createClient();

console.log("server", formData.get("keyword"));
const keyword = formData.get("keyword");

  if(!keyword){
    return {message : "다시 키워드를 작성해 주세요."}
  }

  console.log("Keyword", formData.get("name"));

try{
  const { data,error } = await supabase
  .from('accoms')
  .select()
  .or(`accom_name.ilike.%${keyword}%, city.ilike.%${keyword}%, description.ilike.%${keyword}%`)


  if(error){
    console.error("supabase data fetch failed", error)
  }

  if(!data || data.length === 0){
    console.log("supabase data is null/undefined")
    return { message : "데이터가 없습니다."}
  }

  return data
} catch(error){
  console.error("search data fetch failed",error)
  return{
    message : "API fetch failed."
  }
}


}

export default searchFn