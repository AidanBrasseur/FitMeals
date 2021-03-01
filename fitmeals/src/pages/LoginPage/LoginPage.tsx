import Icon, { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Carousel, Checkbox, Form, Image, Input, Layout, Typography } from 'antd';
import React, { useState } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as logoSVG } from '../../assets/logo.svg';
import { useSessionContext } from '../../contexts/SessionContext';
import './styles.css';


function LoginPage() {
    const [sessionContext, updateSessionContext] = useSessionContext();
    const { state }: any = useLocation();
    const { from } = state || { from: { pathname: "/" } };
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    function login() {
        setRedirectToReferrer(true);
        updateSessionContext({ ...sessionContext, isAuthenticated: true, isAdmin: true });
    }
    if (redirectToReferrer) {
        return <Redirect to={from} />;
    }
    return (
        <Layout>
            <Layout.Content style={{ height: '100vh' }}>
                <div className='logo'>
                    <Icon component={logoSVG} style={{ fontSize: 125 }} />
                </div>
                <div className='loginDiv'>
                    <div className='loginInputsDiv'>
                        <Typography.Title style={{ fontSize: 36 }}>Welcome to <span className="name">FitMeals</span></Typography.Title>
                        <Typography.Title style={{ fontSize: 60, color: "#032D23" }}>Login</Typography.Title>
                        <Form
                            name="normal_login"
                            className="login-form"

                            initialValues={{ remember: true }}
                            onFinish={() => console.log('finished')}>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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

                                <a className="login-form-forgot" href="">
                                    Forgot password?</a>
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" onClick={login}>Login</Button>
                                <div className="registerButton">
                                    Don't have an account?<Link to="/register" style={{ marginLeft: 3, padding: 0 }}>Get Started</Link>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <div className='imageDiv'>
                    <Carousel swipeToSlide draggable adaptiveHeight={false} variableWidth={false} >

                        <Image
                            src="https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"
                            preview={false}
                            style={{ objectFit: 'cover' }}

                        ></Image>


                        <Image
                            src="https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"
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