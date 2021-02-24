import { Badge, Card, Space } from 'antd';
import React from 'react';
import './styles.css';
import Icon from '@ant-design/icons';

type CardProps = {
    name: string,
    icon: any,
}
function CategoryCard({ name, icon}: CardProps) {

    return (
        <div className="categoryCardContainer">
        <Card
            hoverable 
        >
            <Space size={20} direction='vertical' align='center' >
                <Badge style={{ backgroundColor: '#AFD3AA' }} count={50} offset={[-10, 20]}>

                    <div className='categoryIconContainer'>
                        <Icon component={icon} style={{fontSize: 60}}/>
                    </div>
                </Badge>
                <div style={{ color: "#032D23", fontSize: 'large', fontWeight: "bold" }}>{name}</div>
            </Space>
        </Card>
        </div>
    );

}
export default CategoryCard;