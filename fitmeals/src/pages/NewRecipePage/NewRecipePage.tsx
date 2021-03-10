import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Layout, Modal, Row, Select, Spin, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../../components/Header/Header';
import './styles.css';
import { useSessionContext } from '../../contexts/SessionContext';
import { Recipe } from '../../types';

function NewRecipePage() {
  const { TextArea } = Input;
  const { Dragger } = Upload;
  const { Option } = Select;
  const [image, setImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>(["Pizza", "Fish", "Smoothies", "Pasta", "Dessert", "Salads", "Vegan", "Sushi", "Soup"])
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const children: any = [];
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  categories.forEach(category => {
    children.push(<Option value={category} key={category}>{category}</Option>);
  });
  const [sessionContext, updateSessionContext] = useSessionContext();

  const onFinish = async (values: any) => {
    console.log('Received values of form:', values);
    setLoading(true)
    await delay(1000);
    setLoading(false);
    values.image = image;
    //Temporary will need more input fields
    values.time = '20-30min';
    values.calories = 400;
    values.id = sessionContext.underReviewRecipes.length + 1;
    values.comments = [];
    let recipe = values as Recipe;

    let underReviewRecipes = [recipe, ...sessionContext.underReviewRecipes]
    let userRecipes = [recipe, ...sessionContext.userRecipes]
    updateSessionContext({ ...sessionContext, underReviewRecipes: underReviewRecipes, userRecipes: userRecipes })
    success();
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
            <Form onFinish={onFinish}>
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
              <Form.Item name="subtitle">
                <Input placeholder="Your Recipe's Subtitle" bordered={false} style={{ fontSize: 24 }}></Input>
              </Form.Item>
              <Form.Item name="description">
                <TextArea placeholder="Your Recipe's Description" rows={3} bordered={false} style={{ fontSize: 18 }}></TextArea>
              </Form.Item>
              <div className="imagePicker">
                <ImgCrop aspect={3 / 2} rotate>
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
              <Form.List name="instructions">
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
                            <Form.Item {...field} >
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
                    Submit Recipe
                </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </Layout.Content>
    </Layout>
  );

}
export default NewRecipePage;