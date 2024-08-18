'use server'
import SearchForm from "./components/SearchForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { createClient } from "@/supabase/clientt";
import styles from './styles/Main.module.scss';
import Image from "next/image";
import Link from "next/link";
import ConfirmPopUp from "./ConfirmPopUp";


interface MessageType {
  searchParams :{
    message : string
  }
}

export default async function Home({searchParams} : MessageType) {
const supabase = createClient();

  const { data, error } = await supabase.from('accoms').select();
    if (error) {
      console.error("Supabase Total Fetch Data failed", error);      
    }
    if (!data || data.length === 0) {
      console.log("Supabase Total Fetch data undefined/null")
    }


    // Event Data fetching
  const { data:eventData, error:evenError } = await supabase
  .from('accoms')
  .select()
  .eq('event', true);

  if (evenError) {
    console.error("Supabase Total Fetch Data failed", error);      
  }
  if (!eventData || eventData.length === 0) {
    console.log("Supabase Total Fetch data undefined/null")
  }


  // Highg score Data fethcing
  const { data:scoreData, error:scoreError } = await supabase
  .from('accoms')
  .select()
  .gte('score', 4.85)
  ;
  if (scoreError) {
    console.error("Supabase Total Fetch Data failed", error);      
  }
  if (!scoreData || scoreData.length === 0) {
    console.log("Supabase Total Fetch data undefined/null")
  }
  return (
    <>
    <Header type="search" />
    <main 
      className={styles.mainMain}
      >

        {/* Search area */}
      {/* <SearchForm /> */}

      {/* data list area */}

      {/* Event Area */}
      <section
      >
        <h3>Event</h3>
        <div
          className={styles.mainEventWrap}
        >
          <ul
          >
          {
            eventData ? (
              eventData.map((item,index) =>(
                <li key={item.id} className={styles.accomCardWrap}>
                  <Link 
                  href={`accommodation/${item.id}`}
                  >
                  <div
                    className={styles.mainImageWrap}
                  >
                    <Image 
                      src={item.img_url}
                      fill
                      alt={item.item_name}
                      sizes="(min-width: 250pxpx) 100%, (max-width: 400px) 100%"
      
                    />
                  </div>
                  <div
                    className={styles.maininfo}
                  >
                    <p
                      className={styles.typeScore}
                    >
                      <span>{item.accom_type}</span>
                      <span>{item.score}</span>
                    </p>
                    <h4>{item.province} {item.cityGu}</h4>
                    <p>인원 : 최소<span>{item.min_occupancy}</span> ~ 최대<span>{item.max_occupancy}</span></p>
                    <p className={styles.mainPrice}>{item.price} ₩</p>
                  </div>
                  
                </Link>
                </li>
              ))
            ) : (
              <div>현재 이벤트를 진행하고 있지 않아요!</div>
            )
          }
          </ul>
        </div>
      </section>


      {/* High Score Area */}
      <section
      >
        <h3>High 점수</h3>
        <div
          className={styles.mainEventWrap}
        >
          <ul
            
          >
          {
            scoreData ? (
              scoreData.map((item,index) =>(
                <li key={item.id} className={styles.accomCardWrap}>
                  <Link 
                  href={`accommodation/${item.id}`}
                  >
                  <div
                    className={styles.mainImageWrap}
                  >
                    <Image 
                      src={item.img_url}
                      fill
                      alt={item.item_name}
                      sizes="(min-width: 250pxpx) 100%, (max-width: 400px) 100%"
      
                    />
                  </div>
                  <div
                    className={styles.maininfo}
                  >
                    <p
                      className={styles.typeScore}
                    >
                      <span>{item.accom_type}</span>
                      <span>{item.score}</span>
                    </p>
                    <h4>{item.province} {item.cityGu}</h4>
                    <p>인원 : 최소<span>{item.min_occupancy}</span> ~ 최대<span>{item.max_occupancy}</span></p>
                    <p className={styles.mainPrice}>{item.price} ₩</p>
                  </div>
                  
                </Link>
                </li>
              ))
            ) : (
              <div>현재 이벤트를 진행하고 있지 않아요!</div>
            )
          }
          </ul>
        </div>
      </section>
      {
        searchParams && <ConfirmPopUp searchParams={searchParams} />
      }
    </main>
    <Footer />
  </>
  );
}
