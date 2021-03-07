import { Select } from 'antd';
import { useState } from 'react';
import './styles.css';
export default function EditableTagGroup() {
  const [categories, setCategories] = useState<string[]>(["Pizza", "Fish", "Smoothies", "Pasta", "Dessert"])
  const { Option } = Select;

  const children: any = [];
  categories.forEach(category => {
    children.push(<Option value={category}>{category}</Option>);
  });


  return (
    <div className="selectCategory">
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select some categories"
      >
        {children}
      </Select>

    </div>
  );
}
