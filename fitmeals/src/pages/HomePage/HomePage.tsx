import { Input, Layout, Menu, Space } from 'antd';
import React from 'react';
import './styles.css';
import {
  UserOutlined
} from '@ant-design/icons';
import Categories from '../../components/Categories/Categories';
function HomePage() {
  const onSearch = () => {

  }
  return (
    <Layout>
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
      <Layout.Content className="site-layout" style={{ marginTop: 64 }}>
      <Categories></Categories>
      </Layout.Content>
    </Layout>
  );

}
export default HomePage;