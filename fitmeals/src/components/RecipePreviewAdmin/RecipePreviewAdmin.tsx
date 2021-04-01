import { CheckOutlined, CloseOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.css';
import {Recipe, RecipePreviewType} from '../../types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HOST } from '../../config';
import { useSessionContext } from '../../contexts/SessionContext';
type AdminPreviewProps = {
    preview: RecipePreviewType,
    removePreviewById: Function,
}
function RecipePreviewAdmin({preview, removePreviewById}: AdminPreviewProps) {
    const {categories, title, subtitle, time, calories, image, id} = preview
    const [ approve, setApprove ] = useState(false);
    const [ reject, setReject ] = useState(false);
    const [sessionContext, updateSessionContext] = useSessionContext();
    const delay = (ms : number) => new Promise(res => setTimeout(res, ms));
    
    const onApprove = () => {
        axios.patch(HOST + 'admin/approve-recipe/' + id, {}, {
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
            setApprove(true)
        }).catch((error) => {
            console.log(error)
        })
    }
    const onReject = () => {
       axios.patch(HOST + 'admin/reject-recipe/' + id, {}, {
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
            setReject(true)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect( () => {
        async function removeList () {
            await delay(300);
            removePreviewById(id)
        }
        if(approve){
        removeList()
        }
    }, [approve])

    useEffect( () => {
        async function removeList () {
            await delay(300);
            removePreviewById(id)
        }
        if(reject){
            removeList()
        }
    }, [reject])
    
    return (
        <motion.div
        key={id.toString()}
        initial={{ x: 300, opacity: 0 }}
        animate={approve || reject ? {scale: 0, x: 0, opacity: 0} : { x: 0, opacity: 1 }}
        
        transition={{ duration: 0.3 }}>
        <div className="adminPreviewContainer">
            <Card
            >
                <Link to={{pathname: '/edit-recipe',
                        state: { recipe: preview }}}>
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
                        <p className='adminCategory'>{categories[0]}</p>
                        <p className='adminTitle'>{title}</p>
                        <p className='adminPreviewSubtitle'>{subtitle}</p>
                        <Row style={{ justifyContent: 'space-between' }}>
                            <p>{time}</p>
                            <p>{calories} cal.</p>
                        </Row>
                    </Col>
                </Row>
                </Link>
                <Row className='adminControls'>
                    <div className='adminApproval' onClick={onApprove}>
                    <Button type="primary" shape="circle" icon={<CheckOutlined  />} />
                    </div>
                    <div className='adminReject' onClick={onReject}>
                    <Button type="primary" shape="circle" icon={<CloseOutlined  />} />
                    </div>

                </Row>
            </Card>
        </div>
        </motion.div>
    );

}
export default RecipePreviewAdmin;