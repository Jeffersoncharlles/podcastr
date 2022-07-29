import { createContext, useContext, useState } from "react";

type Episode = {
    title: string
    members: string
    thumbnail: string
    duration: number
    url: string
}


interface IPlayerContext {
    episodeList: Episode[]
    currentEpisodeIndex: number
    play: (episode: Episode) => void

}


const PlayerContext = createContext({} as IPlayerContext)



export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [episodeList, setEpisodeList] = useState<Episode[]>([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

    const play = (episode: Episode) => {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
    }

    return (
        <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play }}>
            {children}
        </PlayerContext.Provider>
    )

}


export const usePlayerContext = () => {
    const context = useContext(PlayerContext)

    return context
}