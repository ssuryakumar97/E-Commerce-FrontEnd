import styled from "styled-components"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from "react-router-dom";
import { mobile } from "../responsive";


const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index:3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`

const Container = styled.div`
    flex:1 ;
    margin: 5px;
    min-width: 20vw;
    height:350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    border-radius: 10px;

    &:hover ${Info}{
        opacity: 1;
        border-radius: 10px;
    }
    ${mobile({ height:"200px",marginTop: "10px", padding: "5px", width: "80%"})}
`


const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`
const Image = styled.img`
    width: 75%;
    height: 75%;
    object-fit: contain;
    z-index:2;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`

const TitleDiv = styled.div`
  font-weight: bold;
  /* font-size: 18px; */
`
const PriceDiv = styled.div`
  font-weight: 200;
`

function Product({item}) {
  return (
    <Container>
      <Image src={item.img}/>
      <Info>
        <Icon>
            <Link to={`/product/${item._id}`}>
            <SearchOutlinedIcon/>
            </Link>
        </Icon>
      </Info>
        <TitleDiv>{item.title}</TitleDiv>
        <PriceDiv>₹{item.price}</PriceDiv>

    </Container>
  )
}

export default Product
