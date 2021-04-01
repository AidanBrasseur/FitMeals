import Icon, { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Carousel, Checkbox, Form, Image, Input, Layout, Typography } from 'antd';
import React, { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { ReactComponent as logoSVG } from '../../assets/logo.svg';
import { useSessionContext } from '../../contexts/SessionContext';
import { User } from '../../types';
import './styles.css';


function LoginPage() {
    const [sessionContext, updateSessionContext] = useSessionContext();
    const { state }: any = useLocation();
    const { from } = state || { from: { pathname: "/" } };
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    function login(values: any) {
        console.log(values)
        if (values.email === "user@user.com" && values.password === "user"){
            let user = {name: 'User', email: values.email, authToken: '7a85121b-f8de-4b6e-89b4-e943e0783272', isAdmin: false, username: 'user', image: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"} as User
            updateSessionContext({ ...sessionContext, user});
            setRedirectToReferrer(true);
        } 
        else if (values.email === "admin@admin.com" && values.password === "admin"){
            let user = {name: 'Admin', email: values.email, authToken: 'test_token', isAdmin: true, username: 'admin', image: "https://i.pinimg.com/736x/3f/99/cc/3f99cc2a119992eff72412875e847a74.jpg"} as User
            updateSessionContext({ ...sessionContext, user});
            setRedirectToReferrer(true);
        }
        
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
                        <Typography.Title style={{ fontSize: 36 }}>Welcome to <span className="fitMealsName">FitMeals</span></Typography.Title>
                        <Typography.Title style={{ fontSize: 60, color: "#032D23" }}>Login</Typography.Title>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={login}
                        >
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
                                <Button type="primary" htmlType="submit">Login</Button>
                                <div className="registerButton">
                                    Don't have an account?<Link to="/register" className='login-form-get-started'>Get Started</Link>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <div className='imageLoginDiv'>
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