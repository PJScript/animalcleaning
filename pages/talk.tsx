import styled from "styled-components";

const talkPage = () => {
    const arr = ["red","orange","yellow","green","blue","black","purple","red","orange","yellow","green","blue","black","purple","red","orange"]
        
  return (
    <TalkPageContainer>
      <BlankBox></BlankBox>
      <TalkPageWrapper>
        <TalkPageList>
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((item, idx)=>{
            return <TalkPageItem>
                <TalkItemLayoutTop color={arr[item-1]}>사진</TalkItemLayoutTop>
                <TalkItemLayoutCenter>익명의 {item}번 사람</TalkItemLayoutCenter>
                <TalkItemLayoutBottom>
                {item}번 글입니다.
                </TalkItemLayoutBottom>
                </TalkPageItem>
          }) }
        </TalkPageList>
      </TalkPageWrapper>
    </TalkPageContainer>
  );
};

export default talkPage;

const BlankBox = styled.div`
  width: 100%;
  height: 120px;
`;
const TalkPageContainer = styled.div`
  width: 100%;
  height: auto;
  color: black;
  font-size: 2.4rem;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 10px;
  @media screen and (max-width:420px){
    padding:0;
  }

  @media screen and (max-width:360px) {
    width:360px;
  }
`;

const TalkPageWrapper = styled.div`
  display: flex;
  width:100%;
  height:auto;
  justify-content: center;

  padding: 18px;
  border-radius: 22px;

  @media screen and (max-width:1024px){
    padding:10px;
  }


`;

const TalkPageList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  width:840px;
  height: auto;
  flex-wrap: wrap;
     justify-content: flex-start;
  @media screen and (max-width:1024px){
      width:840px;
      
  }
  @media screen and (max-width:1024px){
      width:680px;
  }

  @media screen and (max-width:768px){
      width:510px;
  }

  @media screen and (max-width:598px){
      width:340px;
  }
`;

const TalkPageItem = styled.li`
  width: 20.0rem;
  height: 30.0rem;
  border:1px solid black;
  border-radius: 10px;
  margin-right: 5px;
  margin-left:5px;
  margin-bottom: 10px;
`;

const TalkItemLayoutTop = styled.div.attrs(()=>{})`
display:flex;
align-items:center;
background:${(props) => props.color};
border-top-left-radius: 10px;
border-top-right-radius: 10px;
justify-content: center;
  width:100%;
  height:15.0rem;
  border-bottom:1px solid black;
`

const TalkItemLayoutCenter = styled.div`
  padding-left:10px;
  padding-right:10px;
`

const TalkItemLayoutBottom = styled.div`
  padding-left:10px;
  padding-right:10px;
`
