import Image from "next/image";
import SearchForm from "./components/Form";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  
  return (
    <>
    <Header type="main" />
    <main 
      style={{
        marginTop:"138px"
      }}
      >
      {/* fillter Area */}
      search area
      {/* Data List Area */}
      Data List
    </main>
    <Footer />
  </>
  );
}
