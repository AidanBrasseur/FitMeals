import { Button, Layout, Input, Image, Typography, Checkbox, Carousel, Form, message, Modal, Result } from 'antd';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useSessionContext } from '../../contexts/SessionContext';
import { User } from '../../types';
import axios from 'axios';
import { HOST } from '../../config';
import bagelHeroImage from '../../assets/images/bagelHeroImage.jpg';
import eggHeroImage from '../../assets/images/eggImage.jpg';
import smoothieHeroImage from '../../assets/images/smoothieHeroImage.jpg';
import './styles.css';
import { Helmet } from 'react-helmet';

function RegisterPage() {

    const [sessionContext, updateSessionContext] = useSessionContext();
    const history = useHistory()
    const [visible, setVisible] = useState(false)
    const [invalidCharVisible, setInvalidCharVisible] = useState(false);

    function register(values: any) {
        // Make sure there are no colons
        if (values.username.includes(":") || values.password.includes(":")) {
            setInvalidCharVisible(true);
            return;
        }
        // Sending a register request to the server
        axios.post(HOST + "auth/register", {
            "fullname": values.fullname,
            "email": values.email
        }, {
            headers: {
                authorization: btoa(values.username + ":" + values.password)
            }
        }).then(response => {
            setVisible(true)
        }).catch((error) => {
            if (error.response.status == 409) {
                alert("That username or email is already in use");
            } else {
                alert("Sorry, FitMeals was unable to process your request. Please try again.")
            }
        })
    }

    return (
        <Layout>
            <Helmet>
                <title>FitMeals Registration</title>
            </Helmet>
            <Layout.Content style={{ height: "100vh" }}>
                <Modal
                    visible={invalidCharVisible}
                    centered
                    onCancel={() => { setInvalidCharVisible(false) }}
                    footer={null}
                >
                    <Result
                        status="warning"
                        title="Sorry, your username or password contains a forbidden character (':'). Please try again."
                    />
                </Modal>
                <div className="registerDiv">
                    <Modal
                        visible={visible}
                        onCancel={() => history.push('/login')}
                        footer={null}
                    >
                        <Result
                            status="success"
                            title="You have successfully registered!"
                            extra={[
                                <Button onClick={() => history.push('/login')}>
                                    Go to Login
      </Button>,
                            ]}
                        />

                    </Modal>
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
                                {/* <Form.Item name="toc">
                                    <Checkbox>I agree to the Terms and Conditions</Checkbox>
                                </Form.Item> */}
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
                    {/* <div className="TaCDiv">
                        <Button type="link" style={{ color: "#032D23", fontSize: 15 }}>Terms and Conditions</Button>
                    </div> */}
                </div>
                <div className='imageRegisterDiv'>
                    <Carousel swipeToSlide draggable adaptiveHeight={false} variableWidth={false} autoplay autoplaySpeed={4000}>
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

export default RegisterPage;