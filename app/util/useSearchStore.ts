import { create } from 'zustand';
import { AccomDataType } from '../util/types';

interface SearchStoreType {
  searchResults:SearchState
  setSearchResults: (state:SearchState) => void;

}

interface SearchState {
  message: string;
  data?: AccomDataType[];
}
// Zustand 
export const useSearchStore = create<SearchStoreType>((set) => ({
  searchResults: { message: "initial", data: [] },
  setSearchResults: (state: SearchState) => set({ searchResults: state }),
}));