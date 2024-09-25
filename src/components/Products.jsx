import styled from "styled-components";
import Product from "./Product";
import { mobile } from "../responsive";
import { useState } from "react";
import { useEffect } from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { filteredProduct, initialProduct } from "../redux/filteredProductRedux";

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px 0px",
    padding: "0px",
  })}
`;

function Products({ cat, filters, sort }) {
  const [products, setProducts] = useState([]);
  const filteredProd = useSelector(
    (state) => state.filteredProduct.filteredProducts
  );
  const filterStatus = useSelector(
    (state) => state.filteredProduct.filterStatus
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat ? `/products?category=${cat}` : "/products"
        );
        setProducts(res.data);
        dispatch(initialProduct(res.data));
        // console.log(cat)
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (sort === "newest") {
      const sorted = [...products].sort((a, b) => {
        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
      });
      dispatch(filteredProduct(sorted));
    } else if (sort === "asc") {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      dispatch(filteredProduct(sorted));
    } else {
      const sorted = [...products].sort((a, b) => b.price - a.price);
      dispatch(filteredProduct(sorted));
    }
  }, [sort]);

  return (
    <Container>
      {filterStatus
        ? filteredProd.map((item) => <Product item={item} key={item._id} />)
        : products.map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
}

export default Products;
