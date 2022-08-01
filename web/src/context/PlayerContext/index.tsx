import { createContext, useContext, useState } from "react";

type Episode = {
    id: string;
    title: string;
    members: string;
    publishedAt: string;
    thumbnail: string;
    description: string;
    file: {
        url: string;
        type: string;
        duration: number;
        durationAsString: string
    }
}

interface IPlayerContext {
    episodeList: Episode[]
    currentEpisodeIndex: number
    isPlaying: boolean
    play: (episode: Episode) => void
    togglePlay: () => void
    setPlayState: (state: boolean) => void
    playList: (list: Episode[], currentEp: number) => void
    playNext: () => void
    playPrevious: () => void
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

    const playList = (list: Episode[], currentEp: number) => {
        setEpisodeList(list)
        setCurrentEpisodeIndex(currentEp);
        setIsPlaying(true)
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }
    const setPlayState = (state: boolean) => {
        setIsPlaying(state)
    }

    const playNext = () => {
        const nextEpisodeIndex = currentEpisodeIndex + 1
        if (nextEpisodeIndex >= episodeList.length) {
            setCurrentEpisodeIndex((state) => state + 1)
        }
    }

    const playPrevious = () => {
        if (currentEpisodeIndex > 0) {
            setCurrentEpisodeIndex(state => state - 1)
        }

    }

    return (
        <PlayerContext.Provider value={{
            episodeList, currentEpisodeIndex, isPlaying,
            play, togglePlay, setPlayState, playList, playNext,
            playPrevious,
        }}>
            {children}
        </PlayerContext.Provider>
    )

}


export const usePlayerContext = () => {
    const context = useContext(PlayerContext)

    return context
}