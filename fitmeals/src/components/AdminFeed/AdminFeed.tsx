import { Checkbox, List, Space } from 'antd';
import React, { useState } from 'react';
import RecipePreviewAdmin from '../RecipePreviewAdmin/RecipePreviewAdmin';
import './styles.css';
import { RecipePreviewType } from '../../types';
import { AnimatePresence, motion } from 'framer-motion';

function AdminFeed() {

    const [recipes, setRecipes] = useState([
        { id: 1, category: 'Fish', title: 'Grilled Salmon', subtitle: 'Super duper healthy fish', time: '10-20min', calories: 500, image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg" } as RecipePreviewType,
        { id: 2, category: 'Pizza', title: "World's Best Pizza", subtitle: 'Super duper healthy pizza', time: '10-20min', calories: 500, image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg" } as RecipePreviewType,
        { id: 3, category: 'Pasta', title: 'Healthy Pasta', subtitle: 'Super duper healthy pasta', time: '10-20min', calories: 500, image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg" } as RecipePreviewType,
        { id: 4, category: 'Fish', title: 'Grilled Tuna', subtitle: 'Super duper healthy fish', time: '10-20min', calories: 500, image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg" } as RecipePreviewType,
        { id: 5, category: 'Salad', title: 'Healthy Salad', subtitle: 'Super duper healthy salad', time: '10-20min', calories: 500, image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg" } as RecipePreviewType,
        { id: 6, category: 'Fish', title: 'Grilled Salmon', subtitle: 'Super duper healthy fish', time: '10-20min', calories: 500, image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg" } as RecipePreviewType,
    ])

    const removePreviewById = (id: number) => {
        setRecipes(recipes.filter((recipe: RecipePreviewType) => recipe.id !== id))
    }
    

    return (
      
        <div className="adminFeedContainer">
            <Space style={{ marginTop: 20 }} size={25} direction="vertical">
                <div className='adminFeedTitle'>Admin Panel</div>
               
               <List
                    className='adminFeedGrid'
                    grid={{
                        gutter: 10,
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 2,
                        xl: 2,
                        xxl: 3,
                    }}
                    itemLayout='horizontal'
                    dataSource={recipes}
                    rowKey={recipe => recipe.id.toString()}
                    renderItem={recipe => (
                       
                        <List.Item style={{ display: 'flex', justifyContent: 'center'}}
                         key={recipe.id.toString()} >
                       
                            <RecipePreviewAdmin removePreviewById={removePreviewById} preview={recipe} ></RecipePreviewAdmin>
                            
                        </List.Item>
                       
                    )}
                />
                
               
            </Space>
        </div>


    );

}
export default AdminFeed;