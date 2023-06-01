import React, { useRef } from "react";

const MovieForm = (props) => {
    const titleInputRef = useRef();
    const openingTextInputRef = useRef();
    const releaseDateInputRef = useRef();

    async function formSubmitHandler(event) {
        event.preventDefault();

        const title = titleInputRef.current.value;
        const openingText = openingTextInputRef.current.value;
        const releaseDate = releaseDateInputRef.current.value;

        let newMovie = {
            title,
            openingText,
            releaseDate
        }
        const response = await fetch("https://react-project-4e5e7-default-rtdb.firebaseio.com/movies.json", {
          method: 'POST',
          body: JSON.stringify(newMovie),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data)
        props.onButtonClick();
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
