import { Input, Layout, Space, Row, Col, Avatar } from 'antd';
import React from 'react';
import './styles.css';
import {
  UserOutlined
} from '@ant-design/icons';
import Categories from '../../components/Categories/Categories';
import Feed from '../../components/Feed/Feed';
function NewRecipePage() {
  const { TextArea } = Input;
  const onSearch = () => {

  }
  return (
    <Layout >
      <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%', justifyContent: 'center', background: 'white' }}>
        <div className="logo">FitMeals</div>
        <Space size={50}className="menu" direction="horizontal">
          <div className='search'> 
          <Input.Search  allowClear placeholder="Search Recipes" onSearch={onSearch} />
          </div>
          <UserOutlined  style={{ color: 'black' }}></UserOutlined>
         
          
          {/* <Menu theme="light" mode="horizontal">
            <Menu.Item key="1">
            <UserOutlined style={{ color: 'black' }}></UserOutlined>
            </Menu.Item>
          </Menu> */}
        </Space>
      </Layout.Header>
      <Layout.Content className="site-layout" style={{ marginTop: 64, backgroundColor: "white" }}>
        <div className="newRecipe">
          <Input placeholder="Your Recipe's Title" bordered={false} style={{ fontSize: 48, fontWeight: "bold" }}></Input>
          <h1 className="subtitle">Ingredients</h1>
          <h1 className="subtitle">Instructions</h1>
          <Row style={{ paddingBottom: 30 }}>
            <Col style={{display: "flex", justifyContent: "center"}} span={2}>
              <Avatar>1</Avatar>
            </Col>
            <Col span={12}>
              <TextArea placeholder="Enter your instruction" rows={4} bordered={false} style={{ fontSize: 16 }}></TextArea>
            </Col>
          </Row>
          <Row style={{ paddingBottom: 30 }}>
            <Col style={{display: "flex", justifyContent: "center"}} span={2}>
              <Avatar>2</Avatar>
            </Col>
            <Col span={12}>
              <TextArea placeholder="Enter your instruction" rows={4} bordered={false} style={{ fontSize: 16 }}></TextArea>
            </Col>
          </Row>
          <Row style={{ paddingBottom: 30 }}>
            <Col style={{display: "flex", justifyContent: "center"}} span={2}>
              <Avatar>3</Avatar>
            </Col>
            <Col span={12}>
              <TextArea placeholder="Enter your instruction" rows={4} bordered={false} style={{ fontSize: 16 }}></TextArea>
            </Col>
          </Row>
        </div>
      </Layout.Content>
    </Layout>
  );

}
export default NewRecipePage;