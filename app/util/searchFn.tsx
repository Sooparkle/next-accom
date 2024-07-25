'use server'
import React from 'react';
import { createClient } from '@/supabase/clientt';

interface AccomsDataType {
  id: number;
  accom_name: string;
  accom_type: string;
  accom_info: string;
  accom_benefit: string;
  description: string;
  img_url: string;
  price: string;
  score: number;
  min_occupancy: number;
  max_occupancy: number;
  extra_adult: number;
  extra_child: number;
  city: string;
  cityGu: string;
  province: string;
  phone: string;
  cancel: string;
  availavility: null | boolean;
  event: boolean;
  created_at: string;
  updated_at: string; 

}

interface SearchState {
  message: string;
  data?: AccomsDataType[];
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