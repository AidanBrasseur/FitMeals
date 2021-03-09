import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Row, Select, Upload } from 'antd';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ImgCrop from 'antd-img-crop';
import './styles.css';
import { Rate, Image, Space, Typography, Tag, Divider } from 'antd';
import { StarOutlined } from '@ant-design/icons';


const { Text, Title } = Typography;
function RecipePage() {
    const { TextArea } = Input;
    const { Dragger } = Upload;
    const { Option } = Select;
    const [image, setImage] = useState<string | null>(null);


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

                                <Col span={20}>
                                    <Row align="middle">
                                        <Col span={8}>
                                        <Title style={{ fontSize: 48, fontWeight: "bold", marginBottom: 0 }}>Grilled Salmon</Title>
                                        </Col>
                                        <Col span={10}>
                                            <div className="recipePageProfilePic">
                                                <Image style={{borderRadius: "50%"}} src='https://www.biography.com/.image/t_share/MTE4MDAzNDEwNDQwMjU5MDg2/rowan-atkinson-9191636-1-402.jpg'/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={{height: 70}} align="middle" >
                                        <Col span={2}>
                                        {/* <div className='rating'>
                                            <Row style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 3, paddingRight: 3 }} justify='space-around' align='middle'>
                                                <StarOutlined style={{ color: 'white', fontSize: 15 }} />
                                                <div style={{ color: 'white' }}>4.5</div>
                                            </Row>
                                        </div> */}
                                        <div className="recipeRatingDiv" >
                                        <StarOutlined style={{ color: 'white', fontSize: 15 }} />
                                            <text style={{marginLeft: 5}}>4.5</text>
                                        </div>
                                        </Col>
                                        <Col span={4} >
                                        <Rate defaultValue={0} />
                                        </Col>

                                        
                                    </Row>
                                </Col>
                                <Col span={4} className="recipeCats" >
                                    {/* <EditableTagGroup></EditableTagGroup> */}
                                    <Tag color="#109D7C">
                                        Salmon
                                    </Tag>
                                    <Tag color="#109D7C">
                                        Fish
                                    </Tag>
                                    <Tag color="#109D7C">
                                        Grill
                                    </Tag>

                                </Col>
                            </Row>



                            <Row align="middle">
                                <Text className="recipeDescription" style={{ fontSize: 20 }} type="secondary">There's no healthier, easier, or faster summer entree than a
                                perfect piece of grilled salmon. This 15-minute recipe is a staple in our regular
                                dinner routine, and I'm so excited to share my tips with you today! Aside from pizza and spaghetti, I'd say that this particular
                                grilled salmon recipe is one of the meals that I prepare most frequently for my family.
                                It's my easy go-to when I feel like we need something nutritious, but I don't want to
                                spend much time in the kitchen. Every boy in my house will clean his plate -- no questions
                                asked -- which is certainly not always the case with other dinners that I serve. Any mom that's
                                trying to please a family of 5 opinionated eaters can understand that it's a true GEM when you find
                                a healthy recipe that appeals to the whole crew!</Text>
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
                                            src="https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Space>
                        <h1 className="subtitle">Ingredients</h1>
                        <Form.List name="ingredients">
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
                        </Form.List>
                        <h1 className="subtitle">Instructions</h1>
                        <Form.List name="instructions">
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
                        </Form.List>
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