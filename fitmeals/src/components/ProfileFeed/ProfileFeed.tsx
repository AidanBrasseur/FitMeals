import { List, Space } from 'antd';
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from 'react';
import { RecipePreviewType } from '../../types';
import RecipePreview from '../RecipePreview/RecipePreview';
import { useSessionContext } from '../../contexts/SessionContext';
import './styles.css';
function ProfileFeed() {
    

    const [sessionContext, updateSessionContext] = useSessionContext();
    const recipes = sessionContext.userRecipes;

    return (
        <div className="feedContainer">

            <Space size={25} direction="vertical">
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

                            <RecipePreview id={recipe.id} rating={recipe.rating} category={recipe.categories[0]} title={recipe.title} time={recipe.time} calories={recipe.calories} subtitle={recipe.subtitle} image={recipe.image}></RecipePreview>

                        </List.Item>
                        </motion.div>
                        

                    )}
                />
                </AnimatePresence>

            </Space>
        </div>


    );

}
export default ProfileFeed;