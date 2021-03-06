import { BookOutlined, SecurityScanOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Layout, Menu, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSessionContext } from '../../contexts/SessionContext';
import './styles.css';



function Header() {
    const onSearch = () => {

    }
    const [sessionContext, updateSessionContext] = useSessionContext();

    const menu = sessionContext.user ? (
      <Menu>
        <Menu.Item>
          <Link to="/profile"><UserOutlined />Profile Page</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/new-recipe" ><BookOutlined />Saved Recipes</Link>
        </Menu.Item>
        {sessionContext.user?.isAdmin ? <Menu.Item>
          <Link to="/admin-panel" ><SecurityScanOutlined />Admin Page</Link>
        </Menu.Item> : null}
        <Menu.Item>
          <Link to="/login" ><Button>Logout</Button></Link>
        </Menu.Item>
      </Menu>
    ) : (
      <Menu>
        <Menu.Item>
          <Link to="/login" ><Button>Login</Button></Link>
        </Menu.Item>
      </Menu>
    );
    return (
        <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: 'white' }}>
        <Link to='/'><div className="textLogo">FitMeals</div></Link>
        <Space size={50} className="menu" direction="horizontal">
          <div className='search'>
            <Input.Search allowClear placeholder="Search Recipes" onSearch={onSearch} size='large' />
          </div>
          <Dropdown overlay={menu} placement="bottomCenter">
            <UserOutlined style={{ color: 'grey', fontSize: 20 }} />
          </Dropdown>
        </Space>
      </Layout.Header>
    );

}
export default Header;