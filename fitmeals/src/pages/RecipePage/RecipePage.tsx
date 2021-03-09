import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Row, Select, Upload } from 'antd';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ImgCrop from 'antd-img-crop';
import './styles.css';
import { Rate, Image, Space, Typography, Tag, Divider, Steps, List, Checkbox } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { PieChart } from 'react-minimal-pie-chart';
import { useLocation } from 'react-router-dom';
import { Recipe } from '../../types';
interface stateType {
    recipe: Recipe
}

const { Text, Title } = Typography;
const { Step } = Steps;
function RecipePage() {
    const { TextArea } = Input;
    const { Dragger } = Upload;
    const { state } = useLocation<stateType>();
    const recipe = state.recipe;
    const { image, title, categories, ingredients, instructions, description } = recipe;
    const { Option } = Select;
    const rating = 4.5;



    // const description = "There's no healthier, easier, or faster summer entree than a perfect piece of grilled salmon. This 15-minute recipe is a staple in our regular dinner routine, and I'm so excited to share my tips with you today! Aside from pizza and spaghetti, I'd say that this particular grilled salmon recipe is one of the meals that I prepare most frequently for my family. It's my easy go-to when I feel like we need something nutritious, but I don't want to spend much time in the kitchen. Every boy in my house will clean his plate -- no questions asked -- which is certainly not always the case with other dinners that I serve. Any mom that's trying to please a family of 5 opinionated eaters can understand that it's a true GEM when you find a healthy recipe that appeals to the whole crew!"

    const macros = {
        protein: 50,
        carbs: 80,
        fats: 35
    }
    // const image = "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"
    // const title = "Grilled Salmon";
    // const categories = ["Fish", "Salmon", "Grilled"];
    // const ingredients = [
    //     {
    //         name: "Salmon Fillets",
    //         quantity: 2,
    //         unit: ""
    //     },
    //     {
    //         name: "Garlic Cloves",
    //         quantity: 2,
    //         unit: ""
    //     },
    //     {
    //         name: "Lemon",
    //         quantity: 1,
    //         unit: ""
    //     },
    //     {
    //         name: "Butter",
    //         quantity: 2,
    //         unit: "Cups"
    //     },
    //     {
    //         name: "Butter",
    //         quantity: 2,
    //         unit: "Cups"
    //     },
    //     {
    //         name: "Butter",
    //         quantity: 2,
    //         unit: "Cups"
    //     },
    //     {
    //         name: "Butter",
    //         quantity: 2,
    //         unit: "Cups"
    //     },
    //     {
    //         name: "Butter",
    //         quantity: 2,
    //         unit: "Cups"
    //     },
    //     {
    //         name: "Butter",
    //         quantity: 2,
    //         unit: "Cups"
    //     }
    // ]
    // const instructions = [
    //     "Take the salmon out",
    //     "Cook it with garlic and lemon",
    //     "Now you have Salmon"
    // ]


    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    return (
        <Layout>
            <Header />
            <Layout.Content className="site-layout" style={{ marginTop: 64, backgroundColor: "#032D23" }}>
                <div className="recipePage" >

                    <Space direction="vertical" size={"large"} style={{ width: '100%' }} align='center'>
                        <Row align='middle' justify='space-between' style={{ width: '55vw', maxWidth: 1000 }}>

                            <Col >
                                <Row align="middle">
                                    <Col >
                                        <Title style={{ fontSize: 48, fontWeight: "bold", marginBottom: 0 }}>{title}</Title>
                                    </Col>

                                </Row>
                                <Row style={{ height: 70 }} align="middle" >
                                    <Col style={{ marginRight: 10 }}>
                                        <div className="recipePageProfilePic">
                                            <Image style={{ borderRadius: "50%" }} src='https://www.biography.com/.image/t_share/MTE4MDAzNDEwNDQwMjU5MDg2/rowan-atkinson-9191636-1-402.jpg' />
                                        </div>
                                    </Col>
                                    <Col style={{ marginRight: 25 }}>
                                        <Text className="recipeDescription" style={{ fontSize: 20 }} type="secondary">Mr. Beans</Text>
                                    </Col>
                                    <Col style={{ marginRight: 10 }}>
                                      
                                        <div className='recipeRatingDiv'>
                                            <Row style={{ paddingLeft: 3, paddingRight: 3 }} justify='space-around' align='middle'>
                                                <StarOutlined style={{ color: 'white', fontSize: 15 }} />
                                                <div style={{ color: 'white' }}>{rating}</div>
                                            </Row>
                                        </div>
                                    </Col>

                                    <Col >

                                        <Rate defaultValue={0} />

                                    </Col>


                                </Row>
                            </Col>
                            <Col className="recipeCats" >
                                {/* <EditableTagGroup></EditableTagGroup> */}
                                {categories.map((cat, index) =>
                                    <Tag key={cat} style={{ paddingLeft: 20, paddingRight: 20 }} color="#109D7C">
                                        {cat}
                                    </Tag>
                                )}


                            </Col>

                        </Row>
                        <Row align="middle" style={{ width: '55vw', maxWidth: 1000 }}>
                            <Col  >
                                <Text className="recipeDescription" style={{ fontSize: 20 }} type="secondary">{description}</Text>
                            </Col>
                        </Row>





                        <Row>
                            <Col span={24}>
                                <div className='imagePicker'>
                                    <div className="recipeImage">
                                        <Image
                                            height={'27vw'}
                                            width={'55vw'}
                                            src={image}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row align='middle' justify='start' style={{ width: '55vw', maxWidth: 1000 }}>
                            <Col >
                                <h1 className="subtitle">Ingredients</h1>
                            </Col>

                        </Row>

                        <Row justify='space-between' style={{ width: '55vw', maxWidth: 1000 }}>
                            <Col offset={1} span={11} style={{ marginBottom: 15 }}>

                                {ingredients.map((item, index) =>
                                    <Row key={index} style={{ marginBottom: 10 }}>
                                        <Checkbox>
                                            <Text style={{ fontSize: 20 }}>{`${item.quantity} ${item.unit} ${item.name}`}</Text>
                                        </Checkbox>
                                    </Row>

                                )}
                            </Col>
                            <Col span={8} className="pieChart">
                                <Row>
                                    <PieChart
                                        data={[

                                            { title: 'Protein', value: macros.protein * 4, color: '#ACB9FF' },
                                            { title: 'Carbs', value: macros.carbs * 4, color: '#2121B0' },
                                            { title: 'Fats', value: macros.fats * 9, color: '#27AE60' },
                                        ]}
                                        label={(labelRenderProps) =>
                                            `${labelRenderProps.dataEntry.value}`}
                                        labelStyle={{ fontSize: 8, fill: 'white' }}
                                        labelPosition={70}
                                        lineWidth={50}
                                    // segmentsShift={5}
                                    />
                                </Row>
                                <Row justify='space-between' style={{ marginTop: 30 }}>
                                    <Col span={6}>
                                        <div style={{ backgroundColor: "#ACB9FF", width: 10, height: 10, borderRadius: "50%", marginBottom: 5 }}></div>
                                        <Text>{macros.protein * 4} calories from Protein</Text>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ backgroundColor: "#2121B0", width: 10, height: 10, borderRadius: "50%", marginBottom: 5 }}></div>
                                        <Text>{macros.carbs * 4} calories from Carbs</Text>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ backgroundColor: "#27AE60", width: 10, height: 10, borderRadius: "50%", marginBottom: 5 }}></div>
                                        <Text>{macros.fats * 9} calories from Fats</Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>




                        <Row align='middle' justify='start' style={{ width: '55vw', maxWidth: 1000 }}>
                            <Col >
                                <h1 className="subtitle">Instructions</h1>
                            </Col>

                        </Row>

                        <Row justify='space-between' style={{ width: '55vw', maxWidth: 1000 }}>
                            <Col offset={1} span={24}>
                                <Steps direction="vertical">
                                    {instructions.map((instruction, index) =>
                                        <Step key={index}  title={`Step ${index + 1}`} status="process" description={instruction} />
                                    )}

                                </Steps>
                            </Col>
                            <Col span={10}>

                            </Col>
                        </Row>
                    </Space>
                </div>
            </Layout.Content>
        </Layout>
    );

}
export default RecipePage;