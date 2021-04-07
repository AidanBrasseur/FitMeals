import { UserOutlined, StarOutlined, LockOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Row, Select, Typography, Upload, Image, Modal } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Feed from '../../components/Feed/Feed';
import Header from '../../components/Header/Header';
import { useSessionContext } from '../../contexts/SessionContext';
import { HOST } from '../../config';
import { User } from '../../types';

import './styles.css';
import Footer from '../../components/Footer/Footer';

function AccountSettingsPage() {
  const { TextArea } = Input;
  const [searchQuery, setSearchQuery] = useState<string | undefined>()
  const [sessionContext, updateSessionContext] = useSessionContext();
  const { state }: any = useLocation();

  // Edit modals
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  // Call the change full name API
  const changeName = (values: any) => {
    axios.patch(HOST + 'users/' + sessionContext.user?.username, {
      fullname: values.fullname
    }, {
      headers: {
        authorization: sessionContext.user?.authToken
      }
    }).then(response => {
      let user = {
        id: sessionContext.user?.id,
        name: values.fullname,
        email: sessionContext.user?.email,
        authToken: sessionContext.user?.authToken,
        username: sessionContext.user?.username,
        isAdmin: sessionContext.user?.isAdmin,
        image: sessionContext.user?.image
      } as User;
      updateSessionContext({ ...sessionContext, user });
      setIsNameModalVisible(false);      
      alert("Full name successfully changed!");
    }).catch((error) => {
      if (error.response.status == 404) {
        alert("User not found");
      } else {
        alert("Sorry, FitMeals was unable to process your request. Please try again.")
      }
    });
  }

  // Call the change email API
  const changeEmail = (values: any) => {
    axios.patch(HOST + 'users/' + sessionContext.user?.username, {
      email: values.email
    }, {
      headers: {
        authorization: sessionContext.user?.authToken
      }
    }).then(response => {
      let user = {
        id: sessionContext.user?.id,
        name: sessionContext.user?.name,
        email: values.email,
        authToken: sessionContext.user?.authToken,
        username: sessionContext.user?.username,
        isAdmin: sessionContext.user?.isAdmin,
        image: sessionContext.user?.image
      } as User;
      updateSessionContext({ ...sessionContext, user });
      setIsEmailModalVisible(false);      
      alert("Email successfully changed!");
    }).catch((error) => {
      if (error.response.status == 404) {
        alert("User not found");
      } else {
        alert("Sorry, FitMeals was unable to process your request. Please try again.")
      }
    });
  }

  // Call the change password API
  const changePassword = (values: any) => {
    axios.patch(HOST + "auth/change-password", null, {
      headers: {
        authorization: btoa(sessionContext.user?.authToken + ":" + values.oldPassword + ":" + values.newPassword)
      }
    }).then(response => {
      setIsPasswordModalVisible(false);
      alert("Password successfully changed!");
    }).catch((error) => {
      if (error.response.status == 404) {
        alert("Incorrect password, please try again.");
      } else {
        alert("Sorry, FitMeals was unable to process your request. Please try again.")
      }
    });
  }

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header setSearchQuery={setSearchQuery} />
      <Layout.Content>
        <Modal
          title="Change Full Name"
          visible={isNameModalVisible}
          onCancel={() => { setIsNameModalVisible(false) }}
          footer={[
            <Button key="cancel" onClick={() => {setIsNameModalVisible(false)}}>
              Cancel
            </Button>,
            <Button form="usernameForm" key="submit" htmlType="submit">
              Submit
            </Button>
          ]}
        >
          <Form name="usernameForm" onFinish={changeName}>
            <Form.Item
              label="New Name"
              name="fullname"
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Change Email"
          visible={isEmailModalVisible}
          onCancel={() => { setIsEmailModalVisible(false) }}
          footer={[
            <Button key="cancel" onClick={() => {setIsEmailModalVisible(false)}}>
              Cancel
            </Button>,
            <Button form="emailForm" key="submit" htmlType="submit">
              Submit
            </Button>
          ]}
        >
          <Form name="emailForm" onFinish={changeEmail}>
            <Form.Item
              label="New Email"
              name="email"
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Change Password"
          visible={isPasswordModalVisible}
          onCancel={() => { setIsPasswordModalVisible(false) }}
          footer={[
            <Button key="cancel" onClick={() => {setIsPasswordModalVisible(false)}}>
              Cancel
            </Button>,
            <Button form="passwordForm" key="submit" htmlType="submit">
              Submit
            </Button>
          ]}
        >
          <Form name="passwordForm" onFinish={changePassword}>
            <Form.Item
              label="Old Password"
              name="oldPassword"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
        <div className="accountInfoTitle">
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
            <div className="infoSubtitle">Full Name<Button type="link" onClick={() => {setIsNameModalVisible(true)}}><EditOutlined /></Button></div>
            <div className="infoText">{sessionContext.user?.name}</div>
          </div>
          <div className="info">
            <div className="infoSubtitle">Email<Button type="link" onClick={() => {setIsEmailModalVisible(true)}}><EditOutlined /></Button></div>
            <div className="infoText">{sessionContext.user?.email}</div>
          </div>
          <div className="changePassword">
            <Button type="link" onClick={() => {setIsPasswordModalVisible(true)}}><LockOutlined />Change Password</Button>
          </div>
        </div>
      </Layout.Content>
      <Footer></Footer>
    </Layout>
  );

}
export default AccountSettingsPage;