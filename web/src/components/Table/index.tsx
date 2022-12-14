import { Play } from 'phosphor-react';
import Image from 'next/image';
import { IEpisode } from '../../pages';
import Link from 'next/link';
import { usePlayerContext } from '../../context/PlayerContext';

interface Props {
    allEpisodes: IEpisode[]
    episodeList: IEpisode[]
    latestEpisodes: IEpisode[]
}

export const Table = ({ allEpisodes, episodeList, latestEpisodes }: Props) => {
    const { play, playList } = usePlayerContext()

    const handlePlayer = (index: number) => {
        playList(episodeList, index + latestEpisodes.length)
    }

    return (
        <table className='w-full' cellSpacing={0} >
            <thead className="">
                <tr>
                    <th className="py-3 px-4 border-b border-[#E6E8EB] text-gray-400 uppercase font-medium font-display text-left"></th>
                    <th className="py-3 px-4 border-b border-gray-200 text-gray-400 uppercase font-medium font-display text-left">Podcast</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-gray-400 uppercase font-medium font-display text-left">Integrantes</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-gray-400 uppercase font-medium font-display text-left">Data</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-gray-400 uppercase font-medium font-display text-left">Duração</th>
                    <th className="py-3 px-4 border-b border-gray-200 text-gray-400 uppercase font-medium font-display text-left"></th>
                </tr>
            </thead>
            <tbody className=''>
                {allEpisodes.map((ep, index) => (
                    <tr className="" key={ep.id}>
                        <td className="py-3 px-4 border-b border-gray-200 text-sm w-20">
                            <Image
                                width={32}
                                height={32}
                                src={ep.thumbnail}
                                alt={ep.title}
                                objectFit="cover"
                                className='w-8 h-8 rounded-lg'
                            />
                        </td>
                        <td className='py-3 px-4 border-b border-gray-200 text-sm '>
                            <Link href={`/episodes/${ep.id}`}>
                                <a className="text-gray-800 font-display text-base hover:underline">{ep.title}</a>
                            </Link>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200 text-sm ">{ep.members}</td>
                        <td title="data da criação" className='py-3 px-4 border-b border-gray-200 text-sm w-28'>{ep.publishedAt}</td>
                        <td title="duração do programa" className='py-3 px-4 border-b border-gray-200 text-sm '>{ep.file.durationAsString}</td>
                        <td className="py-3 px-4 border-b border-gray-200 text-sm ">
                            <button
                                onClick={() => handlePlayer(index)}
                                title="Tocar"
                                type='button'
                                className='
                                    w-8 h-8 
                                    border-spacing-2 
                                    border-gray-100 
                                    rounded-lg
                                    text-[0]
                                    flex
                                    items-center
                                    justify-center
                                    transition-colors

                                    hover:brightness-90
                                '>
                                <Play size={24} color="#04D361" weight='fill' />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}