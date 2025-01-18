import React, { useState } from "react";
import axios from "axios";
import YouTubePlayer from "./YoutubePlayer";

const MainGame = () => {
    // return (
    //     <div>
    //         <h2>Listen carefully!</h2>
    //     </div>
    // );
    return <YouTubePlayer videoUrl={"https://www.youtube.com/watch?v=r6zIGXun57U&ab_channel=LeagueofLegends"}></YouTubePlayer>;
};

export default MainGame;