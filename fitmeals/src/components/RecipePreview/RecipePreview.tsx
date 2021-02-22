import { Badge, Card, Space, Image, Row, Col, Tag } from 'antd';
import React from 'react';
import './styles.css';
import Icon, { StarOutlined} from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';


function RecipePreview() {

    return (
        <div className="previewContainer">
            <Card
                hoverable
            >
                <Row className='previewRow'>
                    <div className='imageDiv'>
                        <Image

                            src="https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"
                            height="100%"
                            width="100%"
                            preview={false}
                            className='previewImage'
                        ></Image>
                       <div className='rating'>
                           <Row  style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 3, paddingRight: 3}}justify='space-around' align='middle'>
                               <StarOutlined style={{color: 'white', fontSize: 15}}/>
                               <text style={{color: 'white'}}>9.8</text>
                           </Row>
                       </div>
                    </div>
                    <Col className='infoCol'>
                        <p className='category'>Fish</p>
                        <p className='title'>Grilled Salmon</p>
                        <p className='subtitle'>Super duper healthy fish</p>
                        <Row style={{ justifyContent: 'space-between' }}>
                            <p>10-20min</p>
                            <p>500 cal.</p>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );

}
export default RecipePreview;