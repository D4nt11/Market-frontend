import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import styles from './PhoneInput.module.css'

interface PhoneInputProps {
    name: string
}

const PhoneInput: React.FC<PhoneInputProps> = ({name}) => {
  const [phone, setPhone] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  return (

    <div className={styles.PhoneInput}>
    <label htmlFor="basicInput">{name}</label>
    <InputMask
      mask="+7 (999) 999-99-99"
      value={phone}
      onChange={handleChange}
      maskChar="x"
      alwaysShowMask={true}
    >
      {(inputProps: any) => <input {...inputProps} type="text"/>}
    </InputMask>
    </div>
  );
};

export default PhoneInput;




// import React, { useState } from "react";
// import InputMask from "react-input-mask";
// import styles from "./PhoneInput.module.css";

// interface PhoneInputProps {
//   name: string;
//   register: any;
//   registerName: string;
//   rules: any;
// }

// const PhoneInput: React.FC<PhoneInputProps> = ({
//   name,
//   register,
//   registerName,
//   rules,
// }) => {
//   const [phone, setPhone] = useState("");

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPhone(event.target.value);
//   };

//   // const placeholderValue = phone || "+7 (xxx) xxx-xx-xx";

//   console.log(phone)
//   return (
//     <div className={styles.PhoneInput}>
//       <label htmlFor="phoneInput">{name}</label>
//       <InputMask
//         mask="+7 (999) 999-99-99"
//         alwaysShowMask={true}
//         value={phone}
//         // placeholder={placeholderValue}
//         onChange={(e) => {
//           handleChange(e); // Обновляем локальное состояние
//           register(registerName, rules).onChange(e); // Вызываем обработчик react-hook-form
//         }}
//         onBlur={(e) => {
//           register(registerName, rules).onBlur(e); // Вызываем обработчик react-hook-form
//         }}
//         maskChar="x"
//       >
//         {(inputProps: any) => <input {...inputProps} type="text" id="phoneInput"/>}
//       </InputMask>
//     </div>
//   );
// };

// export default PhoneInput;
