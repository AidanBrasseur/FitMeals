import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Row, Select, Upload } from 'antd';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ImgCrop from 'antd-img-crop';
import './styles.css';
import { Rate, Image, Space, Typography, Tag, Divider, Steps, List, Checkbox } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { PieChart } from 'react-minimal-pie-chart';


const { Text, Title } = Typography;
const { Step } = Steps;
function RecipePage() {
    const { TextArea } = Input;
    const { Dragger } = Upload;
    const { Option } = Select;
    const rating = 4.5;



    const description = "There's no healthier, easier, or faster summer entree than a perfect piece of grilled salmon. This 15-minute recipe is a staple in our regular dinner routine, and I'm so excited to share my tips with you today! Aside from pizza and spaghetti, I'd say that this particular grilled salmon recipe is one of the meals that I prepare most frequently for my family. It's my easy go-to when I feel like we need something nutritious, but I don't want to spend much time in the kitchen. Every boy in my house will clean his plate -- no questions asked -- which is certainly not always the case with other dinners that I serve. Any mom that's trying to please a family of 5 opinionated eaters can understand that it's a true GEM when you find a healthy recipe that appeals to the whole crew!"

    const macros = {
        protein: 50,
        carbs: 80,
        fats: 35
    }
    const image = "https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"
    const title = "Grilled Salmon";
    const categories = ["Fish", "Salmon", "Grilled"];
    const ingredients = [
        {
            name: "Salmon Fillets",
            quantity: 2,
            unit: ""
        },
        {
            name: "Garlic Cloves",
            quantity: 2,
            unit: ""
        },
        {
            name: "Lemon",
            quantity: 1,
            unit: ""
        },
        {
            name: "Butter",
            quantity: 2,
            unit: "Cups"
        },
        {
            name: "Butter",
            quantity: 2,
            unit: "Cups"
        },
        {
            name: "Butter",
            quantity: 2,
            unit: "Cups"
        },
        {
            name: "Butter",
            quantity: 2,
            unit: "Cups"
        },
        {
            name: "Butter",
            quantity: 2,
            unit: "Cups"
        },
        {
            name: "Butter",
            quantity: 2,
            unit: "Cups"
        }
    ]
    const instructions = [
        "Take the salmon out",
        "Cook it with garlic and lemon",
        "Now you have Salmon"
    ]


    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    return (
        <Layout>
            <Header />
            <Layout.Content className="site-layout" style={{ marginTop: 64, backgroundColor: "#032D23" }}>
                <div className="recipePage">
                    <Form onFinish={onFinish}>
                        <Space direction="vertical" size={"large"}>
                            <Row align='middle'>

                                <Col offset={3} span={13}>
                                    <Row align="middle">
                                        <Col span={12}>
                                            <Title style={{ fontSize: 48, fontWeight: "bold", marginBottom: 0 }}>{title}</Title>
                                        </Col>

                                    </Row>
                                    <Row style={{ height: 70 }} align="middle" >
                                    <Col  style={{marginRight: 10}}>
                                                <div className="recipePageProfilePic">
                                                    <Image style={{ borderRadius: "50%" }} src='https://www.biography.com/.image/t_share/MTE4MDAzNDEwNDQwMjU5MDg2/rowan-atkinson-9191636-1-402.jpg' />
                                                </div>
                                            </Col>
                                            <Col style={{marginRight: 25}}>
                                                <Text className="recipeDescription" style={{ fontSize: 20 }} type="secondary">Mr. Beans</Text>
                                            </Col>
                                        <Col style={{marginRight: 10}}>
                                            {/* <div className='rating'>
                                            <Row style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 3, paddingRight: 3 }} justify='space-around' align='middle'>
                                                <StarOutlined style={{ color: 'white', fontSize: 15 }} />
                                                <div style={{ color: 'white' }}>4.5</div>
                                            </Row>
                                        </div> */}
                                            <div className="recipeRatingDiv" >
                                                <StarOutlined style={{ color: 'white', fontSize: 15 }} />
                                                <text style={{ marginLeft: 5 }}>{rating}</text>
                                            </div>
                                        </Col>

                                        <Col >
                                            
                                            <Rate defaultValue={0} />

                                        </Col>


                                    </Row>
                                </Col>
                                <Col span={6} className="recipeCats" >
                                    {/* <EditableTagGroup></EditableTagGroup> */}
                                    {categories.map((cat, index) =>
                                        <Tag style={{ paddingLeft: 20, paddingRight: 20 }} color="#109D7C">
                                            {cat}
                                        </Tag>
                                    )}


                                </Col>
                            </Row>



                            <Row align="middle">
                                <Text className="recipeDescription" style={{ fontSize: 20 }} type="secondary">{description}</Text>
                            </Row>
                            <Row>
                                <Col span={24}>

                                    <div className="imagePicker">
                                        {/* <ImgCrop quality={1} aspect={70 / 30} rotate>
                                        <Dragger beforeUpload={file => {
                                            setImage(URL.createObjectURL(file))


                                            // Prevent upload
                                            return false;
                                        }} style={{ minWidth: "75vw" }} multiple={false} showUploadList={false}>
                                            {image ? <img className='uploadImagePreview' src={image} /> :
                                                <div>
                                                    <div className="imagePickerIcon">
                                                        <UploadOutlined />
                                                    </div>
                                                    <p className="uploadTitle">Upload a picture of your recipe!</p>
                                                    <p>Click or drag an image to this area to upload</p>
                                                </div>}
                                        </Dragger>
                                    </ImgCrop> */}
                                        <Image className="recipeImage"
                                            height={450}
                                            width={1000}
                                            src={image}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Space>
                        <Row>
                            <Col offset={3}>
                                <h1 className="subtitle">Ingredients</h1>
                            </Col>

                        </Row>

                        {/* <Form.List name="ingredients">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(field => (
                                        <Form.Item
                                            required={false}
                                            key={field.key}
                                        >
                                            <Row>
                                                <Col span={6}>
                                                    <Form.Item {...field} name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']}>
                                                        <Input placeholder="Name of Ingredient"></Input>
                                                    </Form.Item>
                                                </Col>
                                                <Col style={{ marginLeft: 10 }} span={3}>
                                                    <Form.Item {...field} name={[field.name, 'amount']} fieldKey={[field.fieldKey, 'amount']}>
                                                        <Input placeholder="Quantity"></Input>
                                                    </Form.Item>
                                                </Col>
                                                <Col style={{ marginLeft: 10 }} span={3}>
                                                    <Form.Item {...field} name={[field.name, 'unit']} fieldKey={[field.fieldKey, 'unit']}>
                                                        <Select placeholder="Unit">
                                                            <Option value="g">g</Option>
                                                            <Option value="kg">kg</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{ width: "50%", height: "100%", fontSize: 20 }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add Ingredient
                    </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List> */}
                        <Row>
                            <Col offset={4} span={11} style={{ marginBottom: 15 }}>
                                {/* <List
                                    size="large"
                                    bordered
                                    dataSource={ingredients}
                                    renderItem={item => <List.Item>{`${item.name} .......... ${item.quantity} ${item.unit}`}</List.Item>}
                                /> */}
                                {ingredients.map((item, index) =>
                                    <Row style={{ marginBottom: 10 }}>
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
                                <Row style={{ marginTop: 30 }}>
                                    <Col span={5}>
                                        <div style={{ backgroundColor: "#ACB9FF", width: 10, height: 10, borderRadius: "50%", marginBottom: 5 }}></div>
                                        <Text>{macros.protein * 4} calories from Protein</Text>
                                    </Col>
                                    <Col span={5}>
                                        <div style={{ backgroundColor: "#2121B0", width: 10, height: 10, borderRadius: "50%", marginBottom: 5 }}></div>
                                        <Text>{macros.carbs * 4} calories from Carbs</Text>
                                    </Col>
                                    <Col span={5}>
                                        <div style={{ backgroundColor: "#27AE60", width: 10, height: 10, borderRadius: "50%", marginBottom: 5 }}></div>
                                        <Text>{macros.fats * 9} calories from Fats</Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>




                        <Row>
                            <Col offset={3}>
                                <h1 className="subtitle">Instruction</h1>
                            </Col>

                        </Row>
                        {/* <Form.List name="instructions">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item {...field}>
                                                <Row style={{ paddingBottom: 30 }}>
                                                    <Col style={{ display: "flex", justifyContent: "center" }} span={2}>
                                                        <Avatar>1</Avatar>
                                                    </Col>
                                                    <Col span={12}>
                                                        <TextArea placeholder="Enter your instruction" rows={4} bordered={false} style={{ fontSize: 16 }}></TextArea>
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{ width: "50%", height: "100%", fontSize: 20 }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add Step
                    </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List> */}
                        <Row>
                            <Col offset={4} span={14}>
                                <Steps direction="vertical">
                                    {instructions.map((instruction, index) =>
                                        <Step title={`Step ${index + 1}`} status="process" description={instruction} />
                                    )}

                                </Steps>
                            </Col>
                            <Col span={10}>

                            </Col>
                        </Row>


                        <Form.Item>
                            <div className="submitDiv">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    style={{ width: "30%", height: "100%", fontWeight: "bold", fontSize: 26 }}>
                                    Submit Recipe
                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Layout.Content>
        </Layout>
    );

}
export default RecipePage;