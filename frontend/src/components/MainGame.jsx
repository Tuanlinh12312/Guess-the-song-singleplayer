import React, { useState } from "react";
import axios from "axios";
import YouTubePlayer from "./YoutubePlayer";

const MainGame = () => {
    const [GuessName, setGuessName] = useState({"name": ""});
    const [GuessAuthor, setGuessAuthor] = useState({"author": ""});
    const [message, setMessage] = useState("");
    
    const handleGuessNameChange = (value) => {
        setGuessName({"name": value});
      }

    const handleGuessAuthorChange = (value) => {
        setGuessAuthor({"author": value});
      }
    
    const handleSubmit = async (e) => {
         e.preventDefault();
         try {
           const response = await axios.post("http://localhost:8080/GuessName", {name: GuessName});
           setMessage(response.data.message);
         } catch (err) {
           setMessage(`Error: ${err.response?.data?.error || "Something went wrong"}`);
         }
         try {
             const response = await axios.post("http://localhost:8080/GuessAuthor", {author: GuessAuthor});
             setMessage(response.data.message);
           } catch (err) {
             setMessage(`Error: ${err.response?.data?.error || "Something went wrong"}`);
           }
         }

    return (
        <div>
          <h1>Guess the song</h1>
          <h2>Listen carefully!</h2>
          <form onSubmit={handleSubmit}>
          <h3>GUESS</h3>
            <input
                type="text"
                placeholder="Song Name"
                onChange={(e) => handleGuessNameChange(e.target.value)}
            /> 
            <input
                type="text"
                placeholder="Author"
                onChange={(e) => handleGuessAuthorChange(e.target.value)}
            />   
            <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>

    );
   return <YouTubePlayer videoUrl={"https://www.youtube.com/watch?v=r6zIGXun57U&ab_channel=LeagueofLegends"}></YouTubePlayer>;
};

export default MainGame;