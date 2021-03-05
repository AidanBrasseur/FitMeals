import { UserOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Row, Select, Typography, Upload } from 'antd';
import React from 'react';
import Header from '../../components/Header/Header';
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed'

import './styles.css';

function ProfilePage() {
  const { TextArea } = Input;
  const { Dragger } = Upload;
  const { Option } = Select;

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header />
      <Layout.Content>
        <div className="profile">
          <div className="profilePic"></div>
          <div className="banner"></div>
          <div className="profileInfo">
            <p className="name">Rowan Atkinson</p>
            <p className="username">mrbean55</p>
            <div className="userRating">
              <Row style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }} justify='space-around' align='middle'>
                <StarOutlined style={{ color: 'white', fontSize: 20 }} />
                <div style={{ color: 'white' }}>Average rating of 4.5</div>
              </Row>
            </div>
            <div className="recipes">
              <p className="recipeTitle">Recent Recipes</p>
              <ProfileFeed></ProfileFeed>
            </div>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );

}
export default ProfilePage;