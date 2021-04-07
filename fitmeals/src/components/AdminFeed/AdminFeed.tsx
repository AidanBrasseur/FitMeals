import { Checkbox, ConfigProvider, List, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import RecipePreviewAdmin from '../RecipePreviewAdmin/RecipePreviewAdmin';
import './styles.css';
import { Recipe, RecipePreviewType } from '../../types';
import { AnimatePresence, motion } from 'framer-motion';
import { useSessionContext } from '../../contexts/SessionContext';
import axios from 'axios';
import { HOST } from '../../config';
import { Empty } from 'antd';
type AdminProps = {
    searchQuery?: string | undefined;

}
function AdminFeed({ searchQuery }: AdminProps) {

    const [sessionContext, updateSessionContext] = useSessionContext();


    const [recipes, setRecipes] = useState<RecipePreviewType[] | undefined>(undefined);
    const fetchRecipes = () => {
        axios.get(HOST + 'admin/recipes', {
            params: {
                searchQuery: searchQuery,
            },
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
           
            const parsedRecipes = response.data.map((r: any) => {
                const categories = r.categories.map((cat: any) => {
                    return cat.name
                })
                return {id: r._id, title: r.title, subtitle: r.subtitle, time: r.time, calories: r.calories, image: r.image.url, categories: categories , rating: r.rating} as RecipePreviewType
            })
            setRecipes(parsedRecipes)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {

        fetchRecipes();

    }, [searchQuery]);

    const removePreviewById = (id: string) => {
        const removeApprove = recipes?.filter((recipe: RecipePreviewType) => recipe.id != id)
        setRecipes(removeApprove)
    }

    return (

        <div className="adminFeedContainer">
            <Space style={{ marginTop: 20 }} size={25} direction="vertical">
                <div className='adminFeedTitle'>Admin Panel</div>
                <ConfigProvider renderEmpty={() => <Empty description="No Recipes"/>}>
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
                </ConfigProvider>


            </Space>
        </div>


    );

}
export default AdminFeed;