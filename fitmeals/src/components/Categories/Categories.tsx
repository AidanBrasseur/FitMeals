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
import { ReactComponent as SushiSvg } from '../../assets/sushi.svg';
import { ReactComponent as BurgerSvg } from '../../assets/burgers.svg';
import { ReactComponent as SmoothieSvg } from '../../assets/smoothie.svg';
import { ReactComponent as DessertSvg } from '../../assets/dessert.svg';
import { ReactComponent as SoupSvg } from '../../assets/soup.svg';
import { useSessionContext } from '../../contexts/SessionContext';
export type category = {
  name: string,
  icon: any,
  count?: number,
}
function Categories() {
  const featuredCategories = [
    { name: 'Salads', icon: SaladSvg, count: 50 } as category,
    { name: 'Vegan', icon: GrassSvg , count: 45} as category,
    { name: 'Fish', icon: FishSvg, count: 34 } as category,
    { name: 'Pasta', icon: PastaSvg, count: 56 } as category,
    {name: 'Pizza', icon: PizzaSvg, count: 24} as category]
  
  const remainingCategories = [
    
    { name: 'Burgers', icon: BurgerSvg, count: 76 } as category,
    { name: 'Sushi', icon: SushiSvg, count: 25 } as category,
    {name: 'Smoothies', icon: SmoothieSvg, count: 30} as category,
    { name: 'Dessert', icon: DessertSvg, count: 10 } as category,
    { name: 'Soup', icon: SoupSvg, count: 14 } as category,
   
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
              <CategoryCard name={category.name} icon={category.icon} count={category.count} />
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