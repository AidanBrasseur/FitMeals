import { Button, List, Space } from 'antd';
import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom'
import CategoryCard from '../CategoryCard/CategoryCard';
import { ReactComponent as SaladSvg } from '../../assets/green-salad.svg';
import { ReactComponent as GrassSvg } from '../../assets/baseline-grass.svg';
import { ReactComponent as FishSvg } from '../../assets/ion_fish.svg';
import { ReactComponent as PastaSvg } from '../../assets/mdi_pasta.svg';
import { ReactComponent as PizzaSvg } from '../../assets/pizza-1.svg';
import { useSessionContext } from '../../contexts/SessionContext';
export type category = {
  name: string,
  icon: any,
}
function Categories() {
  const featuredCategories = [
    { name: 'Salads', icon: SaladSvg } as category,
    { name: 'Vegan', icon: GrassSvg } as category,
    { name: 'Fish', icon: FishSvg } as category,
    { name: 'Pasta', icon: PastaSvg } as category,
    {name: 'Pizza', icon: PizzaSvg} as category]
  
  const remainingCategories = [
    
    { name: 'Vegan', icon: GrassSvg } as category,
    { name: 'Fish', icon: FishSvg } as category,
    {name: 'Pizza', icon: PizzaSvg} as category,
    { name: 'Salads', icon: SaladSvg } as category,
    { name: 'Pasta', icon: PastaSvg } as category,
   
  ]
  const [categories, setCategories] = useState<category[]>(featuredCategories)
  const [viewAllCat, setViewAllCat] = useState(false)
  const [sessionContext, updateSessionContext] = useSessionContext();
  const currentHistory = useHistory();
  const loadMoreCategories = () => {
    setViewAllCat(true)
    setCategories(categories.concat(remainingCategories))
  }
  const hideCategories = () =>{
    setViewAllCat(false)
    setCategories(featuredCategories)
  }
 const goToNewRecipe= () => {
  currentHistory.push('/new-recipe');
 }
  return (
    <div className='categoryContainer'>
      <Space style={{ marginTop: 10 }} size={25} direction="vertical">
        <div className='categoryTitle'>Choose the category for you</div>
        <List className='categoryList'
          grid={{
            gutter: 50,
            xs: 2,
            sm: 2,
            md: 4,
            lg: 5,
            xl: 5,
            xxl: 5,
          }}
          itemLayout='horizontal'
          dataSource={categories}
          renderItem={category => (
            <List.Item style={{display: 'flex', justifyContent: 'center'}}>
              <CategoryCard name={category.name} icon={category.icon} />
            </List.Item>
          )}
        />
       
        { !viewAllCat ? <div className='viewCategoriesTitle'>
          <Button type="text" onClick={loadMoreCategories} style={{color:'white'}}>View All Categories</Button>
          </div> : <div className='viewCategoriesTitle'><Button  style={{color:'white'}} type="text" onClick={hideCategories}>Hide Categories</Button> </div>}
        <div className="categoryTitle">
          <div onClick={goToNewRecipe} style={{ color: "white", fontSize: 26 }}>Or <span className="underlineLink">Add a New Recipe</span></div>
        </div>
      </Space>
    </div>
  );

}
export default Categories;