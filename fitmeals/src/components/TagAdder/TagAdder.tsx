import { Select, Tag } from 'antd';
import { useState } from 'react';
import './styles.css';
export default function EditableTagGroup() {
  const [tags, setTags] = useState<string[]>([])
  const { Option } = Select;
  const handleClose = (removedTag: string) => {
    let newTags = tags.filter(tag => tag !== removedTag)
    setTags(newTags)
  };


  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={() => handleClose(tag)}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };
  const handleChange = (value: string) => {
    if (tags.includes(value)) {
      return;
    }
    else {
      setTags([...tags, value])
    }

  }
  const tagChild = tags.map(forMap);
  return (
    <>
      <div style={{ marginBottom: 16 }}>

        {tagChild}

      </div>
      { (
        <Select
          showSearch
          onChange={handleChange}
          style={{ width: 200 }}
          placeholder="Add a Category"
          optionFilterProp="children"

          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="Pizza">Pizza</Option>
          <Option value="Soup">Soup</Option>
          <Option value="Smoothie">Smoothie</Option>
          <Option value="Other">Other</Option>
        </Select>
      )}

    </>
  );
}
