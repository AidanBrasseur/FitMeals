import { CheckOutlined, CloseOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, Row, Space } from 'antd';
import React, { useState } from 'react';
import './styles.css';
import {RecipePreviewType} from '../../types';
type AdminPreviewProps = {
    preview: RecipePreviewType,
    removePreviewById: Function,
}
function RecipePreviewAdmin({preview, removePreviewById}: AdminPreviewProps) {
    const {category, title, subtitle, time, calories, image, id} = preview
    const onApprove = () => {
       removePreviewById(id)
    }
    const onReject = () => {
        removePreviewById(id)
    }
    
    return (
        
        <div className="adminPreviewContainer">
            <Card
                hoverable
            >
                <Row className='adminPreviewRow'>
                    <div className='adminImageDiv'>
                        <Image
                            src={image}
                            height="100%"
                            width="100%"
                            preview={false}
                            className='adminPreviewImage'
                        ></Image>
                    </div>
                    <Col className='adminInfoCol'>
                        <p className='adminCategory'>{category}</p>
                        <p className='adminTitle'>{title}</p>
                        <p className='adminPreviewSubtitle'>{subtitle}</p>
                        <Row style={{ justifyContent: 'space-between' }}>
                            <p>{time}</p>
                            <p>{calories} cal.</p>
                        </Row>
                    </Col>
                </Row>
                <Row className='adminControls'>
                    <div className='adminApproval'>
                    <Button type="primary" shape="circle" icon={<CheckOutlined  />} onClick={onApprove}/>
                    </div>
                    <div className='adminReject'>
                    <Button type="primary" shape="circle" icon={<CloseOutlined  onClick={onReject}/>} />
                    </div>

                </Row>
            </Card>
        </div>
    );

}
export default RecipePreviewAdmin;