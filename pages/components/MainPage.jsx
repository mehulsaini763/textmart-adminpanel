import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { StateContext } from "..";

const MainPage = () => {
  const set = useContext(StateContext);

  useEffect(() => {
    getData();
  }, []);

  const [products, setProducts] = useState(null);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    if (!querySnapshot.empty) {
      setProducts(querySnapshot);
    }
  };

  const handleClick = () => {
    set.setProduct("new");
    set.setMainPageState(false);
    set.setProductPageState(true);
  };

  return (
    <>
      <div className="p-4 text-center text-white text-4xl bg-neutral-950">
        <p>ADMIN PANEL</p>
      </div>
      <button
        className="m-8 px-4 py-2 text-white text-2xl font-bold bg-neutral-950 absolute bottom-0 right-0 rounded-md"
        onClick={handleClick}
      >
        +
      </button>
      <div className="m-8 flex">
        <div className="p-8 w-1/4 border-r border-black"></div>
        <div className="p-8 w-3/4 space-y-4">
          <p className="text-4xl font-bold">Products</p>
          <hr className="border-black" />
          <div className="flex flex-col">
            {products == null
              ? "No Products Available"
              : products.map((p) => {
                  return <div>{p.title}</div>;
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
