import '../styles/global.css'
import { createServer, Model } from 'miragejs';
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import episodes from '../../server.json'
import { PlayerProvider } from '../context/PlayerContext';

// createServer({
//   models: {
//     episode: Model,
//   },

//   seeds(server) {
//     server.db.loadData(episodes)
//   },

//   routes() {
//     this.namespace = "v1";

//     this.get('/episodes', () => {
//       return this.schema.all('episode')
//     })

//     this.post('/episodes', (schema, req) => {
//       const data = JSON.parse(req.requestBody)

//       return schema.create('episode', data)
//       //schema e para poder criar os dados no db interno
//     })
//   }
// })


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayerProvider>
      <div className='flex '>
        <main className='flex-1'>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerProvider>
  )
}

export default MyApp
