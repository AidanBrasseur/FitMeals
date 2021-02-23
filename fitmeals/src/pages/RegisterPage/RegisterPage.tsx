import { Button, Layout, Input, Image, Typography, Checkbox } from 'antd';
import React from 'react';
import './styles.css';

function register (){
    
}

function RegisterPage () {

    return (
        <Layout>
            <Layout.Content style={{ height: "100vh" }}>
                <div className="registerDiv"> 
                    <div className="backButton">
                        <Button type="link" style={{ color: "black", fontSize: 15 }}>&lt; Back</Button>
                    </div>
                    <div className="registerForm">
                        <Typography.Title style={{ fontSize: 30, marginBottom: 50 }}>Register your FitMeals Account!</Typography.Title>
                        <div className="mainRegisterForm">
                            <div className="inputTitle">Your Full Name</div>
                            <Input size="large" style={{ marginBottom: 10, padding: 10, borderRadius: 8, borderColor: "#032D23" }} placeholder="Enter Name"></Input>
                            <div className="inputTitle">Username</div>
                            <Input size="large" style={{ marginBottom: 10, padding: 10, borderRadius: 8, borderColor: "#032D23" }} placeholder="Enter Username"></Input>
                            <div className="inputTitle">Email</div>
                            <Input size="large" style={{ marginBottom: 10, padding: 10, borderRadius: 8, borderColor: "#032D23" }} placeholder="Enter Email"></Input>
                            <div className="inputTitle">Password</div>
                            <Input size="large" style={{ marginBottom: 10, padding: 10, borderRadius: 8, borderColor: "#032D23" }} placeholder="Enter Password"></Input>
                            <Checkbox>I agree to the Terms and Conditions</Checkbox>
                            <Button 
                                type="primary" 
                                style={{ marginTop: 50, marginBottom: 20, width: "100%", fontSize: 18, height: 50, borderRadius: 8, backgroundColor: "#AAA713", border: 0 }}
                                onClick={() => { register() }}
                            >Register</Button>
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
export default RegisterPage;