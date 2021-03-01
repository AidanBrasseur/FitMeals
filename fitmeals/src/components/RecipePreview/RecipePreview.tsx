import { StarOutlined } from '@ant-design/icons';
import { Card, Col, Image, Row } from 'antd';
import React from 'react';
import './styles.css';

type previewProps =  {
    category: string,
    title: string,
    subtitle: string,
    time: string,
    calories: number,
    image: string,
    rating: number,
}

function RecipePreview({category, title, subtitle, time, calories, image, rating} : previewProps) {

    return (
        <div className="previewContainer">
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
                       <div className='rating'>
                           <Row  style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 3, paddingRight: 3}}justify='space-around' align='middle'>
                               <StarOutlined style={{color: 'white', fontSize: 15}}/>
                               <div style={{color: 'white'}}>{rating}</div>
                           </Row>
                       </div>
                    </div>
                    <Col className='infoCol'>
                        <p className='category'>{category}</p>
                        <p className='title'>{title}</p>
                        <p className='previewSubtitle'>{subtitle}</p>
                        <Row style={{ justifyContent: 'space-between' }}>
                            <p>{time}</p>
                            <p>{calories} cal.</p>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );

}
export default RecipePreview;