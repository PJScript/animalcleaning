import styled from "styled-components";
import { locationState } from "../../state/store";


interface cityLocationProps {
    locationCityName: string
}
const cityLocationCategoryItem = (props: cityLocationProps) => {
    const cityState = locationState((state) => state.city)
    const setCity = locationState((state) => state.setCity)
    

    const cityCategoryClick = () => {
        setCity(props.locationCityName)
    } 
    return (
      <CityLocationCategoryItem onClick={cityCategoryClick} city={cityState} propCity={props.locationCityName}>{props.locationCityName}</CityLocationCategoryItem>
    )
}

export default cityLocationCategoryItem


const CityLocationCategoryItem = styled.li.attrs(()=>{})`
  width: 8rem;
  height: 5rem;
  margin-left:10px;
  margin-bottom:4px;
  text-align:center;
  border-radius:16px;
  background-color: ${(props) => props.city === props.propCity ? "orange" : "rgba(161, 236, 220,0.6)"}; 
`