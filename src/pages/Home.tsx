import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { CardContainer } from "../components/CardContainer";

const Home = () => {
  const productList = useSelector(
    (state: RootState) => state.productRedu.productList
  );
  return (
    <div className="">
      <CardContainer products={productList} />
    </div>
  );
};

export default Home;
