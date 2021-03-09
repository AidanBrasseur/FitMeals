import { List, Space } from 'antd';
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from 'react';
import { RecipePreviewType } from '../../types';
import RecipePreview from '../RecipePreview/RecipePreview';
import './styles.css';
import { useSessionContext } from '../../contexts/SessionContext';
type FeedProps = {
    title: string;
    user?: boolean
}
function Feed({ title, user }: FeedProps) {
    const [sessionContext, updateSessionContext] = useSessionContext();
    let recipes = []
    if (user) {
        recipes = sessionContext.userRecipes;
    }
    else {
        recipes = sessionContext.approvedRecipes;
    }
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
                                transition={{ duration: 0.4 }} >
                                <List.Item style={{ display: 'flex', justifyContent: 'center' }}
                                    key={recipe.id.toString()} >

                                    <RecipePreview recipe={recipe}></RecipePreview>

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