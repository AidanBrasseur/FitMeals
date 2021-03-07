import { List, Space } from 'antd';
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from 'react';
import { RecipePreviewType } from '../../types';
import RecipePreview from '../RecipePreview/RecipePreview';
import './styles.css';

type FeedProps = {
    title: string;
}
function Feed({title} : FeedProps) {
    

    const [recipes, setRecipes] = useState([
        {id: 1, rating: 4.5, category: 'Fish', title: 'Grilled Salmon', subtitle: 'Super duper healthy fish', time: '10-20min', calories: 500, image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"} as RecipePreviewType,
        {id: 2, rating: 2.2,category: 'Pizza', title: "World's Best Pizza", subtitle: 'Super duper healthy pizza', time: '10-20min', calories: 500, image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"} as RecipePreviewType,
        {id: 3, rating: 4.4,category: 'Pasta', title: 'Healthy Pasta', subtitle: 'Super duper healthy pasta', time: '10-20min', calories: 500, image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"} as RecipePreviewType,
        {id: 4, rating: 3.2,category: 'Fish', title: 'Grilled Tuna', subtitle: 'Super duper healthy fish', time: '10-20min', calories: 500, image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"} as RecipePreviewType,
        {id: 5, rating: 4.9,category: 'Salad', title: 'Healthy Salad', subtitle: 'Super duper healthy salad', time: '10-20min', calories: 500, image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"} as RecipePreviewType,
        {id: 6, rating: 4.6,category: 'Fish', title: 'Grilled Salmon', subtitle: 'Super duper healthy fish', time: '10-20min', calories: 500, image: "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"} as RecipePreviewType,
    ])
    return (
        <div className="feedContainer">

            <Space style={{ marginTop: 20 }} size={25} direction="vertical">
                <div className='feedTitle'>{title}</div>
                <AnimatePresence>
                <List
                    className='feedGrid'
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
                      
                        <motion.div initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.4}} >
                        <List.Item style={{ display: 'flex', justifyContent: 'center' }}
                         key={recipe.id.toString()} >

                            <RecipePreview id={recipe.id} rating={recipe.rating} category={recipe.category} title={recipe.title} time={recipe.time} calories={recipe.calories} subtitle={recipe.subtitle} image={recipe.image}></RecipePreview>

                        </List.Item>
                        </motion.div>
                        

                    )}
                />
                </AnimatePresence>

            </Space>
        </div>


    );

}
export default Feed;