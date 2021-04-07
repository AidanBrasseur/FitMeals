import Icon, { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Carousel, Checkbox, Form, Image, Input, InputNumber, Layout, Modal, Space, Typography } from 'antd';
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
    const [emailSent, setEmailSent] = useState(false);
    const [forgotUsername, setForgotUsername] = useState("");
    const [digits, setDigits] = useState([0,0,0,0])
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
                image: res.image.url
            } as User;
            updateSessionContext({ ...sessionContext, user});         
            if(values.remember){
                localStorage.setItem('authToken', res.authToken);
            }
            setRedirectToReferrer(true);
        }).catch((error) => {
            if (error.response.status == 404) {
                alert("Invalid username or password");
            } else {
                alert("Sorry, FitMeals was unable to process your login request. Please try again.")
            }
        });       
    }
    if (redirectToReferrer) {
        return <Redirect to={from} />;
    }
    const sendForgotEmail= () => {
        setEmailSent(true);
        console.log(forgotUsername)
    }
    const confirmCode = () => {
        console.log(digits)
    }
    return (
        <Layout>
            <Layout.Content style={{ height: '100vh' }}>
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
                            <Space direction='vertical' style={{width: '100%'}} >
                        <Input placeholder="Input your username" prefix={<UserOutlined />} onChange={(event) => setForgotUsername(event.target.value)}/>
                        <Button style={{width: '100%'}} onClick={sendForgotEmail}>Send Email</Button>
                        {emailSent && <div><p>Enter the 4 digit code sent to your email</p>
                        <Space direction='horizontal' style={{width: '100%', alignItems: 'center', alignContent: 'center', alignSelf: 'center', justifyContent: 'center'}}>
                        <InputNumber min={0} max={9} defaultValue={0}  onChange={(value : any) => {
                            let newDigits = [...digits]
                            newDigits[0] = value
                            setDigits(newDigits)
                        }}/>
                         <InputNumber min={0} max={9} defaultValue={0}  onChange={(value : any) => {
                            let newDigits = [...digits]
                            newDigits[1] = value
                            setDigits(newDigits)
                        }}/>
                        <InputNumber min={0} max={9} defaultValue={0}  onChange={(value : any) => {
                            let newDigits = [...digits]
                            newDigits[2] = value
                            setDigits(newDigits)
                        }}/>
                         <InputNumber min={0} max={9} defaultValue={0}  onChange={(value : any) => {
                            let newDigits = [...digits]
                            newDigits[3] = value
                            setDigits(newDigits)
                        }}/>
                        </Space>
                        <Button style={{width: '100%', marginTop: '10px'}} onClick={confirmCode}>Confirm code</Button>
                        </div>}
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