import Icon, { ArrowLeftOutlined, CloseOutlined, QuestionOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, ConfigProvider, Form, Image, Input, Layout, List, Popconfirm, Rate, Row, Select, Space, Steps, Tag, Typography, Upload } from 'antd';
import axios from 'axios';
import React, { createElement, useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark, FaTrashAlt } from 'react-icons/fa';
import { PieChart } from 'react-minimal-pie-chart';
import { useHistory, useLocation } from 'react-router-dom';
import CommentItem from '../../components/CommentItem/CommentItem';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { HOST } from '../../config';
import { useSessionContext } from '../../contexts/SessionContext';
import { Comment as CommentType, Ingredient, Instruction, Macros, Recipe } from '../../types';
import './styles.css';
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
    const [userRating, setUserRating] = useState<number | undefined>(undefined);
    const [approved, setApproved] = useState<boolean | null>(true);
   
    
    const getRecipe = () => {
        axios.get(HOST + 'recipes/' + recipeId, {
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
            const r = response.data
            const categories = r.categories.map((cat: any) => {
                return cat.name
            })
            const instructions = r.instructions.map((i: any) => {
                return {instruction: i.instruction, image: i.image?.url}
            })
            const ingredients = r.ingredients as Ingredient[]
            const macros = {
                protein: r.macros.protein,
                carbs: r.macros.carbs,
                fats: r.macros.fats
            } as Macros
            const detailRecipe = {
                id: r._id,
                author: r.user.fullname,
                authorId: r.user._id,
                authorAvatar: r.user.image.url,
                authorUsername: r.user.username,
                title: r.title,
                categories: categories,
                description: r.description,
                time: r.time,
                calories: r.calories,
                subtitle: r.subtitle,
                rating: r.rating,
                ingredients: ingredients,
                image: r.image.url,
                instructions: instructions,
                comments: r.comments.map((comment: any) => {
                    comment.avatar = comment.avatar.url
                    return comment
                }) as CommentType[],
                macros: macros,
            } as Recipe
            console.log(r)
            setApproved(r.approved)
            setSaved(r.isSaved)
            setUserRating(r.userRating)
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
        if (!("user" in sessionContext)){
            currentHistory.push('/login');
            return
        } 
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

    const goToProfile = (username: string | undefined ) => {
        currentHistory.push(`/profile/${username}`, {hardcode: true});
    }
    const confirmDelete = () => {
        axios.delete(HOST + 'recipes/' + recipe?.id, {
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
            currentHistory.goBack();
        }).catch((error) => {
            console.log(error)
        })
    }
    const confirmDeleteComment = (comment: CommentType) => {
        axios.delete(HOST + 'comments/recipes/' + recipeId + '/comments/' + comment.id, {
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
            let newCommentList = commentList.filter((temp) => temp.id !== comment.id)
            setCommentList(newCommentList)
        }).catch((error) => {
            console.log(error)
        })
    }

    const rateRecipe = (value: number) => {
        if (!("user" in sessionContext)){
            currentHistory.push('/login');
            return
        } 
        axios.post(HOST + 'recipes/rating/' + recipe?.id , {
            data:{
                rating: value
            }
        },{
            headers:{
                authorization: sessionContext["user"]?.authToken
            }
        }).then(response => {
            setUserRating(response.data.rating)
        }).catch((error) => {
            console.log(error)
        })

    }   

    return (
        <Layout>
            <Header />
            <Layout.Content className="site-layout" style={{ marginTop: 64, backgroundColor: "#032D23" }}>
                <div className="recipePage" >
                    <Row align='middle' justify='space-between' style={{width: '100%'}}>
                            <ArrowLeftOutlined onClick={() => currentHistory.goBack()}className="goBackIcon"></ArrowLeftOutlined>
                            {(sessionContext.user?.id === recipe?.authorId || sessionContext.user?.isAdmin) && 
                            <Popconfirm
                             placement="leftBottom"
                            title="Are you sure to delete this Recipe?"
                            onConfirm={confirmDelete}
                            okText="Yes"
                            cancelText="No"
                          >
                         <FaTrashAlt className="deleteRecipeIcon"></FaTrashAlt> 
                          </Popconfirm>}
                        </Row>
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
                                            <Image onClick={() => goToProfile(recipe?.authorUsername)} preview={false} src={recipe?.authorAvatar} />
                                        </div>
                                       
                                    </Col>
                                    <Col style={{ marginRight: 25 }}>
                                        <Text className="recipeDescription" style={{ fontSize: 20 }} type="secondary">{recipe?.author}</Text>
                                    </Col>
                                    <Col style={{ marginRight: 10 }}>

                                    {approved && <div className='recipeRatingDiv'>
                                            <Row style={{ paddingLeft: 3, paddingRight: 3 }} justify='space-around' align='middle'>
                                                <StarOutlined style={{ color: 'white', fontSize: 15 }} />
                                                <div style={{ color: 'white' }}>{recipe?.rating}</div>
                                            </Row>
                                        </div>}
                                    </Col>

                                    <Col span={6}>
                                        {userRating !== undefined && approved && <Rate defaultValue={userRating} onChange={rateRecipe}/>}
                                    </Col>
                                    <Col>
                                    {approved == false ? <Space direction='horizontal'><QuestionOutlined style={{color: 'red', fontSize: 30}}></QuestionOutlined>{"This recipe is currently under review"}</Space> : approved === null ? 
                                    <Space direction='horizontal'><CloseOutlined style={{color: 'red', fontSize: 30}}></CloseOutlined>{"This recipe has been rejected"}</Space> : 
                                    <span className="saveButton" onClick={toggleSave}>
                                            {createElement((saved) ? FaBookmark : FaRegBookmark)}
                                        </span>}
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
                                        <Text>{recipe?.macros ? recipe.macros.carbs *4 : undefined} calories from Carbs</Text>
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
                                        {recipe?.instructions.map((instruction: Instruction, index: number) =>
                                           
                                            <Step key={index} title={`Step ${index + 1}`} status="process" description={ <Space direction='vertical'>
                                            <div>{instruction.instruction}</div>
                                            {instruction.image &&  <Image
                                        height={'15vw'}
                                        width={'45vw'}
                                        style={{objectFit: 'cover'}}
                                        src={instruction.image}
                                    />}
                                        </Space>}  />
                                           
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
                                    <ConfigProvider renderEmpty={() => <div></div>}>
                                    <List
                                        dataSource={commentList}
                                        renderItem={comment => (
                                            <List.Item
                                            extra={
                                                (sessionContext.user?.username === comment?.username || sessionContext.user?.isAdmin) ? 
                                                    <Popconfirm
                                                   
                                                     placement="leftBottom"
                                                  
                                                    title="Are you sure to delete this comment?"
                                                    onConfirm={() => confirmDeleteComment(comment)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                  >
                                                 <FaTrashAlt  style={{cursor: 'pointer'}}></FaTrashAlt> 
                                                  </Popconfirm> : <div></div>
                                            }>
                                                <CommentItem comment={comment}></CommentItem>
                                            </List.Item>
                                        )}
                                    ></List>
                                    </ConfigProvider>
                                </div>
                            </Col>
                        </Row>
                    </Space>
                </div>
            </Layout.Content>
            <Footer></Footer>
        </Layout>
    );

}
export default RecipePage;