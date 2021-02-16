import {  List, Space } from 'antd';
import React from 'react';
import './styles.css';

import CategoryCard from '../CategoryCard/CategoryCard';
// export type category = {
//     name: string,
// }
function Categories() {
 const categories = [
   'Pizza', 'Burger', 'Vegan', 'Healthy', 'Fish'
 ]
  return (
    <div className='categoryContainer'>
        <Space style={{marginTop: 10}} size={25} direction="vertical">
        <div className='categoryTitle'>Choose the category for you</div>
        <List className='categoryList'
        grid={{ gutter: 50, column: 5 }}
        itemLayout='horizontal'
        dataSource={categories}
        renderItem={category => (
        <List.Item>
            <CategoryCard name={category}/>
        </List.Item>
        )}
         />
       </Space>
    
    </div>
  );

}
export default Categories;