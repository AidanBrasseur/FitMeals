import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Layout, Menu, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';



function Header() {
    const onSearch = () => {

    }
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/new-recipe">Profile Page</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/new-recipe" >Settings</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login" ><Button>Logout</Button></Link>
        </Menu.Item>
      </Menu>
    );
    return (
        <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%', justifyContent: 'center', background: 'white' }}>
        <div className="logo">FitMeals</div>
        <Space size={50} className="menu" direction="horizontal">
          <div className='search'>
            <Input.Search allowClear placeholder="Search Recipes" onSearch={onSearch} />
          </div>
          <Dropdown overlay={menu} placement="bottomCenter">
            <UserOutlined style={{ color: 'grey', fontSize: 20 }} />
          </Dropdown>
        </Space>
      </Layout.Header>
    );

}
export default Header;