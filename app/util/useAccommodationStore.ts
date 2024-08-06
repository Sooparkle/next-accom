import React from 'react'
import { create } from 'zustand';
import { ConfirmDataType } from './types';

interface AccommodationType {
  accomData: ConfirmDataType | null;
  setAccomData: (data: ConfirmDataType) => void;
}

const useAccommodationStore = create<AccommodationType>((set) => ({
  accomData: null,
  setAccomData: (data: ConfirmDataType) => set({ accomData: data }),
}));

export default useAccommodationStore;