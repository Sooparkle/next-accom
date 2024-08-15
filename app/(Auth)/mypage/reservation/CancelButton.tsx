'use client';
import styles from '@/app/styles/Form.module.scss';
import { useFormState, useFormStatus } from 'react-dom';
import deleteReservationFn from '@/app/util/deleteReservationFn';


type CancelButtonProps = {
  bookingId: string;

};

const initialState ={
  message : ""
}


const DeleteButton = () => {
  const { pending } = useFormStatus()

  return(
    <button
      type='submit' aria-disabled={pending}
      className={styles.reservationCancelBtn}
    >
      {pending ? '예약 삭제중' : '예약 취소'} 
    </button>
  )
}


const CancelButton = ({ bookingId }: CancelButtonProps) => {
  const [ state, formAction ] = useFormState(deleteReservationFn, initialState)
  //   startTransition(async () => {
  //     try {
  //       await deleteReservation(bookingId); // Pass the object as expected
  //     } catch (e) {
  //       console.error('예약 취소가 실패하였습니다.', e);
  //     }
  //   });
  // };

  return (
    <form
    action={formAction}
    >
      <input type="hidden" name='bookingId' value={bookingId} />
      <DeleteButton />

  </form>

  );
};

export default CancelButton;
