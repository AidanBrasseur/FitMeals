import { CheckOutlined, CloseOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Modal, Result, Row, Select, Spin, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Header from '../../components/Header/Header';
import { Ingredient, Macros, Recipe, Comment as CommentType } from '../../types';
import './styles.css';
import { useSessionContext } from '../../contexts/SessionContext';
import axios from 'axios';
import { HOST } from '../../config';
import Footer from '../../components/Footer/Footer';
interface stateType {
  recipeId: string
}

function EditRecipePage() {
  const { TextArea } = Input;
  const [instsructImages, setInstsructImages] = useState<InstructImage[]>([])
  type InstructImage = {
    key: number,
    image: string,
    file: File
  }
  const history = useHistory();
  const { state } = useLocation<stateType>();
  const recipeId = state.recipeId
  const { Dragger } = Upload;
  const { Option } = Select;
  const [image, setImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>(["Pizza", "Fish", "Smoothies", "Pasta", "Dessert", "Salads", "Vegan", "Sushi", "Soup"])
  const [loading, setLoading] = useState(false);
  const children: any = [];
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  categories.forEach(category => {
    children.push(<Option value={category} key={category}>{category}</Option>);
  });
  const [sessionContext, updateSessionContext] = useSessionContext();
  const [form] = Form.useForm();
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
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
                return {desc: i.instruction, image: i.image, wasInitial: true}
            })
            console.log(instructions)
            const ingredients = r.ingredients as Ingredient[]
            console.log(ingredients)
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
                image: r.image.url,
                instructions: instructions,
                comments: r.comments as CommentType[],
                macros: macros,
            } as Recipe
            setImage(detailRecipe.image)
            setRecipe(detailRecipe)
           
           
    }).catch((error) => {
        console.log(error)
    })
}
useEffect(() => {
    getRecipe();
}, []);
  const onFinish = async (values: any) => {
    console.log('Received values of form:', values);

    //Temporary will need more input fields
    values.image = image;
    //Temporary will need more input fields
    values.subtitle = 'test';
    values.time = '20-30min';
    values.calories = 400;
    values.macros = recipe?.macros;
    values.comments = [];
    let newRecipe = values as Recipe;

    setLoading(true)
    if (approve) {
     
    }
    else {
      
    }
    await delay(1000);
    setLoading(false);
    if (approve) {
      success("Successfully updated and approved recipe");
    }
    if (reject) {
      success("Successfully rejected recipe");
    }
  };

  function success(text: string) {
    Modal.success({
      content: text,
      onOk() { history.goBack() }
    });
  }




  const onApprove = () => {
    console.log(recipe)
    setApprove(true);
  }

  const onReject = () => {
    setReject(true);
  }

  useEffect(() => {
    if (approve) {
      form.submit()
    }
  }, [approve])
  useEffect(() => {
    if (reject) {
      form.submit()
    }
  }, [reject])



  return (
     <Layout>
      <Header />
      <Layout.Content className="site-layout" style={{ marginTop: 64, backgroundColor: "#032D23" }}>

        <Spin style={{ height: '100%', position: 'fixed', top: '25%' }} size="large" spinning={loading}>
          <div className="newRecipeEdit">
          {recipe && <Form form={form} onFinish={onFinish}
              initialValues={{
                "title": recipe?.title,
                "description": recipe?.description,
                "categories": recipe?.categories,
                "ingredients": recipe?.ingredients,
                "instructions": recipe?.instructions,
              }}>

              <Row align='middle'>
                <Col span={16}>
                  <Form.Item name="title">
                    <Input placeholder="Your Recipe's Title" bordered={false} style={{ fontSize: 48, fontWeight: "bold" }} />
                  </Form.Item>
                </Col>
                <Col span={8} push={2}>
                  <div className="selectCategory">
                    <Form.Item name="categories">
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}

                        placeholder="Please select some categories"
                      >
                        {children}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
              </Row>


              <Form.Item name="description">
                <TextArea placeholder="Your Recipe's Description" rows={3} bordered={false} style={{ fontSize: 20 }}></TextArea>
              </Form.Item>
              <div className="imagePicker">
                <ImgCrop quality={1} aspect={3/2} rotate>
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
                </ImgCrop>
              </div>
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
                            <Form.Item {...field} name={[field.name, 'quantity']} fieldKey={[field.fieldKey, 'quantity']}>
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
                          <Col style={{ marginLeft: 10, paddingTop: 5 }}>
                            {fields.length > 1 ? (

                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                              />

                            ) : null}
                          </Col>
                        </Row>

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
              <Form.List name="instructions"
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Row style={{ paddingBottom: 30 }} >
                        <Col style={{ display: "flex", justifyContent: "center" }} span={2}>
                          <Avatar>{index + 1}</Avatar>
                        </Col>
                        <Col span={12} >

                          <Form.Item
                            required={false}
                            key={field.key}
                          >
                            <Row>
                              <Col span={18}>
                                <Form.Item {...field} name={[field.name, 'desc']} fieldKey={[field.fieldKey, 'desc']} rules={[{ required: true, message: 'Missing' }]}>
                                  <TextArea rows={4} bordered={false} style={{ fontSize: 16 }} placeholder="Enter your instruction"></TextArea>
                                </Form.Item>
                              </Col>


                              <Col style={{ marginLeft: 10, paddingTop: 5 }}>
                                {fields.length > 1 ? (

                                  <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                  />

                                ) : null}
                              </Col>
                            </Row>

                          </Form.Item>
                        </Col>
                        <Col>

                          {/* <TextArea rows={4} bordered={false} style={{ fontSize: 16 }} placeholder="Enter your instruction"></TextArea> */}
                          <ImgCrop aspect={3 / 2} rotate>
                            <Form.Item {...field} name={[field.name, 'image']} fieldKey={[field.fieldKey, 'image']}>
                              <Dragger beforeUpload={file => {
                                console.log('Adding image index')
                                console.log(index)
                                console.log('done dit boissss')
                                form.getFieldValue('instructions')[index].wasInitial = false
                                form.getFieldValue('instructions')[index].image = file

                                console.log(form.getFieldValue('instructions')[index])
                                setInstsructImages([
                                  ...instsructImages,
                                  {
                                    key: field.fieldKey,
                                    image: URL.createObjectURL(file),
                                    file: file,
                                  }
                                ])
                                // URL.createObjectURL(file)
                                console.log(instsructImages)
                                // Prevent upload
                                return false;
                              }} style={{ minWidth: "30vw" }} multiple={false} showUploadList={false}>
                                {/* {({ getFieldValue }) =>
                                  getFieldValue('gender') === 'other' ? (
                                    <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                                      <Input />
                                    </Form.Item>
                                  ) : null
                                } */}
                                { 
                                  form.getFieldValue('instructions')[index] && form.getFieldValue('instructions')[index].image ? <img className='uploadImagePreviewInstructions' src={
                                  form.getFieldValue('instructions')[index].wasInitial ? form.getFieldValue('instructions')[index].image.url : URL.createObjectURL(form.getFieldValue('instructions')[index].image.file)} /> :
                                  <div>
                                    <div className="imagePickerIcon">
                                      <UploadOutlined />
                                    </div>
                                    <p className="uploadTitle">Upload image</p>
                                    <p style={{ margin: '10px' }}>Click or drag an image to this area to upload</p>
                                  </div>}
                              </Dragger>
                            </Form.Item>
                          </ImgCrop>


                        </Col>
                      </Row>
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
              <Row className='adminFullControls'>
                <Form.Item name='approve'>
                  <div className='adminFullApproval' onClick={onApprove}>
                    <Button type="primary" shape="round" icon={<CheckOutlined />}>Update and Approve</Button>
                  </div>
                </Form.Item>
                <Form.Item name='reject'>
                  <div className='adminFullReject' onClick={onReject}>
                    <Button type="primary" shape="round" icon={<CloseOutlined />}>Reject</Button>
                  </div>
                </Form.Item>
              </Row>


            </Form>}

          </div>
        </Spin>
      </Layout.Content>
      <Footer></Footer>
    </Layout>

  );

}
export default EditRecipePage;