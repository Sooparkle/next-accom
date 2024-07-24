"use client"
import Image from "next/image";
import SearchForm from "./components/Form";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSearchStore } from "./components/SearchForm";
import useStore from './util/useStore';
export default function Home() {
  const bears = useStore(useSearchStore, (state) => state.searchResults)
  // const store = useSearchStore((state) => state.searchResults);
if(!bears){
  console.error("error")
}

  // console.log("bearStore", store);
// const {data} = useData();
console.log("data", bears)



  return (
    <>
    <Header type="main" />
    <main 
      style={{
        marginTop:"138px"
      }}
      >

          {/* {bears ? {bears} : undefined} */}
      {/* fillter Area */}
      search area
      {/* Data List Area */}
      Data List
    </main>
    <Footer />
  </>
  );
}
