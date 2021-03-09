import { Checkbox, List, Space } from 'antd';
import React, { useState } from 'react';
import RecipePreviewAdmin from '../RecipePreviewAdmin/RecipePreviewAdmin';
import './styles.css';
import { Recipe, RecipePreviewType } from '../../types';
import { AnimatePresence, motion } from 'framer-motion';
import { useSessionContext } from '../../contexts/SessionContext';
function AdminFeed() {

    const [sessionContext, updateSessionContext] = useSessionContext();


    const recipes = sessionContext.underReviewRecipes;

    const removePreviewById = (id: number, approve?: boolean) => {
        let recipeById = recipes.find((recipe: Recipe) => recipe.id === id)
        if (recipeById === undefined) {
            return;
        }
        if (approve) {
            let approvedRecipes = [recipeById, ...sessionContext.approvedRecipes]
            updateSessionContext({ ...sessionContext, underReviewRecipes: recipes.filter((recipe: Recipe) => recipe.id !== id), approvedRecipes: approvedRecipes })
        }
        else {
            updateSessionContext({ ...sessionContext, underReviewRecipes: recipes.filter((recipe: Recipe) => recipe.id !== id) })
        }
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

                        <List.Item style={{ display: 'flex', justifyContent: 'center' }}
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