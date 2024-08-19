import { create } from 'zustand';

interface AccommodationDataType {
  start_date: Date | null;
  end_date: Date | null;
  guest_numbers: number | null;
  total_price: number | null;
  accom_name: string | null;
  accom_type: string | null;
  accom_id: string | null;
  extra_adult: number | null;
  extra_child: number | null;
}

interface AccommodationStoreType {
  accomData1: AccommodationDataType;
  setAccomData: (data: AccommodationDataType) => void;
  clearAccomData: () => void;
}

const useAccommodationStore = create<AccommodationStoreType>((set) => ({
  accomData1: {
    start_date: null,
    end_date: null,
    guest_numbers: null,
    total_price: null,
    accom_name: null,
    accom_type: null,
    accom_id: null,
    extra_adult: null,
    extra_child: null,
  },
  setAccomData: (data) => set({ accomData1: data }),
  clearAccomData: () => set({
    accomData1: {
      start_date: null,
      end_date: null,
      guest_numbers: null,
      total_price: null,
      accom_name: null,
      accom_type: null,
      accom_id: null,
      extra_adult: null,
      extra_child: null,
    }
  }),
}));

export default useAccommodationStore;
