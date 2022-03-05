import styled from "styled-components"

const nav = () => {
  return (
    <MainNavContainer>
      <Logo>
        텍스트
      </Logo>
      <UlContainer>
        <LiItem>
          텍스트1
        </LiItem>
        <LiItem>
          텍스트2
        </LiItem>
        <LiItem>
          텍스트3
        </LiItem>
        <SearchBox></SearchBox>
        <MyPageToolBox>
          <div>아이콘</div>
        </MyPageToolBox>
      </UlContainer>
      
    </MainNavContainer>

  )
}

export default nav


const MainNavContainer = styled.div`
  display:flex;
  width:100%;
  height:150px;
  color:black;
  /* background-color:gray; */
  /* opacity:0.3; */
  position:fixed;
  top:0;
  left:0;
  z-index: 1;
  overflow:hidden;
  padding-left: 100px;


  @media screen and (max-width: 768px){
    height:70px;
  }

`

const Logo = styled.div`
  width:100px;
  font-size: 30px;
  font-weight: bold;
  margin-top:100px;
`

const UlContainer = styled.ul`
  display:flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  margin:0;
  padding:0;
  list-style:none;
  margin-top: 116px;
  padding-left: 200px;
  padding-right:98px;
`

const LiItem = styled.li`
  margin-right:18px;
`

const SearchBox = styled.li`
  background-color:white;
  width:392px;
  height:28px;
  border-radius:10px;
  margin-top:-4px;
`

const MyPageToolBox = styled.div`
  display:flex;
  margin-left:auto;
`