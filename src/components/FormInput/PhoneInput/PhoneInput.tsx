import MaskedInput from "react-text-mask";
import styles from './PhoneInput.module.css'

const PhoneInput = ({field, name }: any) => {
  return (
    <div className={styles.PhoneInput}>
      <label htmlFor="phoneInput">{name}</label>
      <MaskedInput
        id="phoneInput"
        {...field}
        mask={[
          "+",
          "7",
          " ",
          "(",
          /\d/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
        ]}
        placeholder="+7 (xxx) xxx-xx-xx"
        onChange={(e) => field.onChange(e.target.value)}
      />
      <a href="#" className={styles.passwordControl}></a>
    </div>
  );
};

export default PhoneInput;
