const Movie = (props) => {
    
    async function deleteMovieHandler(id) {
        console.log(id)
        try{
            const response = await fetch(`https://react-project-4e5e7-default-rtdb.firebaseio.com/movies/${id}.json` , {
            method: 'DELETE',
        })
        if(!response.ok){
            throw new Error('something went wrong')
        }
        const data = await response.json();
        console.log(data)
        }
        catch(error){
            console.log(error.message)
        }
        
        props.onButtonClick()
    }
    return(
        <li >
            <h2>{props.title}</h2>
            <h2>{props.releaseDate}</h2>
            <p>{props.openingText}</p>
            <button onClick={() => deleteMovieHandler(props.id)}>Delete</button>
        </li>
    )
}

export default Movie;