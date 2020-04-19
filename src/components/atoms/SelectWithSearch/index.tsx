import { Select } from "antd";
import React from "react";

const { Option } = Select;

type Item = {
  id: string;
  displayName: string;
};

type Props = {
  placeholder: string;
  itemList: Item[];
  style: any;
};

const SelectWithSearch: React.FC<Props> = ({ placeholder, itemList, style }) => (
  <Select
    showSearch
    style={style}
    size="large"
    placeholder={placeholder}
    optionFilterProp="children"
    filterOption={(input, option) =>
      option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    {itemList.map((item, i) => (
      <Option key={i} value={item.id}>
        {item.displayName}
      </Option>
    ))}
  </Select>
);

export default SelectWithSearch;
