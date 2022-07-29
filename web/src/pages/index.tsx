import type { GetStaticProps } from 'next'

import Image from 'next/image';
import { Play } from 'phosphor-react';
import { api } from '../lib/api';
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../utils/convertDurationTime';
import { Card } from '../components/Card';
import { Table } from '../components/Table';

export interface IEpisode {
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

type HomeProps = {
  latestEpisodes: IEpisode[]
  allEpisodes: IEpisode[]
}

const Home = ({ allEpisodes, latestEpisodes }: HomeProps) => {

  return (
    <div className='px-16 py-0 h-[calc(100vh-7rem)] overflow-y-scroll'>
      <section className=''>
        <h2 className='mt-12 mb-6'>Últimos lançamentos</h2>
        <ul className="grid grid-cols-2 gap-6">

          {latestEpisodes.map((ep) => (
            <Card key={ep.id} ep={ep} />
          ))}

        </ul>
      </section>
      <section className='pb-8'>
        <h2 className='mt-12 mb-6'>Todos os episódios</h2>
        <Table allEpisodes={allEpisodes} />
      </section>

    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map((ep: any) => {
    return {
      id: ep.id,
      title: ep.title,
      members: ep.members,
      publishedAt: format(parseISO(ep.published_at), 'd MMM yy', { locale: ptBR }),
      thumbnail: ep.thumbnail,
      description: ep.description,
      file: {
        url: ep.file.url,
        type: ep.file.type,
        duration: Number(ep.file.duration),
        durationAsString: convertDurationToTimeString(Number(ep.file.duration))
      }
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)


  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}
