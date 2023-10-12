import React, { useState, useContext } from "react";
import styles from "@/styles/productpage.module.css";
import { StateContext } from "..";
import { v4 } from "uuid";

const ProductPage = () => {
  const get = useContext(StateContext);
  const [product, setProduct] = useState(() => {
    if (get.product == "new") {
      return {
        id: v4(),
        title: "",
        category: "",
        altcategory: [],
        price: "",
        discount: "",
        rating: "",
        thumbnail: "",
        images: [],
        keyfeatures: [],
        specifications: {},
        overview: "",
        productshowcase: [],
        quantity: 1,
      };
    } else return get.product;
  });

  const [specKey, setSpecKey] = useState("");
  const [specData, setSpecData] = useState({
    title: "",
    data: "",
  });
  const handleSpecs = (e) => {
    if (e.key == "Enter" && specData.title != "" && specData.data != "") {
      const updatedSpecs = product.specifications;
      updatedSpecs[specKey].push(specData);
      setProduct({ ...product, specifications: updatedSpecs });
    }
  };
  return (
    <div className={styles.productPage}>
      <div className="p-4 text-center text-white text-4xl bg-neutral-950">
        <p>MANAGE PRODUCT</p>
      </div>
      <div className="flex p-8 gap-8">
        <div className="w-1/2">
          <div className="flex flex-col gap-8">
            <div>
              {/* BASICS */}
              <p className="font-bold">BASIC</p>
              <table className="table-fixed border-y border-black text-left w-full">
                <thead>
                  <th>key</th>
                  <th>value</th>
                </thead>
                <tbody>
                  <tr>
                    <td>title</td>
                    <td colSpan={2}>
                      <input
                        type="text"
                        onChange={(e) => {
                          setProduct({ ...product, title: e.target.value });
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>category </td>
                    <td colSpan={2}>
                      <select>
                        <option value="none">None</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>price </td>
                    <td colSpan={2}>
                      <input
                        type="number"
                        onChange={(e) => {
                          setProduct({ ...product, price: e.target.value });
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>rating </td>
                    <td colSpan={2}>
                      <input
                        type="number"
                        onChange={(e) => {
                          setProduct({ ...product, rating: e.target.value });
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>discount </td>
                    <td colSpan={2}>
                      <input
                        type="number"
                        onChange={(e) => {
                          setProduct({ ...product, discount: e.target.value });
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>thumbnail </td>
                    <td colSpan={2}>
                      <input
                        type="text"
                        onChange={(e) => {
                          setProduct({ ...product, thumbnail: e.target.value });
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>images </td>
                    <td colSpan={2}>
                      <textarea
                        onChange={(e) => {
                          setProduct({
                            ...product,
                            images: e.target.value.split("\n"),
                          });
                        }}
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              {/* KEY FEATURES */}
              <h3>KEY FEATURES</h3>
              <div className="border-y border-black flex">
                <div className="w-1/3">
                  <h3>key</h3>
                  <p>keyfeatures:</p>
                </div>
                <div className="w-2/3">
                  <h3>value</h3>
                  <textarea
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        keyfeatures: e.target.value.split("\n"),
                      });
                    }}
                  ></textarea>
                </div>
              </div>
            </div>

            <div>
              {/* SPECIFICATION */}
              <h3>SPECFICATION</h3>
              <div className="border-y border-black">
                <h3>title</h3>
                {Object.keys(product.specifications).map((key) => {
                  return (
                    <>
                      <div className="flex p-2 border">
                        <div
                          className="w-full"
                          onClick={() => {
                            setSpecKey(key);
                          }}
                        >
                          {key}
                        </div>
                        <button
                          onClick={() => {
                            const updatedSpecs = Object.assign(
                              {},
                              product.specifications
                            );
                            delete updatedSpecs[key];
                            setProduct({
                              ...product,
                              specifications: updatedSpecs,
                            });
                            setSpecKey("");
                          }}
                        >
                          D
                        </button>
                      </div>
                      {}
                    </>
                  );
                })}
                <input
                  type="text"
                  placeholder="WRITE TITLE AND PRESS ENTER TO ADD ITEM"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      const updatedSpecs = Object.assign(
                        {},
                        product.specifications,
                        { [e.target.value]: [] }
                      );
                      setProduct({
                        ...product,
                        specifications: updatedSpecs,
                      });
                      e.target.value = null;
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <p className="font-bold">OVERVIEW</p>
              <div className="border-y border-black flex">
                <p className="w-1/3 font-bold">string</p>
                <div className="w-2/3">
                  <textarea className="border w-full p-2"></textarea>
                </div>
              </div>
            </div>

            <div>
              <p className="font-bold">PRODUCT SHOWCASE</p>
              <div className="border-y border-black flex">
                <p className="w-1/3 font-bold">url</p>
                <div className="w-2/3">
                  <textarea className="border w-full p-2"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 space-y-8">
          <div>
            <div className="font-bold">PRODUCT</div>
            <div className="border-y border-black font-mono">
              <pre>
                <code>{JSON.stringify(product, null, 2)}</code>
              </pre>
            </div>
          </div>
          {specKey != "" && (
            <div>
              <div className="font-bold">{`SPECIFICATION > ${specKey}`}</div>
              <div className="border-y border-black">
                <div className="flex">
                  <p className="w-1/2 font-bold">key</p>
                  <p className="w-1/2 font-bold">value</p>
                </div>
                {product.specifications[specKey].map((o, i) => {
                  return (
                    <div className="flex">
                      <p className="w-1/2">{o.title}</p>
                      <div className="w-1/2 flex justify-between">
                        <p>{o.data}</p>
                        <button
                          onClick={() => {
                            product.specifications[specKey].splice(i, 1);
                            setProduct({
                              ...product,
                              specifications: product.specifications,
                            });
                          }}
                        >
                          D
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="flex">
                  <input
                    placeholder="TITLE"
                    onChange={(e) => {
                      setSpecData({ ...specData, title: e.target.value });
                    }}
                    onKeyDown={(e) => {
                      handleSpecs(e);
                    }}
                  />
                  <input
                    placeholder="DATA"
                    onChange={(e) => {
                      setSpecData({ ...specData, data: e.target.value });
                    }}
                    onKeyDown={(e) => {
                      handleSpecs(e);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
