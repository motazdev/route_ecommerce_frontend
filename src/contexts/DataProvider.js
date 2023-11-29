import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios.js";
import { Loading } from "../pages/Loading.jsx";

const DataContext = createContext(null);
const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcateogires] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchProducts = async (query) => {
    const response = await axios.get(
      `https://route-ecommerce-lemon.vercel.app/product?search=${query}`
    );

    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoriesResponse = await axios.get("/category");
      const productsResponse = await axios
        .get("/product")
        .catch((err) => console.log(err));

      const subcategoryResponse = await axios.get("/subcategory");
      const brandResponse = await axios.get("/brand");

      setCategories(categoriesResponse.data.categories);

      setProducts(productsResponse.data.products);

      setSubcateogires(subcategoryResponse.data.subcateogires);

      setBrands(brandResponse.data.brands);

      setLoading(
        productsResponse.data &&
          categoriesResponse.data &&
          subcategoryResponse.data &&
          brandResponse.data
          ? false
          : true
      );
    };
    fetchData();
  }, []);
  return (
    <DataContext.Provider
      value={{
        categories,
        products,
        subcategories,
        brands,
        setProducts,
        searchProducts,
      }}
    >
      <>{loading ? <Loading /> : children}</>
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("CategoriesContext is not defined");
  }

  return context;
};

export { DataProvider, useData };
