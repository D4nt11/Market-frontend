import * as React from "react";
import { MultipleSelect } from "react-select-material-ui";
import api from "../../api/api";
import styles from "./MultiSelectDropdown.module.css";
import { data } from "react-router-dom";
import { useEffect } from "react";

const MultiSelectDropdown = () => {

  const API_URL = import.meta.env.VITE_API_URL;
  

  const getProductCategories = async () =>{
    await fetch(`${API_URL}/product-categories`)
    .then(response => response.json())
    .then((values =>{
      values.map((value: any) =>{
        options.push(value.name)
      })
    }))
  }

  useEffect(() => {
    getProductCategories();
  }, [])
  
  const options: string[] = [];

  useEffect(() => {
    const borderBottom = document.querySelectorAll<HTMLElement>(".css-ahl1nl-control");
    if (borderBottom) {
      for (const element of borderBottom) {
        element.style.borderBottomWidth = "0px";
      }
    }
  }, []);

  const handleChange = (values: string[]) => {
    return values;
  };

  return (
    <div className={styles.multiContainer}>
      <MultipleSelect
        label="Выберите категорию(-ии)"
        options={options}
        onChange={handleChange}
        SelectProps={{
          isCreatable: false,
          msgNoOptionsMatchFilter: "Выберите категорию(-ии)",
          msgNoOptionsAvailable: "Выбраны все категории",
        }}
      />
    </div>
  );
};

export default MultiSelectDropdown;
