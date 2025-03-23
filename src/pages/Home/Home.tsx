import { useEffect, useState } from "react";
import CardProduct from "../../components/Card/CardProduct/CardProduct";
import styles from "./Home.module.css";

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/products`);
      // if (!response.ok) {
      //   throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      // }
      const data = await response.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className={styles.homeContainer}>
  //       <h1>Загрузка...</h1>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className={styles.homeContainer}>
  //       <h1>Ошибка: {error}</h1>
  //     </div>
  //   );
  // }

  // if (products.length === 0) {
  //   return (
  //     <div className={styles.homeContainer}>
  //       <h1>Товары не найдены</h1>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        {products.map((product: any) => (
          <>
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
            <CardProduct key={product.id} {...product} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
