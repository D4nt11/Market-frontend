import * as React from "react";
import { MultipleSelect } from "react-select-material-ui";
import api from "../../http/axios";

class MultiSelectDropdown extends React.Component {
  render() {
    const [names, setNames] = React.useState<string[]>([]);

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get("/product-categories"); // Замените на ваш URL
          const data = response.data;

          // Проверка, что данные являются массивом
          if (Array.isArray(data)) {
            // Извлечение всех name в виде массива строк
            const extractedNames = data.map((item) => item.name);
            setNames(extractedNames);
          } else {
            console.error("Ожидался массив данных, но получено:", data);
          }
        } catch (error) {
          console.error("Ошибка при загрузке данных:", error);
        }
      };

      fetchData();
    }, []);

    const options: string[] = names;

    return (
      <div className="App">
        <MultipleSelect
          label="Choose some cities"
          options={options}
          helperText="You can add a new city by writing its name and pressing enter"
          onChange={this.handleChange}
          SelectProps={{
            isCreatable: true,
            msgNoOptionsAvailable: "All cities are selected",
            msgNoOptionsMatchFilter: "No city name matches the filter",
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
