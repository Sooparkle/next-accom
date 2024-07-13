'use server'
import React from 'react'

const searchFn = async (prevState : any, formData:FormData) => {

  if(formData.values.length == 0){
    return {message : "다시 키워드를 작석해 주세요."}
  }

  console.log("Keyword", formData.get("name"));

try{
  const response = await fetch( `https://port-0-pj3-server-dc9c2nlt7zv05q.sel5.cloudtype.app/search?keyword=${formData.get("name")}`)
  const data = await response.json();
  return{
    data,
    message : "검색 완료"
  }
} catch{
  return{
    message : "검색 결과가 없습니다."
  }
}

}

export default searchFn