"use client"
import { useState } from 'react';
import styles from '../../../styles/Mypage.module.scss';
import BackButton from '@/app/components/BackButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoCloseOutline } from "react-icons/io5";
import { createClient as DB } from '@/supabase/clientt';

interface AccomData {
  id: number;
  accom_name: string;
  img_url: string;
  description: string;
}

interface LikesPageClientProps {
  initialAccoms: AccomData[];
  userEmail: string;
}

const LikesPageClient = ({ initialAccoms, userEmail }: LikesPageClientProps) => {
  const [accoms, setAccoms] = useState<AccomData[]>(initialAccoms);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const router = useRouter();
  const supabaseDB = DB();

  const handleLikeRemoved = async (removedId: number) => {
    try {
      setIsDeleting(removedId);
      
      // Delete from Supabase likes table
      const { error } = await supabaseDB
        .from("likes")
        .delete()
        .eq('accom', removedId)
        .eq('users', userEmail);

      if (error) {
        console.error('Failed to delete like:', error);
        return;
      }

      // Update local state
      setAccoms(prevAccoms => prevAccoms.filter(accom => accom.id !== removedId));
      router.refresh();
    } catch (error) {
      console.error('Error removing like:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  if (accoms.length === 0) {
    return (
      <main className={styles.mypageMain}>
        <section className={styles.head}>
          <h3>찜한 숙소</h3>
          <p>총 : 0개</p>
        </section>
        <p>찜한 숙소가 없습니다.</p>
        <BackButton href='/mypage' />
      </main>
    );
  }

  return (
    <main className={styles.mypageMain}>
      <section className={styles.head}>
        <h3>찜한 숙소</h3>
        <p>총 : {accoms.length}개</p>
      </section>
      
      <article>
        <ul className={styles.likesListWrap}>
          {accoms.map((accom) => (
            <li key={accom.id}>
              <h4>{accom.accom_name}</h4>
              <div className={styles.likesDetailWrap}>
                <div className={styles.likesEachImageWrap}>
                  <Image 
                    src={accom.img_url || "/placeholder-image.jpg"}
                    fill
                    alt={`${accom.accom_name} 숙소`}
                  />
                </div>
                <div className={styles.likesDetail}>
                  <p>{accom.description}</p>
                </div>
                <button 
                  className={styles.likesCancelBtn}
                  onClick={() => handleLikeRemoved(accom.id)}
                  disabled={isDeleting === accom.id}
                >
                  <IoCloseOutline className={styles.heatFilled} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </article>
      <BackButton href='/mypage' />
    </main>
  );
};

export default LikesPageClient;