import { Button, Layout, Input, Image, Typography, Checkbox, Carousel, Form } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom'
import { useSessionContext } from '../../contexts/SessionContext';
import { User } from '../../types';
import axios from 'axios';
import { HOST } from '../../config';
import './styles.css';

function RegisterPage() {

    const [sessionContext, updateSessionContext] = useSessionContext();

    function register(values: any) {
        // Sending a register request to the server
        axios.post(HOST + "auth/register", {
            "fullname": values.fullname,
            "email": values.email
        }, {
            headers: {
                authorization: btoa(values.username + ":" + values.password)
            }
        }).then(response => {
            alert("You have successfully registered!");
        }).catch((error) => {
            if (error.response.status == 409) {
                alert("That username or email is already in use");
            } else {
                alert("Sorry, FitMeals was unable to process your login request. Please try again.")
            }
        })
    }

    return (
        <Layout>
            <Layout.Content style={{ height: "100vh" }}>
                <div className="registerDiv">
                    <div className="backButton">
                        <Link to="/login" style={{ color: "black", fontSize: 17 }}>&lt; Back</Link>
                    </div>
                    <div className="registerForm">
                        <Typography.Title style={{ fontSize: 30, marginBottom: 50 }}>Register your FitMeals Account!</Typography.Title>
                        <div className="mainRegisterForm">
                            <Form
                                name="register"
                                className="register-form"
                                onFinish={register}
                            >
                                <div className="inputTitle">Your Full Name</div>
                                <Form.Item name="fullname" rules={[{ required: true, message: 'Please input your full name!' }]}>
                                    <Input size="large" style={{ marginBottom: 10, marginTop: 5, padding: 10, borderRadius: 8, borderColor: "#032D23" }} placeholder="Enter Name"></Input>
                                </Form.Item>
                                <div className="inputTitle">Username</div>
                                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                                    <Input size="large" style={{ marginBottom: 10, marginTop: 5, padding: 10, borderRadius: 8, borderColor: "#032D23" }} placeholder="Enter Username"></Input>
                                </Form.Item>
                                <div className="inputTitle">Email</div>
                                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                    <Input size="large" style={{ marginBottom: 10, marginTop: 5, padding: 10, borderRadius: 8, borderColor: "#032D23" }} placeholder="Enter Email"></Input>
                                </Form.Item>
                                <div className="inputTitle">Password</div>
                                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                    <Input.Password size="large" style={{ marginBottom: 20, marginTop: 5, padding: 10, borderRadius: 8, borderColor: "#032D23" }} placeholder="Enter Password"></Input.Password>
                                </Form.Item>
                                <Form.Item name="toc">
                                    <Checkbox>I agree to the Terms and Conditions</Checkbox>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ marginTop: 50, marginBottom: 20, width: "100%", fontSize: 18, height: 50 }}
                                    >Register</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div className="TaCDiv">
                        <Button type="link" style={{ color: "#032D23", fontSize: 15 }}>Terms and Conditions</Button>
                    </div>
                </div>
                <div className='imageRegisterDiv'>
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

export default RegisterPage;