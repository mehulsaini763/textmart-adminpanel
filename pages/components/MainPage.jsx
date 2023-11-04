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

  const [products, setProducts] = useState([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    if (!querySnapshot.empty) {
      const temparr = [];
      querySnapshot.forEach((doc) => {
        temparr.push(doc.data());
      });
      setProducts(temparr);
    }
  };

  const handlePageState = (p) => {
    set.setProduct(p);
    set.setMainPageState(false);
    set.setProductPageState(true);
  };

  return (
    <>
      <div className="p-4 text-center text-white text-4xl bg-neutral-950">
        <p>ADMIN PANEL</p>
      </div>
      <button
        className="m-8 px-4 py-2 text-white text-2xl font-bold bg-neutral-950 fixed bottom-0 right-0 rounded-md"
        onClick={() => handlePageState("new")}
      >
        +
      </button>
      <div className="m-8 flex">
        <div className="p-8 w-1/4 border-r border-black"></div>
        <div className="p-8 w-3/4 space-y-4">
          <p className="text-4xl font-bold">Products</p>
          <hr className="border-black" />
          <div className="flex flex-col gap-1">
            {products.length == 0
              ? "No Products Available"
              : products.map((p) => {
                  return (
                    <div
                      className="border p-2"
                      onClick={() => handlePageState(p)}
                    >
                      {p.title}
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
