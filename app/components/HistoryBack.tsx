'use client'

import { useRouter } from "next/navigation";


const HistoryBack : React.FC = () =>{
  const router = useRouter();

  const handleBack = () =>{
    if(typeof window !== "undefined" && window.history.length > 1){
      router.back();
    } else {
      router.push("/")
    }
  }

  return(
    <div
      style={buttonContainer}
    >

      <button
        onClick={handleBack}
        style={buttonStyle}
      >
        뒤로가기
      </button>
    </div>
  )
}

const buttonStyle ={
  padding: "0.8rem 2rem",
  backgroundColor: "#82bd69",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize : "16px"
}

const buttonContainer ={
  display : "flex",
  justifyContent : "center",
  padding : "2rem 0"

}
export default HistoryBack;
