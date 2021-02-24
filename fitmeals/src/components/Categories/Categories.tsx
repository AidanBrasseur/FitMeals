import { List, Space } from 'antd';
import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom'
import CategoryCard from '../CategoryCard/CategoryCard';
import { ReactComponent as SaladSvg } from '../../assets/green-salad.svg';
import { ReactComponent as GrassSvg } from '../../assets/baseline-grass.svg';
import { ReactComponent as FishSvg } from '../../assets/ion_fish.svg';
import { ReactComponent as PastaSvg } from '../../assets/mdi_pasta.svg';
import { ReactComponent as PizzaSvg } from '../../assets/pizza-1.svg';

export type category = {
  name: string,
  icon: any,
}
function Categories() {
  const categories = [
    { name: 'Salads', icon: SaladSvg } as category,
    { name: 'Vegan', icon: GrassSvg } as category,
    { name: 'Fish', icon: FishSvg } as category,
    { name: 'Pasta', icon: PastaSvg } as category,
    { name: 'Pizza', icon: PizzaSvg } as category
  ]

  return (
    <div className='categoryContainer'>
      <Space style={{ marginTop: 10 }} size={25} direction="vertical">
        <div className='categoryTitle'>Choose the category for you</div>
        <List className='categoryList'
          grid={{ gutter: 50, column: 5 }}
          itemLayout='horizontal'
          dataSource={categories}
          renderItem={category => (
            <List.Item>
              <CategoryCard name={category.name} icon={category.icon} />
            </List.Item>
          )}
        />
        <div className="categoryTitle">
          <Link to="/new-recipe" style={{ color: "white", fontSize: 26 }}>Or <span className="underlineLink">Add a New Recipe</span></Link>
        </div>
      </Space>
    </div>
  );

}
export default Categories;