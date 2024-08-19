
import React from 'react'
import Form from './Form'
import Header from '../components/Header'
import styles from "@/app/styles/Form.module.scss"
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const runtime = 'edge';

const page = async () => {
  const supabase = await createClient();

  const { data : { user } } = await supabase.auth.getUser();

  if(user){
    redirect('/')
  }

  return (
    <>
      <Header type=''/>
      <main>
        
        <Form />
        <section
          className={styles.policies}
        >
          <Link 
            href={'/termpolicy'}
          >이용약관
          </Link>
          <Link
            href={'/privacypolicy'}
          >
            개인정보 처리방침
          </Link>
        </section>
      </main>
    </>
  )
}

export default page