import { useEffect, useState } from "react";
import CardProduct from "../../components/Card/CardProduct/CardProduct";
import styles from "./Home.module.css";

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    fetch(`${API_URL}/products`)
    .then((res) => res.json())
    .then((json) => setProducts(json));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.homeContainer}>
      {products.map((product: any) => (
        <CardProduct
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
};

export default Home;
