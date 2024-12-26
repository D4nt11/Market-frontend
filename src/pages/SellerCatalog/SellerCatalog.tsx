import { useEffect, useState } from "react";
import CardCategory from "../../components/Card/CardCategory/CardCategory";
import styles from "./SellerCAtalog.module.css";

const SellerCatalog = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    fetch(`${API_URL}/seller-categories`)
      .then((res) => res.json())
      .then((json) => setCategories(json));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.h1}>Категории продавцов</h1>
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

export default SellerCatalog;
