import { Badge, Card, Space } from 'antd';
import React from 'react';
import './styles.css';
import Icon from '@ant-design/icons';
import { motion } from 'framer-motion';
type CardProps = {
    name: string,
    icon: any,
    count?: number
}
function CategoryCard({ name, icon, count }: CardProps) {
    const [selected, setSelected] = React.useState(false);
    return (
        <motion.div
            onClick={() => setSelected(!selected)}
            whileHover={{ scale: 1.05 }}
            whileTap={{
                scale: 0.9
            }}>
                  
            <div className="categoryCardContainer">
            
                <Card
                    hoverable
                >
                  
                    <Space size={20} direction='vertical' align='center' >
                        <Badge style={{ backgroundColor: '#AFD3AA' }} count={count} offset={[-10, 20]}>

                            <div className='categoryIconContainer'
                              style={
                                !selected
                                  ? {
                                      backgroundColor: "white"
                                    }
                                  : {
                                      backgroundColor: "#AFD3AA"
                                    }
                              }
                             >
                                <Icon component={icon} style={{ fontSize: 60 }} />
                            </div>
                        </Badge>
                        <div style={{ color: "#032D23", fontSize: 'large', fontWeight: "bold" }}>{name}</div>
                    </Space>
                 
                </Card>
             
            </div>
           
        </motion.div>
    );

}
export default CategoryCard;