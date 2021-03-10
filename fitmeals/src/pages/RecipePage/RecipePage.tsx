import { MinusCircleOutlined, PlusOutlined, UploadOutlined, DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Row, Select, Upload, Comment, List, Tooltip } from 'antd';
import React, { useState, createElement } from 'react';
import Header from '../../components/Header/Header';
import ImgCrop from 'antd-img-crop';
import './styles.css';
import { Rate, Image, Space, Typography, Tag, Divider, Steps, Checkbox } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { PieChart } from 'react-minimal-pie-chart'
import { useLocation, useHistory } from 'react-router-dom';
import { Recipe, Comment as CommentType } from '../../types';
import { useSessionContext } from '../../contexts/SessionContext';
interface stateType {
    recipe: Recipe
}

const { Text, Title } = Typography;
const { Step } = Steps;
const { TextArea } = Input;

function RecipePage() {
    const { TextArea } = Input;
    const { Dragger } = Upload;
    const { state } = useLocation<stateType>();
    const recipe = state.recipe;
    const { id, author, image, title, categories, rating, ingredients, instructions, description, comments } = recipe;
    const { Option } = Select;
    const [commentList, setCommentList] = useState(comments);
    const currentHistory = useHistory();
    const [sessionContext, updateSessionContext] = useSessionContext();
    const [saved, setSaved] = useState(false);

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={() => { console.log("liked") }}>
                {createElement(LikeOutlined)}
            </span>
        </Tooltip>
    ];

    const macros = {
        protein: 50,
        carbs: 80,
        fats: 35
    }

    const onFinish = (values: any) => {
        if (!("user" in sessionContext)){
            currentHistory.push('/login');
        } else {
            if (values["content"].length > 0) {
                let newComment = { username: sessionContext["user"]?.username, content: values["content"] } as CommentType;
                comments.push(newComment);
                setCommentList([...commentList, newComment]);
            }
        }
    };

    // Save this recipe to the user's saved recipes list
    const saveRecipe = () => {
        if (!("user" in sessionContext)){
            currentHistory.push('/login');
        } else {
            if (!saved){
                if (!(sessionContext.savedRecipes.includes(recipe))){
                    sessionContext.savedRecipes.push(recipe);
                }
            } else {
                sessionContext.savedRecipes.splice(sessionContext.savedRecipes.indexOf(recipe), 1);
            }
            setSaved(!saved);
        }
    }

    return (
        <Layout>
            <Header />
            <Layout.Content className="site-layout" style={{ marginTop: 64, backgroundColor: "#032D23" }}>
                <div className="recipePage" >

                    <Space direction="vertical" size={"large"} style={{ width: '100%' }} align='center'>
                        <Row align='middle' justify='space-between' style={{ width: '55vw', maxWidth: 1000 }}>

                            <Col span={16}>
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
                                        <Text className="recipeDescription" style={{ fontSize: 20 }} type="secondary">{author}</Text>
                                    </Col>
                                    <Col style={{ marginRight: 10 }}>

                                        <div className='recipeRatingDiv'>
                                            <Row style={{ paddingLeft: 3, paddingRight: 3 }} justify='space-around' align='middle'>
                                                <StarOutlined style={{ color: 'white', fontSize: 15 }} />
                                                <div style={{ color: 'white' }}>{rating}</div>
                                            </Row>
                                        </div>
                                    </Col>

                                    <Col span={6}>
                                        <Rate defaultValue={0} />
                                    </Col>
                                    <Col>
                                        <span className="saveButton" onClick={saveRecipe}>
                                            {createElement((saved || sessionContext.savedRecipes.includes(recipe)) ? HeartFilled : HeartOutlined)}
                                        </span>
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
                                <Text className="recipeDescription" style={{ fontSize: 20, color: "black" }} type="secondary">{description}</Text>
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
                                <div className="instructionsDiv">
                                    <Steps direction="vertical">
                                        {instructions.map((instruction, index) =>
                                            <Step key={index} title={`Step ${index + 1}`} status="process" description={instruction} />
                                        )}
                                    </Steps>
                                </div>
                            </Col>
                            <Col span={10}>

                            </Col>
                        </Row>

                        <Row align='middle' justify='start' style={{ width: '55vw', maxWidth: 1000 }}>
                            <Col span={24}>
                                <h1 className="subtitle">Comments</h1>
                                <Form onFinish={onFinish} name="commentForm" className="commentForm">
                                    <Form.Item name="content">
                                        <TextArea placeholder="Add a comment" bordered={false} autoSize={true}></TextArea>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit">
                                            Add Comment
                                    </Button>
                                    </Form.Item>
                                </Form>
                                <div className="commentDiv">
                                    <List
                                        dataSource={comments}
                                        renderItem={comment => (
                                            <List.Item>
                                              <Comment
                                                    actions={actions}
                                                    author={comment.username}
                                                    content={comment.content}
                                                    avatar="https://i1.sndcdn.com/artworks-000362506068-4i6lyp-t500x500.jpg" />
                                            </List.Item>
                                        )}
                                    ></List>
                                </div>
                            </Col>
                        </Row>
                    </Space>
                </div>
            </Layout.Content>
        </Layout>
    );

}
export default RecipePage;