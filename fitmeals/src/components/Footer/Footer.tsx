import Icon, { BookOutlined, SecurityScanOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Layout, Menu, Space } from 'antd';
import Search from 'antd/lib/transfer/search';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSessionContext } from '../../contexts/SessionContext';
import './styles.css';
import { ReactComponent as logoSVG } from '../../assets/svg/logo.svg';
// type HeaderProps = {
//   setSearchQuery?: (searchQuery: string | undefined) => void
// } 

function Footer() {
    const [sessionContext, updateSessionContext] = useSessionContext();

    return (
        <Layout.Footer className="footerContainer" style={{backgroundColor: '#032D23'}}>
        <Space size={25} direction='horizontal' align='center'>
    
        <Link to='/'> <Icon component={logoSVG} style={{ fontSize: 110 }} /></Link>
        <Space direction="vertical" className="footerText" align='start'>
        <Link to={{ pathname: `/profile/${sessionContext.user?.username}` }} style={{  color: 'white'}}>Profile Page</Link>
        <Link to='/new-recipe' style={{  color: 'white'}}>Create a Recipe</Link>
        <Link to='/saved-recipes' style={{  color: 'white'}}>Saved Recipes</Link>
        </Space>
        </Space>
      
      </Layout.Footer>
    );

}
export default Footer;