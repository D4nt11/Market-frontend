import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import styles from './PhoneInput.module.css'

interface PhoneInputProps {
    name: string
    register: any,
    registerName: string,
    rules: any,
}

const PhoneInput: React.FC<PhoneInputProps> = ({name, register, registerName, rules}) => {
  const [phone, setPhone] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };


  // const placeholderValue = phone || "+7 (xxx) xxx-xx-xx"

  return (

    <div className={styles.PhoneInput}>
    <label htmlFor="basicInput">{name}</label>
    <InputMask
      mask="+7 (999) 999-99-99"
      value={phone}
      onChange={handleChange}
      maskChar="x"
      // placeholder={placeholderValue}
      alwaysShowMask={true}
    >
      {(inputProps: any) => <input {...inputProps} {...register(registerName, rules)} type="text"/>}
    </InputMask>
    </div>
  );
};

export default PhoneInput;
