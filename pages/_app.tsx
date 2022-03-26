import '../styles/globals.css'
import "../styles/kakaoMap.css"
import type { AppProps } from 'next/app'
import Nav from '../components/nav'
function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <title>개시원</title>
    <Nav></Nav>
    <Component {...pageProps} />
  </>
  )
  

}

export default MyApp
