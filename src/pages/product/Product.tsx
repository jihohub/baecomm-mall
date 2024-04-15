import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/loading/Loading";
import ProductDetail from "../../components/product/productDetail/ProductDetail";
import useProduct from "../../hooks/useProduct";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: red;
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
`;

const Button = styled.button`
  margin: 20px;
  padding: 10px;
  border: 0px;
  border-radius: 5px;
  background-color: #d0efff;
  &:hover {
    cursor: pointer;
    background-color: #006ee6;
    color: #ffffff;
  }
`;

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, isLoading, error] = useProduct(id);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <Wrapper>
        <ErrorMessage>
          에러가 발생하였습니다.
          <Button onClick={() => navigate("/")}>홈으로 돌아가기</Button>
        </ErrorMessage>
      </Wrapper>
    );
  }

  return <Wrapper>{product && <ProductDetail {...product} />}</Wrapper>;
};

export default Product;
