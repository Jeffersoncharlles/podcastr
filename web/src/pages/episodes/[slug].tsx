import { format, parseISO } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { CaretLeft, Play } from "phosphor-react"
import { IEpisode } from ".."
import { usePlayerContext } from "../../context/PlayerContext"
import { api } from "../../lib/api"
import { convertDurationToTimeString } from "../../utils/convertDurationTime"


type TEpisode = {
    episode: IEpisode
}


const Episode = ({ episode }: TEpisode) => {
    const { play } = usePlayerContext()


    return (
        <div className="w-full  overflow-y-scroll">
            <div className=" max-w-3xl px-12 py-8 my-0 mx-auto h-[calc(100vh-7rem)] ">
                <div className="relative">
                    <Link href={"/"}>
                        <button
                            title="Voltar"
                            type="button"
                            className="
                                translate-y-[-50%]
                                translate-x-[-50%]
                                left-0 top-1/2 
                                w-12 h-12 bg-[#8257E5] 
                                rounded-xl 
                                border-[0px] 
                                absolute z-10 
                                text-[0px] 
                                transition-colors hover:brightness-90
                                flex items-center justify-center 
                            "
                        >
                            <CaretLeft weight="regular" size={24} color="#ffff" />
                            ti
                        </button>
                    </Link>
                    <Image
                        width={700}
                        height={160}
                        src={episode.thumbnail}
                        objectFit="cover"
                        className="rounded-2xl"
                        alt={episode.title}
                    />
                    <button
                        onClick={() => play(episode)}
                        title="Tocar"
                        type="button"
                        className="
                        translate-y-[-50%]
                        translate-x-[50%]
                        right-0 top-1/2 
                        bg-[#04D361]  w-12 h-12 
                        rounded-xl 
                        border-[0px] 
                        absolute z-10 
                        text-[0px] 
                        hover:brightness-90
                        flex items-center justify-center 
                    "
                    >
                        <Play size={24} color="#ffff" weight='fill' />
                    </button>
                </div>
                <header className="pb-4 border-b border-gray-200">
                    <h1 className="mt-8 mb-6">{episode.title}</h1>
                    <span className="inline-block text-sm relative">{episode.members}</span>
                    <time
                        title="data da criação"
                        className="
                            inline-block text-sm ml-4 pl-4 relative
                            after:w-[4px] 
                            after:h-[4px] 
                            after:bg-[#1212]
                            after:rounded-sm 
                            after:left-0 
                            after:top-[50%] 
                            after:absolute
                        "
                    >{episode.publishedAt}</time>
                    <span
                        title="duração do programa"
                        className="
                            inline-block text-sm ml-4 pl-4  relative
                            after:w-[4px] 
                            after:h-[4px] 
                            after:bg-[#1212]
                            after:rounded-sm 
                            after:left-0 
                            after:top-[50%] 
                            after:absolute
                        "
                    >{episode.file.durationAsString}</span>
                </header>

                <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: episode.description }}
                />


            </div>
        </div>
    )

}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get('episodes', {
        params: {
            _limit: 2,
            _sort: 'published_at',
            _order: 'desc'
        }
    })

    const paths = data.map((ep: any) => {
        return {
            params: {
                slug: ep.id
            }
        }
    })

    return {
        paths,
        fallback: 'blocking'
    }

}
export const getStaticProps: GetStaticProps = async (ctx) => {
    const slug = ctx.params?.slug

    const { data } = await api.get(`episodes/${slug}`)


    const episode = {
        id: data.id,
        title: data.title,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        thumbnail: data.thumbnail,
        description: data.description,
        file: {
            url: data.file.url,
            type: data.file.type,
            duration: Number(data.file.duration),
            durationAsString: convertDurationToTimeString(Number(data.file.duration))
        }
    }



    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24,// 24horas
    }

}

export default Episode

