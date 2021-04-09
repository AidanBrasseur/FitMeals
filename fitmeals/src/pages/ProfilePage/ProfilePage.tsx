import { UserOutlined, StarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Row, Select, Typography, Upload, Image, message } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import Feed from '../../components/Feed/Feed';
import Header from '../../components/Header/Header';
import { useSessionContext } from '../../contexts/SessionContext';
import { HOST } from '../../config';

import './styles.css';
import Footer from '../../components/Footer/Footer';

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
  const [userId, setUserId] = useState<string | undefined>();
  const { from } = state || { from: { pathname: "/" } };;

  const currentHistory = useHistory();

  // Ban user
  const banUser = () => {
    axios.post(HOST + "admin/ban", {
      "username": username,
    }, {
      headers: {
        authorization: sessionContext.user?.authToken
      }
    }).then(response => {
      message.success("User successfully banned.");
    }).catch((error) => {
      message.error("Sorry, FitMeals was unable to process your request. Please try again.");
    })
  }
  
  // Promote user
  const promoteUser = () => {
    axios.post(HOST + "admin/promote", {
      "username": username,
    }, {
      headers: {
        authorization: sessionContext.user?.authToken
      }
    }).then(response => {
      message.success("User successfully promoted.");
    }).catch((error) => {
      message.error("Sorry, FitMeals was unable to process your request. Please try again.");
    })
  }

  // Getting the user info for the profile
  const fetchUserInfo = () => {
    axios.get(HOST + 'users/' + username).then(response => {
      let res = response.data.user;
    
      setFullname(res.fullname);
      setRating(res.rating);
      setProfilePic(res.image);
      setUserId(res.id)
    }).catch((error) => {
      if (error.response.status == 404) {
        currentHistory.push("/");
      } else {
        alert("Sorry, FitMeals was unable to process your request. Please try again.")
        currentHistory.push("/");
      }
    });
  }

  useEffect(() => {
    fetchUserInfo();
  }, [username]);

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header setSearchQuery={setSearchQuery}/>
      <Layout.Content>
        <div className='profile'>
        <div className="goBackIconProfileContainer">
        <ArrowLeftOutlined onClick={() => currentHistory.goBack()} className="goBackIconProfile"></ArrowLeftOutlined>
        </div>
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
                      <div style={{ color: 'white' }}>Average rating of {rating ? Math.round((Number(rating) + Number.EPSILON) * 100) / 100 : 0}</div>
                    </Row>
                  </div>
                  <div className="adminButtons">                   
                    {sessionContext["user"]?.isAdmin && state &&
                      <div className="promoteButton">
                        <Button size="middle" onClick={promoteUser}>Promote User</Button>
                      </div>
                    }
                    {sessionContext["user"]?.isAdmin && state &&
                      <div className="banButton">
                        <Button size="middle" onClick={banUser}>Ban User</Button>
                      </div>
                    }
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          {userId && <Feed key={userId} title={"Recent Recipes"} userId={userId} searchQuery={searchQuery}></Feed>}
        </div>
      </Layout.Content>
      <Footer></Footer>
    </Layout>
  );

}
export default ProfilePage;