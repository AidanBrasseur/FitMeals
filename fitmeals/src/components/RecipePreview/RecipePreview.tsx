import { StarOutlined } from '@ant-design/icons';
import { Card, Col, Image, Row } from 'antd';
import React from 'react';
import './styles.css';
import {Recipe, RecipePreviewType} from '../../types';
import { Link } from 'react-router-dom';
type RecipePreviewProps = {
    recipe: RecipePreviewType,
   
}
function RecipePreview({recipe} : RecipePreviewProps ) {
    const {categories, title, subtitle, time, calories, image, id, rating} = recipe
    return (
        <div className="previewContainer">
            <Link to={{pathname: '/recipe',
                        state: { recipe: id }}}>
            <Card
                hoverable
            >
                <Row className='previewRow'>
                    <div className='imageDiv'>
                        <Image

                            src={image}
                            height="100%"
                            width="100%"
                            preview={false}
                            className='previewImage'
                        ></Image>
                       {rating && <div className='rating'>
                           <Row  style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 3, paddingRight: 3}}justify='space-around' align='middle'>
                               <StarOutlined style={{color: 'white', fontSize: 15}}/>
                               <div style={{color: 'white'}}>{Math.round((rating + Number.EPSILON) * 100) / 100 }</div>
                           </Row>
                       </div>}
                    </div>
                    <Col className='infoCol'>
                        <p className='previewCategory'>{categories[0]}</p>
                        <p className='previewTitle'>{title}</p>
                        <p className='previewSubtitle'>{subtitle}</p>
                        <Row style={{ justifyContent: 'space-between' }}>
                            <p>{time}</p>
                            <p>{calories} cal.</p>
                        </Row>
                    </Col>
                </Row>
            </Card>
            </Link>
        </div>
    );

}
export default RecipePreview;