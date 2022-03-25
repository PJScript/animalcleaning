import styled from "styled-components";
import Image from "next/image"
interface loadingProps {
  view: boolean
}

const loading = (props: loadingProps) => {
    console.log(props.view)
    return (
        <LoadingWrapper view={props.view}>로딩중...
          <Image src={"/dogeBremove.gif"} width={100} height={100}></Image>
        </LoadingWrapper>
    )
}

export default loading

const LoadingWrapper = styled.div.attrs(()=>{})`
  display:${(props) => props.view ? "flex" : "none"};
  font-size:10.0rem;
  justify-content: center;
  align-items: center;
  width:100vw;
  height:100vh;
  background:rgba(69, 69, 71,0.3);
  position:fixed;
  top:0;
  left:0;
  z-index:999;
`