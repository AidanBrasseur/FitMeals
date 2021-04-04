import { UserOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Row, Select, Typography, Upload, Image } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Feed from '../../components/Feed/Feed';
import Header from '../../components/Header/Header';
import { useSessionContext } from '../../contexts/SessionContext';
import { HOST } from '../../config';

import './styles.css';

function ProfilePage() {
  const { TextArea } = Input;
  const [searchQuery, setSearchQuery] = useState<string | undefined>()
  const { Dragger } = Upload;
  const { Option } = Select;
  const [sessionContext, updateSessionContext] = useSessionContext();
  const { state }: any = useLocation();
  const username = window.location.pathname.substring(9, window.location.pathname.length);
  const [fullname, setFullname] = useState<string | undefined>();
  const [rating, setRating] = useState<string | undefined>();
  const [profilePic, setProfilePic] = useState<string | undefined>();
  const { from } = state || { from: { pathname: "/" } };

  // Getting the user info for the profile
  const fetchUserInfo = () => {
    axios.get(HOST + 'users/' + username).then(response => {
      let res = response.data.user;
      setFullname(res.fullname);
      setRating(res.rating);
      setProfilePic(res.image);
    }).catch((error) => {
      if (error.response.status == 404) {
        alert("User not found");
        return <Redirect to={from} />;
    } else {
        alert("Sorry, FitMeals was unable to process your request. Please try again.")
    }
    });
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header setSearchQuery={setSearchQuery}/>
      <Layout.Content>
        <div className='profile'>
          <div className='banner'>
            <Row className="userInfoRow" align='middle'>
              <Col span={8} >
                <Image className="profilePic" width={'22vw'} height={'22vw'} preview={false} src={profilePic} />
              </Col>
              <Col span={16}>
                <div className="profileInfo">
                  <p className="name">{fullname}</p>
                  <p className="username">{username}</p>
                  <div className="userRating">
                    <Row style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }} justify='space-around' align='middle'>
                      <StarOutlined style={{ color: 'white', fontSize: 20 }} />
                      <div style={{ color: 'white' }}>Average rating of {rating}</div>
                    </Row>
                  </div>
                  { sessionContext["user"]?.isAdmin && state &&
                    <div className="banButton">
                      <Button size="middle">Ban User</Button>
                    </div>                   
                  }
                </div>
              </Col>
            </Row>
          </div>
          <Feed title={"Recent Recipes"} userId={sessionContext["user"]?.id} searchQuery={searchQuery}></Feed>
        </div>
      </Layout.Content>
    </Layout>
  );

}
export default ProfilePage;