import { create } from 'zustand';
import { AccomDataType } from './types';

interface SearchStoreType {
  searchResults:{
    message: string;
    data?: AccomDataType[];
  }
  setSearchResults: (searchResults : SearchStoreType['searchResults']) => void;

}

interface SearchState {

}
// Zustand 
export const useSearchStore = create<SearchStoreType>((set) => ({
  searchResults: { message: "initial", data: [] },
  setSearchResults: (searchResults) => set({ searchResults }),
}));