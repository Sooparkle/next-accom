// page.tsx (Server Component)
import { redirect } from 'next/navigation';
import { createClient as DB } from '@/supabase/clientt';
import { createClient } from '@/utils/supabase/server';
import BackButton from '@/app/components/BackButton';
import styles from '@/app/styles/Mypage.module.scss'
import LikesPageClient from './LikesPageClient';

export const runtime = 'edge';

const Page = async () => {
  const supabaseDB = DB();
  const supbase = await createClient();

  const { data: { user } } = await supbase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: likeDB, error: likesError } = await supabaseDB
    .from("likes")
    .select("*")
    .eq('users', user.email);

  if (likesError) {
    return (
      <main className={styles.mypageMain}>
        <section className={styles.head}>
          <h3>찜한 숙소</h3>
          <p>총 : 0개</p>
        </section>
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        <BackButton href='/mypage' />
      </main>
    );
  }

  if (!likeDB || likeDB.length === 0) {
    return <LikesPageClient initialAccoms={[]} userEmail={user.email || ''} />;

  }

  const validAccomIds = likeDB
    .filter(like => like.accom)
    .map(like => {
      const id = parseInt(like.accom);
      return isNaN(id) ? null : id;
    })
    .filter(id => id !== null);

    console.log("DD", validAccomIds, typeof validAccomIds[0])

  if (validAccomIds.length === 0) {
    return <LikesPageClient initialAccoms={[]} userEmail={user.email || ''} />;

  }

  const { data: accomDB, error: accomError } = await supabaseDB
    .from("accoms")
    .select("id, accom_name, img_url, description")
    .in('id', validAccomIds);

  if (accomError) {
    return (
      <main className={styles.mypageMain}>
        <section className={styles.head}>
          <h3>찜한 숙소</h3>
          <p>총 : {validAccomIds.length}개</p>
        </section>
        <p>숙소 정보를 불러오는 중 오류가 발생했습니다.</p>
        <BackButton href='/mypage' />
      </main>
    );
  }

      return <LikesPageClient initialAccoms={accomDB} userEmail={user.email || ''} />;

};

export default Page;