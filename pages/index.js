import React, { useState, createContext } from "react";
import MainPage from "./components/MainPage";
import ProductPage from "./components/ProductPage";

export const StateContext = createContext();

export default function Home() {
  const [product, setProduct] = useState(null);
  const [mainPageState, setMainPageState] = useState(true);
  const [productPageState, setProductPageState] = useState(false);

  return (
    <main>
      <StateContext.Provider
        value={{
          product,
          setProduct,
          setMainPageState,
          setProductPageState,
        }}
      >
        {mainPageState && <MainPage />}
        {productPageState && <ProductPage />}
      </StateContext.Provider>
    </main>
  );
}
