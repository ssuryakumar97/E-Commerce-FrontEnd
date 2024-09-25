import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { filteredProduct } from "../redux/filteredProductRedux";
import HomeIcon from "@mui/icons-material/Home";

const Container = styled.div`
  min-height: 30px;
  position: sticky;
  top: 0;
  z-index: 4;
  background-color: white;
  ${mobile({
    width: "100%",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    zIndex: 4,
    backgroundColor: "white",
  })}
`;
const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 5px;
  ${mobile({ marginLeft: "10px", width: "125px" })}
`;
const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "80%", textAlign: "left", fontSize: "12px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h3`
  font-weight: bold;
  ${mobile({ marginLeft: "10px", fontSize: "16px" })}
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "flex-end", marginRight: "10px" })}
`;

const MenuItemDiv = styled.div`
  font-size: 14px;

  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "5px", display: "none" })}
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  margin: 0px 10px;
`;

const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const quantity = useSelector((state) => state.cart.quantity);
  const products = useSelector((state) => state.filteredProduct.products);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    // console.log(products);
    const filteredProd = products.filter((val) => {
      if (
        val.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        val.categories.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
    dispatch(filteredProduct(filteredProd));
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Image src="/logoicon.jpg" />
          <Logo>EULER</Logo>
          <SearchContainer>
            <Input type="text" placeholder="Search" onChange={handleChange} />
            <SearchIcon />
          </SearchContainer>
        </Left>
        <Center></Center>
        <Right>
          <LinkItem to="/">
            <HomeIcon />
          </LinkItem>
          <Link to="/cart">
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon color="action" />
            </Badge>
          </Link>
          <MenuItemDiv>Category:</MenuItemDiv>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Categories">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {anchorEl ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <LinkItem to={"/products/mobiles"}>
                <CategoryImage src="/mobiles.png" /> Mobiles
              </LinkItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <LinkItem to={"/products/clothing"}>
                <CategoryImage src="/clothing.png" /> Clothing
              </LinkItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <LinkItem to={"/products/electronics"}>
                <CategoryImage src="/electronicsIcon.png" /> Electronics
              </LinkItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <LinkItem to={"/products/home appliances"}>
                <CategoryImage src="/homeAppliances.png" /> Home Appliances
              </LinkItem>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <LinkItem to={"/products/toys"}>
                <CategoryImage src="/toys.png" /> Toys
              </LinkItem>
            </MenuItem>
          </Menu>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
