import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  updateProduct,
  removeProduct,
  deleteProduct,
} from "../redux/cartRedux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px", display: "flex", flexDirection: "column" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
  ${mobile({ flexDirection: "column" })}
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ width: "100%" })}
`;
const Image = styled.img`
  width: 200px;
  ${mobile({ width: "150px" })}
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ fontSize: "14px", padding: "10px" })}
`;
const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 55vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  /* height: 50%; */
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  margin: 10px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [updateContact, setUpdateContact] = useState({
    address: "",
    contactNo: "",
  });
  const totalPrice = cart.products.reduce((acc, val) => {
    return acc + val.totalProductPrice;
  }, 0);
  const estimatedShipping = Math.round(cart.quantity * 60);
  let discount;

  if (totalPrice >= 100000) {
    discount = Math.round(0.2 * totalPrice);
  } else {
    discount = Math.round(0.1 * totalPrice);
  }

  const handleAddItem = (product) => {
    const update = cart.products.map((val) => {
      if (val._id == product._id) {
        return {
          ...val,
          quantity: val.quantity + 1,
          totalProductPrice: (val.quantity + 1) * val.price,
        };
      } else {
        return val;
      }
    });
    // console.log(update);
    dispatch(updateProduct(update));
  };

  const handleRemoveItem = (product) => {
    // console.log(product);
    if (product.quantity < 2) {
      const update = cart.products.filter((val) => val._id != product._id);
      dispatch(updateProduct(update));
      dispatch(removeProduct());
    } else {
      const update = cart.products.map((val) => {
        if (val._id == product._id) {
          return {
            ...val,
            quantity: val.quantity - 1,
            totalProductPrice: (val.quantity - 1) * val.price,
          };
        } else {
          return val;
        }
      });
      // console.log(update);
      dispatch(updateProduct(update));
    }
  };

  const handleUpdateAddress = () => {
    // console.log(contactNo, address)
    setUpdateContact({
      address,
      contactNo,
    });
  };

  // console.log(updateContact)

  const handleCheckout = async () => {
    if (
      updateContact.address.length == 0 &&
      updateContact.contactNo.length == 0
    ) {
      alert("Please add address and contact number");
      return;
    }
    setContactNo("");
    setAddress("");
    toast.success("Your order is placed successfully");
    dispatch(deleteProduct());
  };

  const handleContinue = () => {
    navigate("/");
  };

  return (
    <Container>
      <ToastContainer autoClose={2000} />
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={handleContinue}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
          </TopTexts>
          <Popup
            trigger={<TopButton>ADD ADDRESS</TopButton>}
            position="left center"
          >
            {(close) => (
              <div>
                <h3>Update Contact number and address</h3>
                <label htmlFor="">Contact No:</label>
                <input
                  type="text"
                  onChange={(e) => setContactNo(e.target.value)}
                  value={contactNo}
                />
                <label htmlFor="">Address:</label>
                <textarea
                  type="text"
                  cols="22"
                  rows="10"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                <button onClick={handleUpdateAddress}>Update</button>
                <button onClick={close}>Close</button>
              </div>
            )}
          </Popup>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <Product key={index}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    {product.size && (
                      <ProductSize>
                        <b>Size:</b>
                        {product.size[0]}
                      </ProductSize>
                    )}
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <RemoveIcon onClick={() => handleRemoveItem(product)} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <AddIcon onClick={() => handleAddItem(product)} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    ₹{product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹{totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated shipping</SummaryItemText>
              <SummaryItemPrice>₹{estimatedShipping}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>
                Discount&nbsp;{" "}
                {totalPrice > 100000 ? <span>20%</span> : <span>10%</span>}
              </SummaryItemText>
              <SummaryItemPrice>₹-{discount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                ₹ {totalPrice + estimatedShipping - discount}
              </SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart;
