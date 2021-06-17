import React, { useEffect, useState, useContext } from "react"
import PlayerContext from "../Player/context"
import SeasonSelect from "./SeasonSelect"

const Episodes = ({ additionalMovieInfo, noEpisodesTab }) => {
    const { playerItem, setPlayerItem } = useContext(PlayerContext)
    const [seasonNumber, setSeasonNumber] = useState(1)

    const changeSeason = (num) => {
        setSeasonNumber(num)
    }

    useEffect(() => {
    
    }, [])

    if (additionalMovieInfo && additionalMovieInfo.type == "Movie"){
        noEpisodesTab()
    }

    return (
        additionalMovieInfo && additionalMovieInfo.type == "TVShow" && (
        <div className="menu-episodes">
            <SeasonSelect items={additionalMovieInfo.seasons} onChange={changeSeason}/>
            <div className="menu-episode-content">

                {additionalMovieInfo.seasons
                .find(season => season.season_number == seasonNumber).episodes.map((episode, index) => {

                    return (
                        <div className="episode-item" key={index}>
                            <div className="episode-item-image"><img onClick={() => setPlayerItem({data: additionalMovieInfo, season_number: seasonNumber, episode_number: index+1})} src={`${process.env.REACT_APP_IMAGE_BASE}w500_and_h282_face/${episode.still_path}`} alt={"item"} /></div>
                            <div className="episode-item-metada">
                                <span className="episode-item-title">{episode.name}</span><br />
                                <span className="release-date">{episode.air_date}</span>
                            </div>
                            <div className="episode-item-synopsis">{episode.overview}</div>
                        </div>
                    )

                })}
            </div>
        </div>
        )
    )
}


export default Episodes