import styled from "styled-components"
import useScrollFadeIn from "../../hooks/useScrollFadein"
import { useState, useEffect } from "react"
import { locationState } from "../../state/store"

interface Props {
  locationName: string,
}

const locationCategoryItem = (props: Props) => {
  const [categorySelect, setCategorySelect] = useState<boolean>(false)
  const setRegion = locationState((state) => state.setRegion)
  const region = locationState((state) => state.region)

  const locationItemLeftAnimation01 = useScrollFadeIn("left", 0.5, 0.1)
  const categoryClick = () => {
    setRegion(props.locationName)
  };
  useEffect(()=>{
    console.log(region,"리전")
  },[])

    return (
      <>
        <LocationCategoryItem propRegion={props.locationName} region={region} onClick={categoryClick} {...locationItemLeftAnimation01}>{props.locationName}</LocationCategoryItem>
      </>
    )
}

export default locationCategoryItem

const LocationCategoryItem = styled.li.attrs(()=>{})`
  width: 5rem;
  height: auto;
  background: ${(props) => props.region === props.propRegion ? "orange" : "rgba(0, 0, 255, 0.2)"};
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