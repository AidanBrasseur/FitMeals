import { Badge, Card, Space } from 'antd';
import React, { useEffect } from 'react';
import './styles.css';
import Icon from '@ant-design/icons';
import { motion } from 'framer-motion';
type CardProps = {
    name: string,
    icon: any,
    count?: number,
    selectCategory: (cat: string) => void,
    deselectCategory: (cat: string) => void
}
function CategoryCard({ name, icon, count, selectCategory, deselectCategory }: CardProps) {
    const [selected, setSelected] = React.useState(false);
    useEffect(() => {
        if(!selected){
            deselectCategory(name)
        }
        else{
            selectCategory(name)
        }
    }, [selected]);
    return (
        <div onMouseUp={() => setSelected(!selected)}>
        <motion.div
            
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
        </div>
    );

}
export default CategoryCard;