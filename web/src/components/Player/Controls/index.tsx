import { Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from "phosphor-react";
import { usePlayerContext } from "../../../context/PlayerContext";

interface Props {
    episode: any
}

export const Controls = ({ episode }: Props) => {
    const { togglePlay, isPlaying, playNext, playPrevious } = usePlayerContext()

    return (
        <div className="
                        flex items-center justify-center
                        mt-10 gap-6 
                        text-[0]
                        "
        >
            <button type="button" disabled={!episode} className="disabled:cursor-not-allowed">
                <Shuffle size={24} weight="bold" color="#fff" />
            </button>
            <button type="button" disabled={!episode} className="disabled:cursor-not-allowed" onClick={() => playPrevious()}>
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
            <button type="button" disabled={!episode} className="disabled:cursor-not-allowed" onClick={() => playNext()}>
                <SkipForward size={24} weight="bold" color="#fff" />
            </button>
            <button type="button" disabled={!episode} className="disabled:cursor-not-allowed">
                <Repeat size={24} weight="bold" color="#fff" />
            </button>
        </div>
    );
}