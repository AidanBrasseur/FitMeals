import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Row, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './styles.css';


function EditRecipePage() {
  const { TextArea } = Input;
  const { Dragger } = Upload;
  const { Option } = Select;
  const [image, setImage] = useState<string | null>("https://media1.popsugar-assets.com/files/thumbor/q_eu4G_Yfvd1qUU7rkJYpC9Qalk/0x532:1560x2092/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/11/18/102/n/1922729/2010a3325dd3450317e273.27544324_/i/healthy-meal-prep-dinner-recipes.jpg");
  const [categories, setCategories] = useState<string[]>(["Pizza", "Fish", "Smoothies", "Pasta", "Dessert"])

  const children: any = [];
  categories.forEach(category => {
    children.push(<Option value={category} key={category}>{category}</Option>);
  });


  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };



  return (
    <Layout>
      <Header />
      <Layout.Content className="site-layout" style={{ marginTop: 64, backgroundColor: "#032D23" }}>
        <div className="newRecipe">
          <Form onFinish={onFinish}
            initialValues={{
              "title": "World's Best Pizza",
              "description": "Priy Fill these out with whatever values you want",
              "categories": ['Pizza', 'Italian'],
              "ingredients": [{ 'name': 'aidan', 'amount': 5, 'unit': 'kg' }],
              "instructions": [{ 'instruction': 'do thing with thing' }, { 'instruction': 'do thing 2 with thing 2' }],
            }}>
           
              <Row align='middle'>
                <Col span={16}>
                <Form.Item name="title">
                  <Input placeholder="Your Recipe's Title"  bordered={false} style={{ fontSize: 48, fontWeight: "bold" }} />
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
              <ImgCrop quality={1} aspect={70 / 30} rotate>
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
                    <Form.Item
                      required={false}
                      key={field.key}
                    >
                      <Row style={{ paddingBottom: 30 }} >
                        <Col style={{ display: "flex", justifyContent: "center" }} span={2}>
                          <Avatar>{index + 1}</Avatar>
                        </Col>
                        <Col span={12}>
                          <Form.Item {...field} name={[field.name, 'instruction']} fieldKey={[field.fieldKey, 'instruction']}>
                            <TextArea placeholder="Enter your instruction" rows={4} bordered={false} style={{ fontSize: 16 }}></TextArea>
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
                  Update Recipe
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Layout.Content>
    </Layout>
  );

}
export default EditRecipePage;