"use client"
import { useParams } from 'next/navigation'
import React, { ReactNode } from 'react'

  const page = () => {
  const {id} = useParams<{id : string}>();
  return (
    <div>page{id}</div>
  )
}

export default page