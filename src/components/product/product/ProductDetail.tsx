// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProductSpecific } from "../../../type";
import priceFormatter from "../../../utils/priceFormatter";

const ProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 40vw;
  height: 40vw;
  max-width: 800px;
  max-height: 800px;
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

const ProductText = styled.p`
  font-size: 20px;
`;

const Button = styled.button`
  margin: 20px;
  padding: 10px;
  border: 0px;
  border-radius: 5px;
  background-color: #d0efff;
  &:hover {
    background-color: #006ee6;
    color: #ffffff;
  }
`;

const ProductDetail = ({
  id,
  title,
  description,
  price,
  brand,
  thumbnail,
  images,
}: ProductSpecific) => {
  const navigate = useNavigate();
  return (
    <ProductDiv>
      <Button onClick={() => navigate("/")}>목록으로 돌아가기</Button>
      <ProductImageDiv>
        <ProductImage src={thumbnail} alt={`${title} thumbnail`}></ProductImage>
      </ProductImageDiv>
      <ProductText>{`${brand}`}</ProductText>
      <ProductText>{`${title}`}</ProductText>
      <ProductText>{`${priceFormatter(price)}`}</ProductText>
      <ProductText>{description}</ProductText>
      {images.map((image, index) => (
        <ProductImage
          key={`image ${index}`}
          src={image}
          alt={`image ${index}`}
        />
      ))}
    </ProductDiv>
  );
};

export default ProductDetail;
