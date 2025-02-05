// app/notifications/loading.tsx
import styles from '@/app/styles/Loading.module.scss'

export default function Loading() {


  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <h2 className={styles.title}>...로딩 중...</h2>
      <p className={styles.message}>게시판에 데이터를 가져오고 있습니다.</p>
    </div>
  );
}
