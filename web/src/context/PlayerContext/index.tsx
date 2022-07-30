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
    isPlaying: boolean
    play: (episode: Episode) => void
    togglePlay: () => void
    setPlayState: (state: boolean) => void

}


const PlayerContext = createContext({} as IPlayerContext)



export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [episodeList, setEpisodeList] = useState<Episode[]>([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const play = (episode: Episode) => {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }
    const setPlayState = (state: boolean) => {
        setIsPlaying(state)
    }

    return (
        <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, isPlaying, play, togglePlay, setPlayState }}>
            {children}
        </PlayerContext.Provider>
    )

}


export const usePlayerContext = () => {
    const context = useContext(PlayerContext)

    return context
}