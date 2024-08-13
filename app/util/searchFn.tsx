'use server'
import React from 'react';
import { createClient } from '@/supabase/clientt';
import { AccomDataType } from './types';
import { redirect } from 'next/navigation';


interface SearchState {
  message: string;
  data?: AccomDataType[];
}

const searchFn = async (prevState : any, formData:FormData) : Promise<SearchState> => {
const supabase = createClient();

console.log("server", formData.get("keyword"));
const keyword = formData.get("keyword");

  if(!keyword){
    return {
      message : "nokeyword",
      // data : []
    }
  }

  console.log("Keyword", formData.get("name"));

try{
  const { data, error } = await supabase
  .from('accoms')
  .select()
  .or(`accom_name.ilike.%${keyword}%, city.ilike.%${keyword}%, description.ilike.%${keyword}%`)


  if(error){
    console.error("supabase data fetch failed", error)
  }

  if(!data || data.length === 0){
    console.log("supabase data is null/undefined")
    return { message : "null",
      data : []
    }
    // return {data : null}
  }
  console.log("search Succeful Data")

  return {
    message : "succeful",
    data
  }
  
} catch(error){
  console.error("search data fetch failed",error)
  return{
    message : "undefined",
    data:[]
  }

}

}

export default searchFn