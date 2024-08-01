'use client'
import React, {useState, useEffect} from 'react';

const useStore = <T, F>(
  store : (callback : (store : T) => unknown) => unknown,
  callback : (state : T) => F,
) =>{
  const result =  store(callback) as F
  const [ data, setData ] = useState<F>()

  useEffect(()=>{
    setData(result)
  }, [result])
  return data
}

export default useStore