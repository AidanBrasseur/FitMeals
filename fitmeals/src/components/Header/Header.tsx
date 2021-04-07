import { BookOutlined, SecurityScanOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Layout, Menu, Space } from 'antd';
import Search from 'antd/lib/transfer/search';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSessionContext } from '../../contexts/SessionContext';
import './styles.css';

type HeaderProps = {
  setSearchQuery?: (searchQuery: string | undefined) => void
} 

function Header({setSearchQuery}: HeaderProps) {
    const onSearch = (value: string) => {
      if(setSearchQuery){
        setSearchQuery(value)
        console.log(value)
      }
    }
    const onBlur = (e : any) => {
      console.log()
      if(e.target?.attributes.value.nodeValue === ""){
        if(setSearchQuery){
          setSearchQuery(undefined)
        }
      } 
    }
    const [sessionContext, updateSessionContext] = useSessionContext();

    const menu = sessionContext.user ? (
      <Menu>
        <Menu.Item>
          <Link to={{ pathname: `/profile/${sessionContext.user?.username}` }}><UserOutlined />Profile Page</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/saved-recipes" ><BookOutlined />Saved Recipes</Link>
        </Menu.Item>
        {sessionContext.user?.isAdmin ? <Menu.Item>
          <Link to="/admin-panel" ><SecurityScanOutlined />Admin Page</Link>
        </Menu.Item> : null}
        <Menu.Item>
          <Link to="/account-settings" ><SettingOutlined />Account Settings</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login" ><Button onClick={() => localStorage.clear()}style={{width: '100%'}}>Logout</Button></Link>
        </Menu.Item>
      </Menu>
    ) : (
      <Menu>
        <Menu.Item>
          <Link to="/login" ><Button  style={{width: '100%'}}>Login</Button></Link>
        </Menu.Item>
      </Menu>
    );
    return (
        <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: 'white' }}>
        <Link to='/'><div className="textLogo">FitMeals</div></Link>
        <Space size={50} className="menu" direction="horizontal" align='center'>
          { setSearchQuery && <div className='search'>
            <Input.Search allowClear placeholder="Search Recipes" onBlur={onBlur} onSearch={onSearch} size='large' />
          </div>}
          <Dropdown overlay={menu} placement="bottomCenter" className='dropdown'>
            <Space size={20} direction='horizontal' className='userRow' align='center'>
          
            <div className='userPic'>
              <UserOutlined  />
            </div>
            {sessionContext.user && <div className='userName'>
            {sessionContext.user?.name }
            </div>}
            </Space>
          </Dropdown>
        </Space>
      </Layout.Header>
    );

}
export default Header;