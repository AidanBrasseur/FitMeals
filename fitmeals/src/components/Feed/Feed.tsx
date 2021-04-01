import { List, Space } from 'antd';
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { RecipePreviewType, Recipe } from '../../types';
import RecipePreview from '../RecipePreview/RecipePreview';
import './styles.css';
import { HOST } from '../../config';
import axios from 'axios';
import { useSessionContext } from '../../contexts/SessionContext';

type FeedProps = {
    title: string;
    userId?: string;
    saved?: boolean;
    searchQuery?: string | undefined;
    categoryQuery?: string[] | undefined;
}
function Feed({ title, userId, saved, searchQuery, categoryQuery }: FeedProps) {
    const [recipes, setRecipes] = useState<RecipePreviewType[] | undefined>(undefined);
    const [sessionContext, updateSessionContext] = useSessionContext();
    const fetchRecipes = () => {
        axios.get(HOST + 'recipes', {
            params:{
                searchQuery: searchQuery,
                categoryQuery: categoryQuery,
            }
        }).then(response => {
            const parsedRecipes = response.data.map((r : any) => {
                const categories = r.categories.map((cat: any) => {
                    return cat.name
                })
                return {id: r._id, title: r.title, subtitle: r.subtitle, time: r.time, calories: r.calories, image: "https://universityhealthnews.com/media/ispizzahealthy.jpg", categories: categories } as RecipePreviewType
            })
            setRecipes(parsedRecipes)
        }).catch((error) => {
            console.log(error)
        })
    }
    const fetchUserRecipes = () => {
        axios.get(HOST + 'recipes/users/' + userId, {
            params:{
                searchQuery: searchQuery,
                categoryQuery: categoryQuery,
            }
        }).then(response => {
            const parsedRecipes = response.data.map((r : any) => {
                const categories = r.categories.map((cat: any) => {
                    return cat.name
                })
                return {id: r._id, title: r.title, subtitle: r.subtitle, time: r.time, calories: r.calories, image: "https://universityhealthnews.com/media/ispizzahealthy.jpg", categories: categories } as RecipePreviewType
            })
            setRecipes(parsedRecipes)
        }).catch((error) => {
            console.log(error)
        })
    }

    const fetchSavedRecipes = () => {
        axios.get(HOST + 'recipes/saved', {
            params:{
                searchQuery: searchQuery,
                categoryQuery: categoryQuery,
            },
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
            const parsedRecipes = response.data.map((r : any) => {
                const categories = r.categories.map((cat: any) => {
                    return cat.name
                })
                return {id: r._id, title: r.title, subtitle: r.subtitle, time: r.time, calories: r.calories, image: "https://universityhealthnews.com/media/ispizzahealthy.jpg", categories: categories } as RecipePreviewType
            })
            setRecipes(parsedRecipes)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        if(userId){
            fetchUserRecipes();
        }
        else if(saved){
            fetchSavedRecipes();
        }
        else{
            fetchRecipes();
        }
    }, [searchQuery, categoryQuery]);
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