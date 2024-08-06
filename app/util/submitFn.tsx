'use server'

export async function confirmSumbitFn(prevState: any, formData: FormData) {
  
  console.log("confirm Format", formData.get("totaldays"));
  if(!formData.get("name")){
    return { message : "이름을 입력해 주세요."}
  }
  if(!formData.get("tel")){
    return { message : "연락처를 입력해 주세요."}
  }
  if(!formData.get("email")){
    return { message : "E-mail을 입력해 주세요."}
  }

  return {
    message: 'Please enter a valid email',
  }
}
