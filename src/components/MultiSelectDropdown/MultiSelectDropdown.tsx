import * as React from "react";
import { MultipleSelect } from "react-select-material-ui";
import api from "../../http/axios";
import styles from './MultiSelectDropdown.module.css'
import { data } from "react-router-dom";

class MultiSelectDropdown extends React.Component {
  render() {
 
    const options: string[] = ['london', 'moscow'];

    return (
      <div className="App">
        <MultipleSelect
        className={styles.multi}
          label="Выберите категорию(-ии)"
          options={options}
          onChange={this.handleChange}
          SelectProps={{
            isCreatable: true,
          }}
        />
      </div>
    );
  }

  handleChange = (values: string[]) => {
    console.log(values);
  };
}

export default MultiSelectDropdown;
