
import styled from "styled-components";
import { SectionDiv } from "./globalSection";
const SecondSection = () => {
  return (
    <>
      <Test>안녕하세요</Test>
    </>
  );
};

export default SecondSection;

const Test = styled(SectionDiv)`
  color: black;
  font-size: 5.6rem;
`;
