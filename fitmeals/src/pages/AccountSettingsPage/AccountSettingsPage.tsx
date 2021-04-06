import { UserOutlined, StarOutlined, LockOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Row, Select, Typography, Upload, Image } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Feed from '../../components/Feed/Feed';
import Header from '../../components/Header/Header';
import { useSessionContext } from '../../contexts/SessionContext';
import { HOST } from '../../config';

import './styles.css';
import Footer from '../../components/Footer/Footer';

function AccountSettingsPage() {
  const { TextArea } = Input;
  const [searchQuery, setSearchQuery] = useState<string | undefined>()
  const [sessionContext, updateSessionContext] = useSessionContext();
  const { state }: any = useLocation();

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header setSearchQuery={setSearchQuery}/>
      <Layout.Content>
        <div className="title">
          Account Settings
        </div>
        <div className="allAccountInfo">
        <div className="info">
            <div className="infoSubtitle">Profile Picture<Button type="link"><EditOutlined /></Button></div>
            <div className="profilePicDiv">
              <Image className="profilePic" width={'10vw'} height={'10vw'} preview={false} src={sessionContext.user?.image} />
            </div>
                      
          </div>
          <div className="info">
            <div className="infoSubtitle">Username</div>
            <div className="infoText">{sessionContext.user?.username}</div>           
          </div>
          <div className="info">
            <div className="infoSubtitle">Full Name<Button type="link"><EditOutlined /></Button></div>
            <div className="infoText">{sessionContext.user?.name}</div>           
          </div>
          <div className="info">
            <div className="infoSubtitle">Email<Button type="link"><EditOutlined /></Button></div>
            <div className="infoText">{sessionContext.user?.email}</div>           
          </div>
          <div className="changePassword">
            <Button type="link"><LockOutlined />Change Password</Button> 
          </div>
        </div>
      </Layout.Content>
      <Footer></Footer>
    </Layout>
  );

}
export default AccountSettingsPage;