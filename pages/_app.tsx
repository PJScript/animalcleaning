import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '../components/nav'
function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <Nav></Nav>
    <Component {...pageProps} />
  </>
  )
  

}

export default MyApp
