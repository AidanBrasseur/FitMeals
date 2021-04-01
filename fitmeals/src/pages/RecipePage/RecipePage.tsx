import { MinusCircleOutlined, PlusOutlined, UploadOutlined, DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Row, Select, Upload, Comment, List, Tooltip } from 'antd';
import React, { useState, createElement, useEffect } from 'react';
import Header from '../../components/Header/Header';
import ImgCrop from 'antd-img-crop';
import './styles.css';
import { Rate, Image, Space, Typography, Tag, Divider, Steps, Checkbox } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { PieChart } from 'react-minimal-pie-chart'
import { useLocation, useHistory } from 'react-router-dom';
import { Recipe, Comment as CommentType, Ingredient, Macros } from '../../types';
import { useSessionContext } from '../../contexts/SessionContext';
import { HOST } from '../../config';
import CommentItem from '../../components/CommentItem/CommentItem';
import axios from 'axios';
interface stateType {
    recipe: string
}

const { Text, Title } = Typography;
const { Step } = Steps;
const { TextArea } = Input;

function RecipePage() {
    const { TextArea } = Input;
    const { Dragger } = Upload;
    const { state } = useLocation<stateType>();
    const [recipe, setRecipe] = useState<Recipe | undefined>();
    const recipeId = state.recipe
    // const { id, author, image, title, categories, rating, ingredients, instructions, description, comments, macros } = recipe;
    const { Option } = Select;
    const [commentList, setCommentList] = useState<CommentType[]>([] as CommentType[]);
    const currentHistory = useHistory();
    const [sessionContext, updateSessionContext] = useSessionContext();
    const [saved, setSaved] = useState(false);
   
    
    const getRecipe = () => {
        axios.get(HOST + 'recipes/' + recipeId, {
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
            const r = response.data
           console.log(r)
                const categories = r.categories.map((cat: any) => {
                    return cat.name
                })
                const instructions = r.instructions.map((i: any) => {
                    return i.instruction
                })
                const ingredients = r.ingredients as Ingredient[]
                const macros = r.macros as Macros
                const detailRecipe = {
                    id: r._id,
                    author: r.user.fullname,
                    authorId: r.user._id,
                    // authorAvatar: r.user.image,
                    title: r.title,
                    categories: categories,
                    description: r.description,
                    time: r.time,
                    calories: r.calories,
                    subtitle: r.subtitle,
                    rating: r.rating,
                    ingredients: ingredients,
                    image: "https://universityhealthnews.com/media/ispizzahealthy.jpg",
                    instructions: instructions,
                    comments: r.comments as CommentType[],
                    macros: macros,
                } as Recipe
                setSaved(r.isSaved)
                setCommentList([...(detailRecipe?.comments as CommentType[])])
                setRecipe(detailRecipe)
               
               
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        getRecipe();
    }, []);

    

    const onFinish = (values: any) => {
        if (!("user" in sessionContext)){
            currentHistory.push('/login');
        } else {
            if (values["content"].length > 0) {
               postComment(values["content"])
            }
        }
    };
    const postComment = (content: string)=> {
        axios.post(HOST + 'comments/recipes/' + recipe?.id, {
            data: {
                comment: content
            },
        },{ headers:{
            authorization: sessionContext["user"]?.authToken
        }}).then(response => {
            console.log(response.data)
            let newComment = {
                username: sessionContext["user"]?.username,
                avatar: sessionContext["user"]?.image,
                content: response.data.content,
                id: response.data._id
            } as CommentType
            setCommentList([...commentList, newComment])
         }).catch((error) => {
             console.log(error)
         })
    }

    // Save this recipe to the user's saved recipes list
    const toggleSave = () => {
        console.log("saving")
        if (!("user" in sessionContext)){
            currentHistory.push('/login');
        } else {
            if (!saved){
                saveRecipe();
            } else {
               unsaveRecipe();
            }
        }
    }
    const saveRecipe = () => {
        axios.post(HOST + 'recipes/save/' + recipe?.id, {}, {
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
           setSaved(true)
        }).catch((error) => {
            console.log(error)
        })
    }
    const unsaveRecipe = () => {
        axios.post(HOST + 'recipes/unsave/' + recipe?.id, {}, {
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
           setSaved(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    const goToProfile = () => {
        currentHistory.push('/profile', {hardcode: true});
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
                                        <Title style={{ fontSize: 48, fontWeight: "bold", marginBottom: 0 }}>{recipe?.title}</Title>
                                    </Col>

                                </Row>
                                <Row style={{ height: 70 }} align="middle" >
                                    <Col style={{ marginRight: 10 }}>
                                        <div className="recipePageProfilePic">
                                            <Image onClick={goToProfile} preview={false} style={{ borderRadius: "50%" }} src='https://www.biography.com/.image/t_share/MTE4MDAzNDEwNDQwMjU5MDg2/rowan-atkinson-9191636-1-402.jpg' />
                                        </div>
                                    </Col>
                                    <Col style={{ marginRight: 25 }}>
                                        <Text className="recipeDescription" style={{ fontSize: 20 }} type="secondary">{recipe?.author}</Text>
                                    </Col>
                                    <Col style={{ marginRight: 10 }}>

                                        <div className='recipeRatingDiv'>
                                            <Row style={{ paddingLeft: 3, paddingRight: 3 }} justify='space-around' align='middle'>
                                                <StarOutlined style={{ color: 'white', fontSize: 15 }} />
                                                <div style={{ color: 'white' }}>{recipe?.rating}</div>
                                            </Row>
                                        </div>
                                    </Col>

                                    <Col span={6}>
                                        <Rate defaultValue={0} />
                                    </Col>
                                    <Col>
                                        <span className="saveButton" onClick={toggleSave}>
                                            {createElement((saved) ? HeartFilled : HeartOutlined)}
                                        </span>
                                    </Col>


                                </Row>
                            </Col>
                            <Col className="recipeCats" >
                                {/* <EditableTagGroup></EditableTagGroup> */}
                                {recipe?.categories.map((cat: string, index: number) =>
                                    <Tag key={cat} style={{ paddingLeft: 20, paddingRight: 20 }} color="#109D7C">
                                        {cat}
                                    </Tag>
                                )}


                            </Col>

                        </Row>
                        <Row align="middle" style={{ width: '55vw', maxWidth: 1000 }}>
                            <Col  >
                                <Text className="recipeDescription" style={{ fontSize: 20, color: "black" }} type="secondary">{recipe?.description}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className='imagePicker'>
                                    <div className="recipeImage">
                                        <Image
                                            height={'27vw'}
                                            width={'55vw'}
                                            src={recipe?.image}
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

                                {recipe?.ingredients.map((item : any, index: number) =>
                                    <Row key={index} style={{ marginBottom: 10 }}>
                                        <Checkbox>
                                            <Text style={{ fontSize: 20 }}>{`${item.quantity} ${item.unit} ${item.name}`}</Text>
                                        </Checkbox>
                                    </Row>

                                )}
                            </Col>
                            {recipe?.macros.carbs &&
                            <Col span={8} className="pieChart">
                                <Row>
                                     <PieChart
                                        data={[
                                            { title: 'Protein', value: recipe?.macros ? recipe.macros.protein *4 : 0, color: '#ACB9FF' },
                                            { title: 'Carbs', value: recipe?.macros ? recipe.macros.carbs *4 : 0, color: '#2121B0' },
                                            { title: 'Fats', value: recipe?.macros ? recipe.macros.fats *9 : 0, color: '#27AE60' },
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
                                        <Text>{recipe?.macros ? recipe.macros.protein *4 : undefined} calories from Protein</Text>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ backgroundColor: "#2121B0", width: 10, height: 10, borderRadius: "50%", marginBottom: 5 }}></div>
                                        <Text>{recipe?.macros ? recipe.macros.protein *4 : undefined} calories from Carbs</Text>
                                    </Col>
                                    <Col span={6}>
                                        <div style={{ backgroundColor: "#27AE60", width: 10, height: 10, borderRadius: "50%", marginBottom: 5 }}></div>
                                        <Text>{recipe?.macros ? recipe.macros.fats *9 : undefined} calories from Fats</Text>
                                    </Col>
                                </Row>
                            </Col>}
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
                                        {recipe?.instructions.map((instruction: string, index: number) =>
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
                                        dataSource={commentList}
                                        renderItem={comment => (
                                            <List.Item>
                                                <CommentItem comment={comment}></CommentItem>
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