import React, { useState, useContext } from "react";
import styles from "@/styles/productpage.module.css";
import { StateContext } from "..";
import { v4 } from "uuid";
import { db } from "../firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

const ProductPage = () => {
  const get = useContext(StateContext);
  const set = useContext(StateContext);

  const handlePageState = () => {
    set.setMainPageState(true);
    set.setProductPageState(false);
  };

  const [product, setProduct] = useState(() => {
    if (get.product == "new") {
      return {
        id: v4(),
        title: "",
        category: [],
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

  const categories = [
    ["smartphones", "phone", "mobile", "smartphones", "phones", "mobiles"],
    ["television", "tv", "smart tv", "android tv"],
    ["laptop", "laptops", "pc", "desktop"],
    [
      "headphones & earphones",
      "headphones",
      "earphones",
      "headphone",
      "earphone",
      "on-ear",
      "earpods",
    ],
    [
      "refridgerator",
      "refridgerators",
      "fridge",
      "fridges",
      "single door",
      "double door",
    ],
    [
      "home theaters & soundbars",
      "home theaters",
      "soundbar",
      "speakers",
      "dolby",
      "surround",
    ],
    ["air conditioners", "ac", "cooler", "A/C"],
    ["tablets", "tab", "tablet", "ipad", "pad", "tabs"],
    ["camera", "cameras", "cam", "cams", "webcam", "webcams"],
    ["washing machine","washing machines","washing", "wash","wahes","machine"]
    ,["wearables","watch","watches","smart watch","smart watches","smartwatch","smartwatches"]
  ];

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

  const saveChanges = async () => {
    await setDoc(doc(db, "products", product.id), { ...product });
    handlePageState();
  };

  const deteleProduct = async () => {
    await deleteDoc(doc(db, "products", product.id));
    handlePageState();
  };

  const createDuplicate = () => {
    setProduct({ ...product, id: v4() });
  };

  return (
    <div className={styles.productPage}>
      <div className="flex justify-between text-white text-2xl bg-neutral-950 items-center">
        <div className="flex gap-4 items-center">
          <button
            className="bg-neutral-100 text-black p-4"
            onClick={handlePageState}
          >
            MAIN
          </button>
          <p>MANAGE PRODUCT</p>
        </div>
        <div className="flex gap-4 px-4">
          <button
            className="border border-white p-2 text-lg"
            onClick={createDuplicate}
          >
            Duplicate
          </button>
          <button
            className="bg-neutral-100 text-black p-2 text-lg"
            onClick={saveChanges}
          >
            Save Changes
          </button>
          {get.product != "new" && (
            <button
              className="border border-red-400 text-red-400 p-2 text-lg"
              onClick={deteleProduct}
            >
              Delete Product
            </button>
          )}
        </div>
      </div>

      <div className="flex p-8 gap-8">
        <div className="w-1/2 space-y-8">
          <div>
            {/* BASICS */}
            <h3>BASIC</h3>
            <table className="table-auto border-y border-black text-left w-full">
              <tbody>
                <tr>
                  <td>title</td>
                  <td colSpan={2}>
                    <input
                      type="text"
                      value={product.title}
                      onChange={(e) => {
                        setProduct({ ...product, title: e.target.value });
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>category </td>
                  <td colSpan={2}>
                    <select
                      value={product.category}
                      onChange={(e) => {
                        setProduct({
                          ...product,
                          category: categories[e.target.value],
                        });
                      }}
                    >
                      <option>{product.category[0]}</option>
                      <option value={0}>smartphones</option>
                      <option value={1}>television</option>
                      <option value={2}>laptops</option>
                      <option value={3}>headphones & earphones</option>
                      <option value={4}>refrigerator</option>
                      <option value={5}>home theaters & soundbars</option>
                      <option value={6}>air conditioners</option>
                      <option value={7}>tablets</option>
                      <option value={8}>cameras</option>
                      <option value={9}>washing machines</option>
                      <option value={10}>wearables</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>price </td>
                  <td colSpan={2}>
                    <input
                      type="number"
                      value={product.price}
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
                      value={product.rating}
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
                      value={product.discount}
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
                      value={product.thumbnail}
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
                      // value={product.images}
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
            {/* SPECIFICATION */}
            <h3>SPECFICATION</h3>
            <div className="border-y border-black">
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
                        className="border px-2 bg-red-400 font-bold"
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
                        X
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
            <h3>SPECFICATION</h3>
            <div className="border-y border-black flex">
              <textarea
                placeholder="WRITE HERE (string)"
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    setProduct({
                      ...product,
                      specifications: JSON.parse(e.target.value),
                    });
                  }
                }}
              ></textarea>
            </div>
          </div>

          {specKey != "" && (
            <div>
              <div className="font-bold">{`SPECIFICATION > ${specKey}`}</div>
              <div className="border-y border-black">
                {product.specifications[specKey].map((o, i) => {
                  return (
                    <div className="flex">
                      <p className="w-1/2">{o.title}</p>
                      <div className="w-1/2 flex justify-between">
                        <p>{o.data}</p>
                        <button
                          className="border px-2 bg-red-400 font-bold"
                          onClick={() => {
                            product.specifications[specKey].splice(i, 1);
                            setProduct({
                              ...product,
                              specifications: product.specifications,
                            });
                          }}
                        >
                          X
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
          <div>
            {/* KEY FEATURES */}
            <h3>KEY FEATURES</h3>
            <div className="border-y border-black flex">
              <textarea
                // value={product.keyfeatures}
                placeholder="WRITE HERE (list)"
                onChange={(e) => {
                  setProduct({
                    ...product,
                    keyfeatures: e.target.value.split("\n"),
                  });
                }}
              ></textarea>
            </div>
          </div>

          <div>
            <h3>OVERVIEW</h3>
            <div className="border-y border-black flex">
              <textarea
                value={product.overview}
                placeholder="WRITE HERE (string)"
                onChange={(e) => {
                  setProduct({
                    ...product,
                    overview: e.target.value,
                  });
                }}
              ></textarea>
            </div>
          </div>

          <div>
            <h3>PRODUCT SHOWCASE</h3>
            <div className="border-y border-black flex">
              <textarea
                placeholder="WRITE HERE (url)"
                onChange={(e) => {
                  setProduct({
                    ...product,
                    productshowcase: e.target.value.split("\n"),
                  });
                }}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="w-1/2 space-y-8 overflow-y-scroll h-screen right-0">
          <div>
            <h3>PRODUCT</h3>
            <div className="border-y border-black font-mono overflow-x-hidden">
              <pre>
                <code>{JSON.stringify(product, null, 2)}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
