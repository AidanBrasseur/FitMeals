import Icon, { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Carousel, Checkbox, Form, Image, Input, InputNumber, Layout, Modal, Result, Space, Typography } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import bagelHeroImage from '../../assets/images/bagelHeroImage.jpg';
import eggHeroImage from '../../assets/images/eggImage.jpg';
import smoothieHeroImage from '../../assets/images/smoothieHeroImage.jpg';
import { ReactComponent as logoSVG } from '../../assets/svg/logo.svg';
import { HOST } from '../../config';
import { useSessionContext } from '../../contexts/SessionContext';
import { User } from '../../types';
import './styles.css';


function LoginPage() {
    const [sessionContext, updateSessionContext] = useSessionContext();
    const { state }: any = useLocation();
    const { from } = state || { from: { pathname: "/" } };
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [forgotVisible, setForgotVisible] = useState(false);
    const [invalidVisible, setInvalidVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [emailSentVisible, setEmailSentVisible] = useState(false);
    const [forgotUsername, setForgotUsername] = useState("");
    function login(values: any) {
        localStorage.clear()
        // Sending a login request to the server
        axios.post(HOST + 'auth/login', null, {
            headers:{
                authorization: btoa(values.username + ":" + values.password)
            }
        }).then(response => {
            // Creating the user and redirecting to the main page
            let res = response.data.user;
            let user = {
                id: res.id,
                name: res.fullname,
                email: res.email,
                authToken: res.authToken,
                username: res.username,
                isAdmin: res.isAdmin,
                image: res.image?.url
            } as User;
            updateSessionContext({ ...sessionContext, user});         
            if(values.remember){
                localStorage.setItem('authToken', res.authToken);
            }
            setRedirectToReferrer(true);
        }).catch((error) => {
            if (error.response.status == 404) {
                setInvalidVisible(true);
            } else {
                setErrorVisible(true);
            }
        });       
    }
    if (redirectToReferrer) {
        return <Redirect to={from} />;
    }
    const sendForgotEmail= () => {
        // Sending a reset password request to the server
        if (forgotUsername.length > 0) {
            axios.post(HOST + "auth/forgot-password/", {
                username: forgotUsername
            }).then(response => {
                setForgotUsername("");
                setForgotVisible(false);
                setEmailSentVisible(true);
            }).catch((error) => {
                setErrorVisible(true);
            })
            setEmailSent(true);
        }       
    }
    return (
        <Layout>
            <Layout.Content style={{ height: '100vh' }}>
                <Modal
                    visible={invalidVisible}
                    centered
                    onCancel={() => { setInvalidVisible(false) }}
                    footer={ null }
                >
                    <Result
                        status="warning"
                        title="Invalid username or password. Please try again."
                    />
                </Modal>
                <Modal
                    visible={errorVisible}
                    centered
                    onCancel={() => { setErrorVisible(false) }}
                    footer={ null }
                >
                    <Result
                        status="error"
                        title="Sorry, FitMeals was unable to process your request. Please try again."
                    />
                </Modal>
                <Modal
                    visible={emailSentVisible}
                    centered
                    onCancel={() => { setEmailSentVisible(false) }}
                    footer={ null }
                >
                    <Result
                        status="success"
                        title="We've received your reset password request. Please check your email for further instructions."
                    />
                </Modal>
                <div className='logo'>
                    <Icon component={logoSVG} style={{ fontSize: 125 }} />
                </div>
                <div className='loginDiv'>
                    <div className='loginInputsDiv'>
                        <Typography.Title style={{ fontSize: 36 }}>Welcome to <span className="fitMealsName">FitMeals</span></Typography.Title>
                        <Typography.Title style={{ fontSize: 60, color: "#032D23" }}>Login</Typography.Title>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={login}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                
                                <a className="login-form-forgot" onClick={ () => setForgotVisible(true)}>
                                    Forgot password?</a>
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" htmlType="submit">Login</Button>
                                <div className="registerButton">
                                    Don't have an account?<Link to="/register" className='login-form-get-started'>Get Started</Link>
                                </div>
                            </Form.Item>
                        </Form>
                        <Modal
                            title="Forgot Password?"
                            centered
                            visible={forgotVisible}
                            onOk={() => setForgotVisible(false)}
                            onCancel={() => setForgotVisible(false)}
                        >
                            <Space direction='vertical' style={{ width: '100%' }} >
                                <div className="forgotPasswordDiv">
                                    <Input placeholder="Input your username" prefix={<UserOutlined />} onChange={(event) => setForgotUsername(event.target.value)} />
                                    <Button onClick={sendForgotEmail}>Send Email</Button>
                                </div>                                                 
                            </Space>
                        </Modal>
                    </div>
                </div>

                <div className='imageLoginDiv'>
                    <Carousel swipeToSlide draggable  adaptiveHeight={false} variableWidth={false} autoplay autoplaySpeed={4000}>
                        <Image
                            src={eggHeroImage}
                            preview={false}
                            style={{ objectFit: 'cover' }}
                        ></Image>
                         <Image
                            src={smoothieHeroImage}
                            preview={false}
                            style={{ objectFit: 'cover' }}
                        ></Image>
                         <Image
                            src={bagelHeroImage}
                            preview={false}
                            style={{ objectFit: 'cover' }}
                        ></Image>
                    </Carousel>
                </div>
            </Layout.Content>
        </Layout>
    
    );
}
export default LoginPage;