import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/loading/Loading";
import ProductItem from "../../components/product/productItem/ProductItem";
import SearchBar from "../../components/serachBar/SearchBar";
import useProducts from "../../hooks/useProducts";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const ProductsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  row-gap: 20px;
  margin: 0 100px;
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
    background-color: #006ee6;
    color: #ffffff;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [products, hasMore, isLoading, error, fetchMoreProducts, updateQuery] =
    useProducts();

  const handleSearch = (query: string) => {
    updateQuery(query);
  };

  if (error) {
    return (
      <Wrapper>
        <ErrorMessage>
          에러가 발생하였습니다
          <button onClick={() => navigate("/")}>홈으로 돌아가기</button>
        </ErrorMessage>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <SearchBar onSearch={handleSearch} />
      <ProductsDiv>
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </ProductsDiv>
      {hasMore && <Button onClick={fetchMoreProducts}>더 보기</Button>}
      {isLoading && <Loading />}
    </Wrapper>
  );
};

export default Home;
