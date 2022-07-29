import { format, parseISO } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { IEpisode } from ".."
import { api } from "../../lib/api"
import { convertDurationToTimeString } from "../../utils/convertDurationTime"


type Episode = {
    episode: IEpisode
}


const Episode = ({ episode }: Episode) => {
    const router = useRouter()

    return (
        <div>
            <h1>{router.query.slug}</h1>
        </div>
    )

}

export default Episode


export const getStaticProps: GetStaticProps = async (ctx) => {
    const slug = ctx.params

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