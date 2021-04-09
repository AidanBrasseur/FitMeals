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

function ResetPasswordPage() {

    const [sessionContext, updateSessionContext] = useSessionContext();
    const history = useHistory()
    const [visible, setVisible] = useState(false)
    const token = window.location.pathname.substring(16, window.location.pathname.length);

    function resetPassword(values: any) {
        // Sending a reset password request to the server
        axios.post(HOST + "auth/forgot-password/reset", null, {
            headers: {
                authorization: btoa(token + ":" + values.password)
            }
        }).then(response => {
            alert("Password successfully changed!");
            history.push("/login");
        }).catch((error) => {
            alert("Sorry, FitMeals was unable to process your request. Please try again.")
        })
    }

    return (
        <Layout>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <Layout.Content style={{ height: "100vh" }}>
                <div className="resetPasswordDiv">
                    <div className="resetPasswordForm">
                        <Typography.Title style={{ fontSize: 30, marginBottom: 50 }}>Reset your password</Typography.Title>
                        <div className="mainResetPasswordForm">
                            <Form
                                name="resetPassword"
                                className="reset-password-form"
                                onFinish={resetPassword}
                            >
                                <div className="inputTitle">New Password</div>
                                <Form.Item name="password" rules={[{ required: true, message: 'Please input your new password' }]}>
                                    <Input.Password size="large" style={{ marginBottom: 10, marginTop: 5, padding: 10, borderRadius: 8, borderColor: "#032D23" }} placeholder="Enter New Password"></Input.Password>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ marginTop: 50, marginBottom: 20, width: "100%", fontSize: 18, height: 50 }}
                                    >Reset Password</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
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

export default ResetPasswordPage;