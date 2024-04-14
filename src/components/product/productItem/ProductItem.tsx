import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProductSimple } from "../../../type";
import priceFormatter from "../../../utils/priceFormatter";

const ProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vw;
  height: 40vw;
  max-width: 400px;
  max-height: 400px;
  border: 1px solid #000000;
  &:hover {
    cursor: pointer;
  }
`;

const ProductImageDiv = styled.div`
  width: 100%;
  height: 60%;
`;

const ProductImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ProductTextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
`;

const ProductTextTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: #000000;
  ${ProductDiv}:hover & {
    background-color: #006ee6;
    color: #ffffff;
  }
`;

const ProductText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: #000000;
`;

const ProductItem = ({ id, title, price, brand, thumbnail }: ProductSimple) => {
  const navigate = useNavigate();
  return (
    <ProductDiv onClick={() => navigate(`product/${id}`)}>
      <ProductImageDiv>
        <ProductImage src={thumbnail} alt={`${title} thumbnail`}></ProductImage>
      </ProductImageDiv>
      <ProductTextDiv>
        <ProductTextTitle>{`${brand} ${title}`}</ProductTextTitle>
      </ProductTextDiv>
      <ProductTextDiv>
        <ProductText>{priceFormatter(price)}</ProductText>
      </ProductTextDiv>
    </ProductDiv>
  );
};

export default ProductItem;
