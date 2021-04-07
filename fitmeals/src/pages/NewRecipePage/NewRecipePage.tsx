import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Modal, Row, Select, Spin, Upload, InputNumber } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../../components/Header/Header';
import './styles.css';
import { useSessionContext } from '../../contexts/SessionContext';
import { Recipe } from '../../types';
import { useAlert } from 'react-alert'
import { stringify } from 'querystring';
import axios from 'axios';
import { HOST } from '../../config';

import Footer from '../../components/Footer/Footer';
import TextArea from 'antd/lib/input/TextArea';
function NewRecipePage() {
  const { TextArea } = Input;
  const { Dragger } = Upload;
  const { Option } = Select;
  // const alert = useAlert()
  type MainImage = {
    url: string,
    file: File
  }
  const [image, setImage] = useState<MainImage | null>(null);
  type InstructImage = {
    key: number,
    image: string,
    file: File
  }
  const [form] = Form.useForm()

  const [instsructImages, setInstsructImages] = useState<InstructImage[]>([])
  const [sessionContext, updateSessionContext] = useSessionContext();

  const [categories, setCategories] = useState<string[]>(["Pizza", "Fish", "Smoothies", "Pasta", "Dessert", "Salads", "Vegan", "Sushi", "Soup"])
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const children: any = [];
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  categories.forEach(category => {
    children.push(<Option value={category} key={category}>{category}</Option>);
  });

  const onFinish = async (values: any) => {
    console.log('Received values of form:', values);
    // setLoading(true)
    // await delay(1000);
    // setLoading(false);
    // values.image = image;
    // //Temporary will need more input fields
    // values.time = '20-30min';
    // values.calories = 400;
    // values.id = sessionContext.underReviewRecipes.length + 1;
    // values.comments = [];
    // values.macros = { protein: parseInt(values.macroProtein), carbs: parseInt(values.macroCarbs), fats: parseInt(values.macroFats) }
    // let recipe = values as Recipe;
    // console.log(recipe);

    // let underReviewRecipes = [recipe, ...sessionContext.underReviewRecipes]
    // let userRecipes = [recipe, ...sessionContext.userRecipes]
    // updateSessionContext({ ...sessionContext, underReviewRecipes: underReviewRecipes, userRecipes: userRecipes })
    // success();
    const formData = new FormData();
    // alert.show('clicked')
    if (values.title == undefined || values.title == '') {
      // alert.show('Please provide a title')
      Modal.error({
        content: "Please provide a title"
      })
      return;
    }
    if (values.description == undefined || values.description == '') {
      // alert.show('Please provide a title')
      Modal.error({
        content: "Please provide a description"
      })
      return;
    }
    formData.append('title', values.title)
    if (values.categories != undefined) {
      const categories = values.categories.map((item: string) => {
        return { name: item }
      })
      formData.append('categories', JSON.stringify(categories))
    }
    if (values.time != undefined) {
      formData.append('time', values.time + ' ' + values.timeUnit)
    }

    formData.append('description', values.description)
    if (values.ingredients == undefined || values.ingredients.length == 0) {
      // alert.show('Please provide a title')
      Modal.error({
        content: "Please provide at least one ingredient"
      })
      return;
    }
    formData.append('ingredients', JSON.stringify(values.ingredients))
    if (values.instructions == undefined || values.instructions.length == 0) {
      // alert.show('Please provide a title')
      Modal.error({
        content: "Please provide at least one instruction step"
      })
      return;
    }
    const instructionsForm = values.instructions.map((item: { desc: string, image: any }, index: number) => {
      return { order: index + 1, instruction: item.desc }
    })
    console.log(values.instructions);
    
    for (let i=0; i<values.instructions.length; i++){
      if (values.instructions[i] != undefined && values.instructions[i].image != undefined) {
        const file = values.instructions[i].image.file;
        // let blob = await fetch(file).then(r => r.blob());
        formData.append(`image_instruction${i + 1}`, file)
        console.log(values.instructions[i].image.file)
       
      }
    }    
    
    formData.append('instructions', JSON.stringify(instructionsForm))
    if (values.macroCalories != undefined) {
      formData.append('calories', values.macroCalories)

    }
    formData.append('macros', JSON.stringify({
      protein: Number(values.macroProtein),
      carbs: Number(values.macroCarbs),
      fats: Number(values.macroFats)
    }))
    if (image != undefined) {
      let blob = await fetch(image?.url).then(r => r.blob());
      formData.append('image', blob)
    }
    else {
      Modal.error({
        content: "Please provide a main image"
      })
      return;
    }


    try {
      const res = await axios.post(HOST + 'recipes/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': sessionContext["user"]?.authToken
        }
      })
      console.log(res)
      success();

    } catch (error) {
      console.log(error)
      Modal.error({
        content: "Something went wrong please try again"
      })
      return;
    }



  };

  function success() {
    Modal.success({
      content: 'Your recipe was sent to the admins for review',
      onOk() { history.goBack() }
    });
  }

  return (
    <Layout>
      <Header />
      <Layout.Content className="site-layout" style={{ marginTop: 64, backgroundColor: "#032D23" }}>
        <Spin style={{ height: '100%', position: 'fixed', top: '25%' }} size="large" spinning={loading}>
          <div className="newRecipe">
            <Form onFinish={onFinish} form={form}>
              <Row align='middle'>
                <Col span={16}>
                  <Form.Item name="title" required={true}>
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

              <Form.Item name="subtitle">
                <Input placeholder="Your Recipe's Subtitle" bordered={false} style={{ fontSize: 24 }}></Input>
              </Form.Item>
              <Form.Item name="description">
                <TextArea placeholder="Your Recipe's Description" rows={3} bordered={false} style={{ fontSize: 18 }}></TextArea>
              </Form.Item>

              <Row>


                <Col>
                  <Form.Item name="time" rules={[{ required: true, message: 'Missing' }, { type: 'number', message: 'Please input a number' }]}>
                    <InputNumber style={{ maxWidth: '150px', width: '10vw' }} placeholder="Total time"></InputNumber>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item name="timeUnit" initialValue="minutes">

                    <Select defaultValue='minutes'>
                      <Option value="hours">Hours</Option>
                      <Option value="minutes">Minutes</Option>
                    </Select>

                  </Form.Item>
                </Col>



              </Row>


              <div className="imagePicker">
                <ImgCrop aspect={3 / 2} rotate>
                  <Dragger beforeUpload={file => {
                    setImage({
                      url: URL.createObjectURL(file),
                      file: file
                    })

                    // Prevent upload
                    return false;
                  }} style={{ minWidth: "75vw" }} multiple={false} showUploadList={false}>
                    {image ? <img className='uploadImagePreview' src={image.url} /> :
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
                          <Col >
                            <Form.Item {...field} name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']} rules={[{ required: true, message: 'Missing' }]}>
                              <Input style={{
                                width: '20vw',
                                minWidth: '100px',
                                maxWidth: '400px'
                              }} placeholder="Name of Ingredient"></Input>
                            </Form.Item>
                          </Col>
                          <Col style={{ marginLeft: 10 }} >
                            <Form.Item {...field} name={[field.name, 'quantity']} fieldKey={[field.fieldKey, 'quantity']} rules={[{ type: 'number', message: 'Please input a number' }]} >
                              <InputNumber placeholder="Quantity"></InputNumber>
                            </Form.Item>
                          </Col>
                          <Col style={{ marginLeft: 10 }} span={3}>
                            <Form.Item {...field} name={[field.name, 'unit']} fieldKey={[field.fieldKey, 'unit']} >
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
              <h1 className="subtitle">Macros</h1>
              <div className="macroInputs">
                <Row>
                  <Col className="macroCol" >
                    <Form.Item name="macroCalories" >
                      <InputNumber placeholder="Total Calories"></InputNumber>
                    </Form.Item>
                  </Col>
                  <Col className="macroCol">
                    <Form.Item name="macroProtein">
                      <InputNumber placeholder="Number of Grams - Protein"></InputNumber>
                    </Form.Item>
                  </Col>
                  <Col className="macroCol">
                    <Form.Item name="macroCarbs">
                      <InputNumber placeholder="Number of Grams - Carbs"></InputNumber>
                    </Form.Item>
                  </Col>
                  <Col className="macroCol">
                    <Form.Item name="macroFats">
                      <InputNumber placeholder="Number of Grams - Fats"></InputNumber>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
              <h1 className="subtitle">Instructions</h1>
              <Form.List name="instructions">
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
                                setInstsructImages([
                                  ...instsructImages,
                                  {
                                    key: field.fieldKey,
                                    image: URL.createObjectURL(file),
                                    file: file,
                                  }
                                ])
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
                                {form.getFieldValue('instructions')[index] && form.getFieldValue('instructions')[index].image ? <img className='uploadImagePreviewInstructions' src={
                                  URL.createObjectURL(form.getFieldValue('instructions')[index].image.file)} /> :
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
        </Spin>
      </Layout.Content>
      <Footer></Footer>
    </Layout >
  );

}
export default NewRecipePage;