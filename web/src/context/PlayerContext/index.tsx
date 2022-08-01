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
    hasPrevious: boolean
    hasNext: boolean
    isLooping: boolean
    isShuffling: boolean
    play: (episode: Episode) => void
    togglePlay: () => void
    setPlayState: (state: boolean) => void
    playList: (list: Episode[], currentEp: number) => void
    playNext: () => void
    playPrevious: () => void
    toggleLoop: () => void
    toggleShuffle: () => void
    handleEpisodeEnded: () => void
}


const PlayerContext = createContext({} as IPlayerContext)



export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [episodeList, setEpisodeList] = useState<Episode[]>([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)

    //===========================================================================================//
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
    //===========================================================================================//
    //===========================================================================================//
    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }
    const setPlayState = (state: boolean) => {
        setIsPlaying(state)
    }
    //===========================================================================================//
    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length
    const playNext = () => {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        } else if (hasNext) {
            setCurrentEpisodeIndex((state) => state + 1)
        }
    }
    const playPrevious = () => {

        if (currentEpisodeIndex > 0) {
            setCurrentEpisodeIndex(state => state - 1)
        }

    }

    const handleEpisodeEnded = () => {
        if (hasNext) {
            playNext()
        } else {
            clearPlayerState()
        }
    }

    const clearPlayerState = () => {
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }
    //===========================================================================================//
    //===========================================================================================//
    const toggleLoop = () => {
        setIsLooping(!isLooping)
    }
    const toggleShuffle = () => {
        setIsShuffling(!isShuffling)
    }
    //===========================================================================================//
    //===========================================================================================//

    return (
        <PlayerContext.Provider value={{
            episodeList, currentEpisodeIndex, isPlaying,
            hasNext, hasPrevious, isLooping, isShuffling,
            play, togglePlay, setPlayState, playList, playNext,
            playPrevious, toggleLoop, toggleShuffle, handleEpisodeEnded
        }}>
            {children}
        </PlayerContext.Provider>
    )

}


export const usePlayerContext = () => {
    const context = useContext(PlayerContext)

    return context
}