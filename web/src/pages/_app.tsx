import '../styles/global.css'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Player } from '../components/Player'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='flex '>
      <main className='flex-1'>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp
