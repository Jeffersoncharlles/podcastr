import { Play, Repeat, Shuffle, SkipBack, SkipForward } from "phosphor-react";


export const Player = () => {

    return (
        <div className="w-96 h-screen  py-12 px-16 bg-[#8257E5] text-white flex flex-col items-center justify-between">
            <header className="flex items-center gap-4">
                <img src="/playing.svg" alt="tocando agora" />
                <strong className="font-display font-semibold">Tocando agora</strong>
            </header>

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

            <footer className={`opacity-50 `}>
                <div className="flex items-center gap-2 text-sm">
                    <span className="inline-block w-16 text-center">00:00</span>
                    <div className="flex-1">
                        <div className="w-full h-[4px] bg-[#9F75FF] rounded-sm" />
                    </div>
                    <span className="inline-block w-16 text-center">00:00</span>
                </div>
                <div className="flex items-center justify-center mt-10 gap-6 text-[0]">
                    <button type="button">
                        <Shuffle size={24} weight="bold" color="#fff" />
                    </button>
                    <button type="button">
                        <SkipBack size={24} weight="bold" color="#fff" />
                    </button>
                    <button type="button" className="bg-[#9164FA] rounded-2xl p-4">
                        <Play size={24} weight="bold" color="#fff" />
                    </button>
                    <button type="button">
                        <SkipForward size={24} weight="bold" color="#fff" />
                    </button>
                    <button type="button">
                        <Repeat size={24} weight="bold" color="#fff" />
                    </button>
                </div>
            </footer>
        </div>
    );
}