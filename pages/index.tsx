import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
const Home: NextPage = () => {

  DogBackImage.defaultProps = {
    src:"backgroundImage/dogBackgroundRemoveB.png"
  }
  return (
    <>
      <MainContainer>
        <Figure>
          <DogBackImage></DogBackImage>
        </Figure>
        <div style={{fontSize:"42px", fontWeight:"bold"}}></div>
        <div style={{fontSize:"42px", fontWeight:"bold"}}></div>
        <div style={{fontSize:"42px", fontWeight:"bold"}}>
          <div>텍스트하나 둘셋넷</div>
          <div>텍스트 하나 둘셋 하나둘셋넷</div>
          <MainLeftButtonBox>
            <button>버튼1</button>
            <button>버튼2</button>
          </MainLeftButtonBox>
        </div>
        <div style={{fontSize:"42px", fontWeight:"bold"}}>흰색 박스</div>
        <div style={{fontSize:"42px", fontWeight:"bold"}}>카톡 인스타 유튜브</div>
      </MainContainer>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  )
}

export default Home



const MainContainer = styled.div.attrs(() => {

})`
  display:flex;
  flex-direction:column;
  justify-content: space-between;
  position:relative;
  width:100%;
  height:100vh;
  padding-left:98px;
  &::after{
    width:100%;
    height:100vh;
    content:"";
    background-color:rgb(181,214,146);
    position: absolute;
    top:0;
    left:0;
    z-index:-2;
    overflow:hidden;
  }

  &::before{
    width:100%;
    height:100vh;
    content:"";
    background: url("/backgroundImage/grass.jpg");
    background-size: cover;
    opacity: 0.07;
    position: absolute;
    top:0;
    left:0;
    z-index:-1;
    overflow:hidden;
    }

`

const MainLeftButtonBox = styled.div`
  display:flex;
`

const Figure = styled.div`
  position:absolute;
  z-index: -1;
  bottom: 0%;
`

const DogBackImage = styled.img`
  width:100%;
  height:auto;
  opacity: 0.7;
  object-fit:contain;
  margin-bottom:-3.2px;
  /* &::after{
    width:100%;
    height:100vh;
    content:"";
    background-size: cover;
    opacity: 0.5;
    position: absolute;
    top:0;
    left:0;
    z-index:-1;
    overflow:hidden;
    } */
`


