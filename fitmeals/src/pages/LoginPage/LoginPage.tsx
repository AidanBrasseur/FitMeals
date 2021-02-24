import { Button, Layout, Input, Image, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css';

function login (){
    
}

function LoginPage () {

    return (
        <Layout>
            <Layout.Content style={{ height: "100vh" }}>
                <div className="loginDiv"> 
                    <div className="logo">
                        <Image 
                            src="https://cdn.iconscout.com/icon/free/png-256/fast-food-1851561-1569286.png"
                            width="75%"
                            height="75%"
                            preview={ false }
                        ></Image>
                    </div>
                    <div className="loginForm">
                        <Typography.Title style={{ fontSize: 36 }}>Welcome to <span className="name">FitMeals</span></Typography.Title>
                        <Typography.Title style={{ fontSize: 60, color: "#032D23" }}>Login</Typography.Title>
                        <div className="mainLoginForm">
                            <Input size="large" style={{ marginTop: 20, marginBottom: 10, padding: 10, borderRadius: 8, borderColor: "#032D23" }} placeholder="Email"></Input>
                            <Input size="large" style={{ marginBottom: 5, padding: 10, borderRadius: 8, borderColor: "#032D23" }} placeholder="Password"></Input>
                            <Button type="link" style={{ color: "#032D23", fontSize: 15, padding: 0, float: "right" }}>Forget Password?</Button>
                            <Button 
                                type="primary" 
                                style={{ marginTop: 25, marginBottom: 20, width: "100%", fontSize: 18, height: 50, borderRadius: 8, backgroundColor: "#032D23", border: 0 }}
                                onClick={() => { login() }}
                            >Login</Button>
                            <div className="registerButton">
                                Don't have an account?<Link to="/register" style={{ color: "#AAA713", marginLeft: 3, padding: 0 }}>Get Started</Link>
                            </div>
                        </div>
                    </div>
                    <div className="TaCDiv">
                        <Button type="link" style={{ color: "#032D23", fontSize: 15 }}>Terms and Conditions</Button>
                    </div>
                </div> 
                <div className="imageDiv">
                    <Image 
                        src="https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"
                        height="100%"
                        width="100%"
                    ></Image>
                </div>              
            </Layout.Content>         
        </Layout>       
    );

}
export default LoginPage;