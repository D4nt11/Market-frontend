import { useEffect, useState } from "react";
import styles from "./MultiSelector.module.css";
import { useController } from "react-hook-form";

const MultiSelector = ({ ...props }: any) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [dropCategories, setDropCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const response = fetch(`${API_URL}/product-categories`);

  // const changeHandleState = () =>{
  //   props.handleState(selectedCategories);
  // }

  const {
    field: { value, onChange },
  } = useController({
    name: props.registerName,
    control: props.control,
    rules: props.rules,
    defaultValue: [],
  });


  const getProductCategories = () => {
    response
      .then((response) => response.json())
      .then((json) => {
        setCategories(json);
      })
      .then(() => {
        let forDropCategories: any = [];
        for (let i: number = 0; i < categories.length; i++) {
          forDropCategories.push(i);
        }
        setDropCategories(forDropCategories);
      });
  };

  useEffect(() => {
    getProductCategories();
  }, [categories.length]);

  useEffect(() => {
    // const delBtn = document.getElementById("delBtn");
    const delSvg = document.getElementById("delSvg");
    if (selectedCategories.length === 0 && delSvg) {
      delSvg.style.display = "none";
    } else {
      if (delSvg) {
        delSvg.style.display = "flex";
      }
    }
    // props.handleState(selectedCategories);
    // onChange(selectedCategories)
  }, [selectedCategories.length]);

  useEffect(() => {
    // console.log("arr: " + dropCategories + "\n lenght: " + dropCategories.length)
  }, [dropCategories]);

  const dropDown = () => {
    const dropDownContainer = document.getElementById("dropDownContainer");
    if (dropDownContainer) {
      if (
        dropDownContainer.style.display === "none" ||
        dropDownContainer.style.display === ""
      ) {
        dropDownContainer.style.display = "flex";
      } else {
        dropDownContainer.style.display = "none";
      }
    }
  };

  const clearSelectedCategories = () => {
    let forDropCategories: any = [];
    for (let i: number = 0; i < categories.length; i++) {
      forDropCategories.push(i);
    }
    setDropCategories(forDropCategories);
    setSelectedCategories([]);
    onChange([]);
  };

  const addCategory = (categoryId: string) => {
    const index = categories.findIndex((el) => el.id === categoryId);
    let addedCategories: any[] = [];
    addedCategories = selectedCategories.toSpliced(
      selectedCategories.length,
      0,
      index
    );
    setSelectedCategories(addedCategories);
    onChange(addedCategories.map((i) => categories[i].id));
    const dropIndex = dropCategories.findIndex((el) => el === index);
    let updateDropCategories: any = [];
    updateDropCategories = dropCategories.toSpliced(dropIndex, 1);
    setDropCategories(updateDropCategories);
  };

  const delCategory = (categoryId: string) => {
    const index = categories.findIndex((el)=> el.id === categoryId);
    let delCategories: any[] = [];
    delCategories = dropCategories.toSpliced(dropCategories.length, 0, index).sort((a: number, b: number) => a-b);
    setDropCategories(delCategories);
    const delIndex = selectedCategories.findIndex((el) => el === index);
    let updateSelectedCategories: any[] = [];
    updateSelectedCategories = selectedCategories.toSpliced(delIndex, 1);
    setSelectedCategories(updateSelectedCategories);
    onChange(updateSelectedCategories.map((i) => categories[i].id));
  };

  return (
    <div className={styles.mainContainer}>
      <label className={styles.label} htmlFor="multiContainer">
        {props.name}
      </label>
      <div className={styles.multiContainer} id="multiContainer">
        <div className={styles.valuesInputContainer}>
          {/* <input className={styles.input} type="text" /> For search if will be need */}
          <div className={styles.valuesContainer}>
            {selectedCategories.map((index) => (
              <div className={styles.valueContainer} key={categories[index].id}>
                <img src={categories[index]?.img} className={styles.valueImg} />
                <div className={styles.valueName}>
                  {categories[index]?.name}
                </div>
                <div
                  className={styles.delValueBtn}
                  onClick={() => {
                    delCategory(categories[index].id);
                  }}
                >
                  <svg
                    height="20"
                    width="20"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    focusable="false"
                    className={styles.delSvg}
                    fill="var(--form-input-color)"
                  >
                    <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.valuesContainer}></div>
        </div>
        <div className={styles.btns}>
          <div
            className={styles.delBtn}
            id="delBtn"
            onClick={clearSelectedCategories}
          >
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className={styles.delSvg}
              id="delSvg"
              fill="red"
            >
              <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
            </svg>
          </div>
          <div className={styles.dropBtn} onClick={dropDown}>
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className={styles.dropSvg}
              fill="var(--form-input-color)"
            >
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.dropDownContainer} id="dropDownContainer">
        <ul className={styles.spisok} {...props.register(props.registerName, props.rules)}>
          {dropCategories.map((index: number) => {
            if (dropCategories.length !== 0) {
              // console.log(dropCategories.length)
              return (
                <li
                  value={categories[index]?.id}
                  key={categories[index]?.id}
                  className={styles.punkt}
                  onClick={() => {
                    addCategory(categories[index]?.id);
                  }}
                >
                  <img
                    src={categories[index]?.img}
                    className={styles.punktImg}
                  />
                  <div className={styles.punktName}>
                    {categories[index]?.name}
                  </div>
                </li>
              );
            } else if(dropCategories.length == 0) {
              // console.log(dropCategories.length)
              return <p className={styles.dropP}>Выбраны все категории</p>; //don't work because can't map this(need ideas)
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelector;
