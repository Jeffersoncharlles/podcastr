import { Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from "phosphor-react";
import { usePlayerContext } from "../../../context/PlayerContext";

interface Props {
    episode: any
}

export const Controls = ({ episode }: Props) => {
    const {
        togglePlay, playNext, playPrevious, toggleLoop, toggleShuffle,
        hasNext, hasPrevious, isLooping, isPlaying, isShuffling,
        episodeList
    } = usePlayerContext()

    return (
        <div className=" flex items-center justify-center mt-10 gap-6 text-[0]">
            <button
                onClick={() => toggleShuffle()}
                type="button"
                disabled={!episode || episodeList.length === 1}
                className="disabled:cursor-not-allowed"
            >
                <Shuffle size={24} weight="bold" color={isShuffling ? '#4f2aa5' : '#fff'} />
            </button>
            <button
                type="button"
                disabled={!episode || !hasPrevious}
                className="disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => playPrevious()}
            >
                <SkipBack size={24} weight="bold" color="#fff" />
            </button>
            <button
                type="button"
                className="
                    bg-[#9164FA] 
                    rounded-2xl 
                    p-4 
                    disabled:cursor-not-allowed
                    transition-colors
                    hover:brightness-95
                "
                onClick={togglePlay}
                disabled={!episode}>
                {isPlaying ? <Pause size={24} weight="bold" color="#fff" /> : <Play size={24} weight="bold" color="#fff" />}

            </button>
            <button
                type="button"
                disabled={!episode || !hasNext}
                className="disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => playNext()}
            >
                <SkipForward size={24} weight="bold" color="#fff" />
            </button>
            <button
                onClick={() => toggleLoop()}
                type="button"
                disabled={!episode}
                className="disabled:cursor-not-allowed "
            >
                <Repeat size={24} weight="bold" color={isLooping ? '#4f2aa5' : '#fff'} />
            </button>
        </div>
    );
}