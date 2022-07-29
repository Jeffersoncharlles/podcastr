import { format, parseISO } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { CaretLeft, Play } from "phosphor-react"
import { IEpisode } from ".."
import { api } from "../../lib/api"
import { convertDurationToTimeString } from "../../utils/convertDurationTime"


type TEpisode = {
    episode: IEpisode
}


const Episode = ({ episode }: TEpisode) => {


    return (
        <div className="">
            <div className="">
                <button type="button" className="">
                    <CaretLeft weight="regular" />
                </button>
                <Image
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover"
                    className=""
                />
                <button type="button" className="">
                    <Play size={24} color="#04D361" weight='fill' />
                </button>
            </div>
            <header className="">
                <h1 className="">{episode.title}</h1>
                <span className="">{episode.members}</span>
                <span className="">{episode.publishedAt}</span>
                <span className="">{episode.file.durationAsString}</span>
            </header>

            <div className="" dangerouslySetInnerHTML={{ __html: episode.description }} />


        </div>
    )

}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
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