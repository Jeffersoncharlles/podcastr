import Image from "next/image";
import { Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from "phosphor-react";
import { usePlayerContext } from "../../context/PlayerContext";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import { Controls } from "./Controls";
import { useEffect, useRef } from "react";


export const Player = () => {
    const { episodeList, currentEpisodeIndex, isPlaying, setPlayState } = usePlayerContext()
    const audioRef = useRef<HTMLAudioElement>(null)

    const episode = episodeList[currentEpisodeIndex]

    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    return (
        <div className="w-96 h-screen  py-12 px-16 bg-[#8257E5] text-white flex flex-col items-center justify-between">
            <header className="flex items-center gap-4">
                <img src="/playing.svg" alt="tocando agora" />
                <strong className="font-display font-semibold">Tocando agora </strong>
            </header>

            {episode ? (
                <div className="text-center">
                    <Image
                        className="rounded-3xl"
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        alt={episode.title}
                        title={episode.title}
                        objectFit="cover"
                    />
                    <strong className="block mt-8 font-display text-base leading-7">{episode.title}</strong>
                    <span className="block mt-4 opacity-60 leading-6 text-sm">{episode.members}</span>
                </div>
            ) : (
                <div className="
                            w-full h-80 
                            border-[1.5px] border-dashed border-purple-300 
                            rounded-3xl bg-gradient-to-r from-[#9164facc]  
                            p-16 text-center
                            flex
                            items-center
                            justify-center
                        "
                >
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}

            <footer className={!episode ? 'opacity-50' : ''}>
                <div className="flex items-center gap-2 text-sm">
                    <span className="inline-block w-16 text-center">00:00</span>
                    <div className="flex-1">
                        {episode ? (
                            <Slider
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}

                            />
                        ) : (
                            <div className="w-full h-[4px] bg-[#9F75FF] rounded-sm" />
                        )}

                    </div>
                    <span className="inline-block w-16 text-center">00:00</span>
                </div>

                {episode && (
                    <audio
                        src={episode.url}
                        autoPlay
                        onPlay={() => setPlayState(true)}
                        onPause={() => setPlayState(false)}
                        ref={audioRef}
                    />
                )}

                <Controls episode={episode} />
            </footer>
        </div>
    );
}