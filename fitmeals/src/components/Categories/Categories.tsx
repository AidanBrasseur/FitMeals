import { Button, List, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as GrassSvg } from '../../assets/baseline-grass.svg';
import { ReactComponent as BurgerSvg } from '../../assets/burgers.svg';
import { ReactComponent as DessertSvg } from '../../assets/dessert.svg';
import { ReactComponent as SaladSvg } from '../../assets/green-salad.svg';
import { ReactComponent as FishSvg } from '../../assets/ion_fish.svg';
import { ReactComponent as PastaSvg } from '../../assets/mdi_pasta.svg';
import { ReactComponent as PizzaSvg } from '../../assets/pizza-1.svg';
import { ReactComponent as SmoothieSvg } from '../../assets/smoothie.svg';
import { ReactComponent as SoupSvg } from '../../assets/soup.svg';
import { ReactComponent as SushiSvg } from '../../assets/sushi.svg';
import { HOST } from '../../config';
import CategoryCard from '../CategoryCard/CategoryCard';
import './styles.css';
export type category = {
  name: string,
  icon: any,
  count?: number,
}
const featuredCategories = [
  { name: 'Salads', icon: SaladSvg, count: 0 } as category,
  { name: 'Vegan', icon: GrassSvg, count: 0 } as category,
  { name: 'Fish', icon: FishSvg, count: 0 } as category,
  { name: 'Pasta', icon: PastaSvg, count: 0 } as category,
  { name: 'Pizza', icon: PizzaSvg, count: 0 } as category]

const remainingCategories = [

  { name: 'Burgers', icon: BurgerSvg, count: 0 } as category,
  { name: 'Sushi', icon: SushiSvg, count: 0 } as category,
  { name: 'Smoothies', icon: SmoothieSvg, count: 0 } as category,
  { name: 'Dessert', icon: DessertSvg, count: 0 } as category,
  { name: 'Soup', icon: SoupSvg, count: 0 } as category,
]
type CategoriesProps = {
  setCategoryQuery?: (categoryQuery: string[] | undefined) => void
}
function Categories({setCategoryQuery}: CategoriesProps) {
 

  const [categories, setCategories] = useState<category[]>(featuredCategories)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [viewAllCat, setViewAllCat] = useState(false)

  const currentHistory = useHistory();
  const loadMoreCategories = () => {
    setViewAllCat(true)
    setCategories(categories.concat(remainingCategories))
  }
  const hideCategories = () => {
    setViewAllCat(false)
    const newSelected = selectedCategories.filter((cat: string)=> {
      return !remainingCategories.some(i => i.name.includes(cat))
    })
    setSelectedCategories(newSelected)
    setCategories(featuredCategories)
  }
  const goToNewRecipe = () => {
    currentHistory.push('/new-recipe');
  }
  const fetchCategoryCounts = () => {
    axios.get(HOST + 'recipes/categories').then(response => {
      const newCounts = featuredCategories.map(cat => {
          cat.count = 25
          return cat
      });
      remainingCategories.map(cat => {
        cat.count = 35;
      })
      console.log(featuredCategories)
      setCategories(newCounts)
  }).catch((error) => {
      console.log(error)
  })
  }
  const addCategoryToList = (category: string) => {
    if(!selectedCategories.includes(category)){
        const newSelect = [...selectedCategories, category]
        setSelectedCategories(newSelect);
    }
  }
  const removeCategoryFromList = (category: string) => {
    if(selectedCategories.includes(category)){
        const newSelect = selectedCategories.filter((cat: string) => {
          return cat != category
        })
        setSelectedCategories(newSelect);
    }
  }
  useEffect(() => {
      fetchCategoryCounts();
  }, []);
  useEffect(() => {
    if(setCategoryQuery){
      setCategoryQuery(selectedCategories);
    }
}, [selectedCategories]);
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
            <List.Item style={{ display: 'flex', justifyContent: 'center' }}>
              <CategoryCard name={category.name} icon={category.icon} count={category.count} selectCategory={addCategoryToList} deselectCategory={removeCategoryFromList} />
            </List.Item>
          )}
        />

        {!viewAllCat ? <div className='viewCategoriesTitle'>
          <Button type="text" onClick={loadMoreCategories} style={{ color: 'white' }}>View All Categories</Button>
        </div> : <div className='viewCategoriesTitle'><Button style={{ color: 'white' }} type="text" onClick={hideCategories}>Hide Categories</Button> </div>}
        <div className="categoryTitle">
          <div onClick={goToNewRecipe} style={{ color: "white", fontSize: 26 }}>Or <span className="underlineLink">Add a New Recipe</span></div>
        </div>
      </Space>
    </div>
  );

}
export default Categories;