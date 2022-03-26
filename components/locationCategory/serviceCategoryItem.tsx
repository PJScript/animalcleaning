import styled from "styled-components"
import useScrollFadeIn from "../../hooks/useScrollFadein"
import { useState, useEffect } from "react"
import { locationState } from "../../state/store"

interface Props {
  serviceName: string
}

const locationCategoryItem = (props: Props) => {
  const [categorySelect, setCategorySelect] = useState<boolean>(false)
  const city = locationState((state) => state.city)
  const service = locationState((state) => state.service)
  const setService = locationState((state)=> state.setService)

  const locationItemLeftAnimation01 = useScrollFadeIn("left", 0.5, 0.1)
  const categoryClick = () => {
    setService(props.serviceName)
  };
  useEffect(()=>{

  },[])

    return (
      <>
        <ServiceCategoryItem propService={props.serviceName} service={service} onClick={categoryClick} {...locationItemLeftAnimation01}>{props.serviceName}</ServiceCategoryItem>
      </>
    )
}

export default locationCategoryItem

const ServiceCategoryItem = styled.li.attrs(()=>{})`
  width: 10rem;
  height: auto;
  background: ${(props) => props.service === props.propService ? "orange" : "rgba(212, 212, 212,0.9)"};
  color: black;
  border-radius: 1.5rem;
  text-align: center;
  font-size: 2.8rem;
  margin-right:1rem;
  margin-left:1rem;
  margin-top:0.5rem;

  &:hover{
      cursor:pointer;
  }
`;