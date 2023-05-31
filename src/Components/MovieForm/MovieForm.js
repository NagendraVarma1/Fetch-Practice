import React, { useRef } from "react";

const MovieForm = () => {
    const titleInputRef = useRef();
    const openingTextInputRef = useRef();
    const releaseDateInputRef = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const title = titleInputRef.current.value;
        const openingText = openingTextInputRef.current.value;
        const releaseDate = releaseDateInputRef.current.value;

        let newMovie = {
            title,
            openingText,
            releaseDate
        }
        console.log(newMovie)
    }


  return (
    <form onSubmit={formSubmitHandler} style={{ width: '80%', margin:'20px 70px ', border: '2px solid black'}}>
      <div  style={{padding: '10px'}}>
        <div>
          <label style={{paddingRight: '20px' }}>Title</label>
          <input type="text" ref={titleInputRef} required/>
        </div>
        <div>
          <label style={{paddingRight: '20px' }}>Opening Text</label>
          <input type="text"  ref={openingTextInputRef} required/>
        </div>
        <div>
          <label style={{paddingRight: '20px' }}>Release Date</label>
          <input type="date" ref={releaseDateInputRef} required/>
        </div>
      </div>
      <button type="submit" style={{margin: '10px'}}>Add Movies</button>
    </form>
  );
};

export default MovieForm;
