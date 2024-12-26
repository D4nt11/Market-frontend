import { useEffect, useState } from "react";
import CardCategory from "../../components/Card/CardCategory/CardCategory";
import styles from "./ProductsCatalog.module.css";

const ProductsCatalog = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    fetch(`${API_URL}/product-categories`)
      .then((res) => res.json())
      .then((json) => setCategories(json));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.h1}>Категории товаров</h1>
      <div className={styles.container}>{
        categories.map((categories: any) => (
            <CardCategory 
            key={categories.id}
            {...categories}
            />
        ))
        }</div>
    </div>
  );
};

export default ProductsCatalog;
