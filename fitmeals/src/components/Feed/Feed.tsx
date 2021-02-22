import { Card, Col, List, Row, Space } from 'antd';
import React from 'react';
import './styles.css';
import RecipePreview from '../RecipePreview/RecipePreview'
function Feed() {
    const recipes = [
        'Pizza', 'Burger', 'Vegan', 'Healthy', 'Fish'
    ]
    return (
        <div className="feedContainer">

            <Space style={{ marginTop: 20 }} size={25} direction="vertical">
                <div className='feedTitle'>Featured Recipes</div>

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

                    renderItem={recipe => (

                        <List.Item style={{ display: 'flex', justifyContent: 'center' }} >

                            <RecipePreview></RecipePreview>

                        </List.Item>

                    )}
                />

            </Space>
        </div>


    );

}
export default Feed;