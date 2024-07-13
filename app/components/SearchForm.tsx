import React from 'react'

export const SearchForm = () => {

  const handleAction = () =>{
    
  }
  return (
    <section>
      <form
        action={handleAction}
      >
        <input 
          type='text'
        />
        <button>
          검색하기
        </button>
      </form>
    </section>
  )
}

export default SearchForm