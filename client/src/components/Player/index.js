import React, { useEffect, useRef, useState, useContext } from 'react';
import playerContext from "../Player/context"
import ReactNetflixPlayer from "react-netflix-player";

  
const Player = () => {

  const context = useContext(playerContext)

  const openFullscreen = () => {
    var elem = document.getElementById("player");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    
  }

  useEffect(() => {

    {context.playerItem && openFullscreen()}

  }, [])

    //console.log(`context is ${JSON.stringify(context.playerItem)}`)
    var episode = null;
    if (context.playerItem && context.playerItem.data && context.playerItem.data.type == "TVShow") { 
      console.log(`season_number is ${context.playerItem.season_number}`)
      episode = context.playerItem.data.seasons
      .find(season => season.season_number == context.playerItem.season_number).episodes
      .find(episode => episode.episode_number == context.playerItem.episode_number);
    }
    
    var episodeList = [];
    if (episode != null) {
      context.playerItem.data.seasons
      .find(season => season.season_number == context.playerItem.season_number).episodes
      .map(episode => episodeList.push({id: episode.episode_number, nome: episode.name, playing: false}))
      episodeList.find(episode => episode.id == context.playerItem.episode_number).playing = true;
    }

    return (
      <React.Fragment>
      {context.playerItem && (
        <div id={"player"} >
          <ReactNetflixPlayer
            src={context.playerItem.type == "Movie" ? context.playerItem.url_path : episode.url_path}
            // Pause screen 
            // movie or show name
            title={context.playerItem.type == "Movie" ? context.playerItem.title : context.playerItem.data.name}
            // episode name
            subTitle={context.playerItem.type == "Movie" ? "" : `S${context.playerItem.season_number}E${context.playerItem.episode_number} ${episode.name}`}
            // player bar
            // movie or show name
            titleMedia={context.playerItem.type == "Movie" ? context.playerItem.title : context.playerItem.data.name}
            // episode name
            extraInfoMedia={context.playerItem.type == "Movie" ? "" : `S${context.playerItem.season_number}E${context.playerItem.episode_number} ${episode.name}`}
            playerLanguage="en"
            backButton={() => { context.setPlayerItem(null) }}
            // The player uses all the viewport
            fullPlayer
            autoPlay
            startPosition={0}
            // The info of the next video action
            dataNext={context.playerItem.type == "Movie" ? {} : {title: episodeList[context.playerItem.episode_number].nome }}
            // The action call when the next video is clicked
            onNextClick={() => {}}
            // The list reproduction data, will be render in this order
            reprodutionList={context.playerItem.type == "Movie" ? [] : episodeList}
            // The function call when an item in reproductionList is clicked
            onClickItemListReproduction={(id, playing) => {
              return {
                id,
                playing,
              };
            }}
            // The function is call when the video finish
            onEnded={() => {}}
            // The function is call when the video is playing (One time for frame)
            onTimeUpdate={() => {}}
            // Enable the overlay when player is paused
            overlayEnabled
            // Enabled the auto clode controlls of player
            autoControllCloseEnabled
            // Style
            primaryColor="#db0000"
            secundaryColor="#ffffff"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      
            // subtitleMedia="/file.vtt"
          />
        </div>
        )}
        </React.Fragment>
      );
}
export default Player