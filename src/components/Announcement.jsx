import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
    height: 30px;
    background-color: purple;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    ${mobile({width : "100%", fontSize: "11px", margin: "20px 0px"})}
`

function Announcement() {
  return (
    <Container>
        Super Deal! Get Extra 10% discount on purchase of more than one lakh
    </Container>
  )
}

export default Announcement
