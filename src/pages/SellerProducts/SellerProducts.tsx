import { useForm } from "react-hook-form";
import CardProduct from "../../components/Card/CardProduct/CardProduct";
import BasicInput from "../../components/FormInput/BasicInput/BasicInput";
import styles from "./SellerProducts.module.css";
import { Rate } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";
import MultiSelector from "../../components/FormInput/MultiSelector/MultiSelector";
import { useNavigate, useParams } from "react-router-dom";
import { useSellerStore } from "../../store/useSellerStore";
import api from "../../api/api";
import { useEffect, useState } from "react";

interface sellerData {
  id: string;
  shopName: string;
  surname: string;
  name: string;
  patronymic: string;
  INN: string;
  phone: string;
  email: string;
  password: string;
  logo: string | null;
  sellerCategory: [];
  products: [];
}

const SellerProducts = () => {
  const navigate = useNavigate();
  const { sellerId } = useParams();
  const [sellerData, setSellerData] = useState<sellerData | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);

  const schema = yup.object().shape({
    name: yup.string().required("Введите название товара"),
    description: yup.string().required("Введите описание товара"),
    price: yup
      .number()
      .typeError("Цена должна быть числом")
      .positive("Цена должна быть положительным числом")
      .required("Введите цену товара"),
    img: yup
      .string()
      .url("Введите корректный URL")
      .required("Введите ссылку на изображение"),
    productCategoryId: yup
      .array()
      .of(yup.string().required("Некорректная категория"))
      .min(1, "Выберите хотя бы одну категорию")
      .required("Выберите категории"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    // useSellerStore.getState().checkAuth();

    const fetchSellerData = async () => {
      const response = await api.get(`/sellers/${sellerId}`);
      setSellerData(response.data);
    };
    if (sellerId) {
      fetchSellerData();
    }
  }, [sellerId]);

  const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const createProduct = async (data: any) => {
    await useSellerStore.getState().checkAuth();
    if (useSellerStore.getState().isSellerAuth) {
      data = {
        ...data,
        sellerId: useSellerStore.getState().sellerId,
      };
      console.log(data);
      await api.post('/products', data)
      alert("succes");
      toBackFromAddMenu();
    } else {
      alert("need auth");
    }
  };

  const toAddProduct = () => {
    const addProductBtn = document.getElementById("addMenuContainer");
    if (addProductBtn) {
      addProductBtn.style.display = "flex";
    }
  };

  const toBack = () => {
    navigate(`/seller/profile`);
  };

  const toBackFromAddMenu = () => {
    const addProductBtn = document.getElementById("addMenuContainer");
    if (addProductBtn) {
      addProductBtn.style.display = "none";
    }
  };

  return (
    <div className={styles.SellerProductsContainer}>
      <section className={styles.leftSection}>
        <div className={styles.buttons}>
          <button className={styles.buttonsButton} onClick={toBack}>
            <img
              className={styles.buttonsButtonImage}
              src="../../../../public/icons/back.svg"
              alt=""
            />
          </button>
        </div>
        <div className={styles.profileImage}>
          <img
            className={styles.img}
            src="../../../public/icons/profile.svg"
            alt=""
          />
        </div>
        <h1>{sellerData?.shopName}</h1>
        <Rate
          value={2.5}
          disabled={true}
          allowHalf
          character="★"
          style={{ scale: "1.5" }}
        />
        <div className={styles.contacts}>
          <h3>Контактные данные</h3>
          <p className={styles.email}>{sellerData?.email}</p>
          <p className={styles.phone}>{sellerData?.phone}</p>
        </div>
      </section>

      <section className={styles.rightSection}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.sellerInput}
            placeholder="Искать у продавца"
          />
          <img
            className={styles.searchImg}
            src="../../../public/icons/search.svg"
            alt=""
          />
        </div>
        <div className={styles.sellerCatalog}>
          <div className={styles.addContainer} onClick={toAddProduct}>
            <div className={styles.vector}>
              <img src="../../../public/icons/vector.svg" alt="" />
            </div>
          </div>
          {products.map((product: any) => (
            <CardProduct key={product.id} {...product} />
          ))}
        </div>
      </section>

      <section className={styles.addMenuContainer} id="addMenuContainer">
        <div className={styles.buttonsAddMenu}>
          <button className={styles.buttonsButton} onClick={toBackFromAddMenu}>
            <img
              className={styles.buttonsButtonImage}
              src="../../../../public/icons/back.svg"
              alt=""
            />
          </button>
        </div>
        {/* <div className={styles.addMenuBtn}>
        </div> */}
        <div className={styles.addMenu}>
          <form onSubmit={handleSubmit(createProduct)} className={styles.main}>
            <BasicInput
              name="Название товара"
              type="text"
              register={register}
              registerName="name"
              rules={{ required: true }}
            />
            <p className={styles.p}>{errors.name?.message}</p>
            <BasicInput
              name="Описание"
              type="text"
              register={register}
              registerName="description"
              rules={{ required: true }}
            />
            <p className={styles.p}>{errors.description?.message}</p>
            <BasicInput
              name="Цена"
              type="text"
              register={register}
              registerName="price"
              rules={{ required: true }}
            />
            <p className={styles.p}>{errors.price?.message}</p>
            <BasicInput
              name="Изображение"
              type="text"
              register={register}
              registerName="img"
              rules={{ required: true }}
            />
            <p className={styles.p}>{errors.img?.message}</p>

            {/* <div className={styles.multiContainer}>
              <MultiSelectDropdown />
            </div> */}
            <MultiSelector
              name="Категория(-ии)"
              register={register}
              control={control}
              registerName="productCategoryId"
              rules={{ required: true }}
            />
            <p className={styles.p}>{errors.productCategoryId?.message}</p>
            <input
              type="submit"
              value="Добавить товар"
              style={{
                opacity: isValid ? 1 : 0.5,
                backgroundColor: "var(--accent-color)",
              }}
              className={styles.button1}
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default SellerProducts;

// import { useForm } from "react-hook-form";
// import CardProduct from "../../components/Card/CardProduct/CardProduct";
// import BasicInput from "../../components/FormInput/BasicInput/BasicInput";
// import styles from "./SellerProducts.module.css";
// import { Rate } from "antd";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";
// import MultiSelector from "../../components/FormInput/MultiSelector/MultiSelector";
// import { useCallback, useState } from "react";

// const SellerProducts = () => {
//   const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

//   const handleState = (data: any) => {
//     setSelectedCategories(data);
//   };

//   const schema = yup
//     .object()
//     .shape({
//       name: yup.string().required("Введите название товара"),
//       description: yup.string().required("Введите описание товара"),
//       price: yup.number().required("Введите цену товара"),
//       img: yup.string().required("Введите ссылку на изображение"),
//       productCategoryId: yup.array().required("Выберите категории"),
//     })
//     .required();

//   const useValidationResolver =  (validationSchema: any) =>
//     useCallback(
//       async (data: any) => {
//         try {
//           const values = await validationSchema.validate(data, {
//             abortEarly: false,
//             context: { productCategoryId: selectedCategories },
//           });

//           return {
//             values,
//             errors: {},
//           };
//         } catch (errors) {
//           return {
//             values: {},
//             errors: errors?.inner.reduce(
//               (allErrors: any, currentError: any) => ({
//                 ...allErrors,
//                 [currentError.path]: {
//                   type: currentError.type ?? "validation",
//                   message: currentError.message,
//                 },
//               }),
//               {}
//             ),
//           };
//         }
//       },
//       [validationSchema]
//     );

//   // const useValidationResolver = (validationSchema: any) => {
//   //   async (data: any) => {
//   //     const values = await validationSchema.validate(data, {
//   //       context: { productCategoryId: selectedCategories },
//   //     });
//   //     return {
//   //       values,
//   //       errors: {},
//   //     };
//   //   };
//   // };

//   // const resolver = schema.validate(data, {})
//   const resolver = useValidationResolver(schema);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//     // } = useForm({ resolver: yupResolver(schema) });
//   } = useForm({ resolver: resolver});

//   const createProduct = (data: any) => {
//     console.log(data);
//   };

//   const toAddProduct = () => {
//     const addProductBtn = document.getElementById("addMenuContainer");
//     if (addProductBtn) {
//       addProductBtn.style.display = "flex";
//     }
//   };

//   const toBack = () => {
//     console.log("awda");
//   };

//   const toBackFromAddMenu = () => {
//     const addProductBtn = document.getElementById("addMenuContainer");
//     if (addProductBtn) {
//       addProductBtn.style.display = "none";
//     }
//   };

//   return (
//     <div className={styles.SellerProductsContainer}>
//       <section className={styles.leftSection}>
//         <div className={styles.buttons}>
//           <button className={styles.buttonsButton} onClick={toBack}>
//             <img
//               className={styles.buttonsButtonImage}
//               src="../../../../public/icons/back.svg"
//               alt=""
//             />
//           </button>
//         </div>
//         <div className={styles.profileImage}>
//           <img
//             className={styles.img}
//             src="../../../public/icons/profile.svg"
//             alt=""
//           />
//         </div>
//         <h1>SellerName</h1>
//         <Rate
//           value={2.5}
//           disabled={true}
//           allowHalf
//           character="★"
//           style={{ scale: "1.5" }}
//         />
//         <div className={styles.contacts}>
//           <h3>Контактные данные</h3>
//           <p className={styles.email}>{"emai"}</p>
//           <p className={styles.phone}>{"+7 (921) 562-66-73"}</p>
//         </div>
//       </section>

//       <section className={styles.rightSection}>
//         <div className={styles.inputContainer}>
//           <input
//             type="text"
//             className={styles.sellerInput}
//             placeholder="Искать у продавца"
//           />
//           <img
//             className={styles.searchImg}
//             src="../../../public/icons/search.svg"
//             alt=""
//           />
//         </div>
//         <div className={styles.sellerCatalog}>
//           <div className={styles.addContainer} onClick={toAddProduct}>
//             <div className={styles.vector}>
//               <img src="../../../public/icons/vector.svg" alt="" />
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className={styles.addMenuContainer} id="addMenuContainer">
//         <div className={styles.buttonsAddMenu}>
//           <button className={styles.buttonsButton} onClick={toBackFromAddMenu}>
//             <img
//               className={styles.buttonsButtonImage}
//               src="../../../../public/icons/back.svg"
//               alt=""
//             />
//           </button>
//         </div>
//         {/* <div className={styles.addMenuBtn}>
//         </div> */}
//         <div className={styles.addMenu}>
//           <form onSubmit={handleSubmit(createProduct)} className={styles.main}>
//             <BasicInput
//               name="Название товара"
//               type="text"
//               register={register}
//               registerName="name"
//               rules={{ required: true }}
//             />
//             <p className={styles.p}>{errors.name?.message}</p>
//             <BasicInput
//               name="Описание"
//               type="text"
//               register={register}
//               registerName="description"
//               rules={{ required: true }}
//             />
//             <p className={styles.p}>{errors.description?.message}</p>
//             <BasicInput
//               name="Цена"
//               type="text"
//               register={register}
//               registerName="price"
//               rules={{ required: true }}
//             />
//             <p className={styles.p}>{errors.price?.message}</p>
//             <BasicInput
//               name="Изображение"
//               type="text"
//               register={register}
//               registerName="img"
//               rules={{ required: true }}
//             />
//             <p className={styles.p}>{errors.img?.message}</p>

//             {/* <div className={styles.multiContainer}>
//               <MultiSelectDropdown />
//             </div> */}
//             <MultiSelector
//               handleState={handleState}
//               name="Категория(-ии)"
//               register={register}
//               registerName="productCategoryId"
//               rules={{ required: true }}
//             />
//             <p className={styles.p}>{errors.productCategoryId?.message}</p>
//             <input
//               type="submit"
//               value="Добавить товар"
//               style={{
//                 opacity: isValid ? 1 : 0.5,
//                 backgroundColor: "var(--accent-color)",
//               }}
//               className={styles.button1}
//             />
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SellerProducts;
