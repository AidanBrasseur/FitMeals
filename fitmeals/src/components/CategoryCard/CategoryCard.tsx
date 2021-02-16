import { Badge, Space } from 'antd';
import React from 'react';
import './styles.css';
import {
    CoffeeOutlined
} from '@ant-design/icons';

type CardProps = {
    name: string,
    icon?: string,
}
function CategoryCard({ name }: CardProps) {

    return (
        <div
            className='categoryCardContainer'
        >
            <Space style={{ marginTop: 30 }} size={20} direction='vertical' align='center' >
                <Badge style={{ backgroundColor: '#AFD3AA' }} count={50} offset={[-10, 20]}>

                    <div className='categoryIconContainer'>

                        <CoffeeOutlined style={{ fontSize: 60 }} />
                    </div>
                </Badge>
                <div style={{ fontFamily: 'Playfair-Display', fontSize: 'large', fontWeight: 'bold' }}>{name}</div>
            </Space>
        </div>
    );

}
export default CategoryCard;