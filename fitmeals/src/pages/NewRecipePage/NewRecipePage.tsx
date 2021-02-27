import { Input, Layout, Space, Row, Col, Avatar, Upload, Form, Button, Select, Typography } from 'antd';
import React from 'react';
import './styles.css';
import { UserOutlined, UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function NewRecipePage() {
  const { TextArea } = Input;
  const { Dragger } = Upload;
  const { Option } = Select;

  const onSearch = () => {

  }

  const onFinish = (values : any) => {
    console.log('Received values of form:', values);
  };

  return (
    <Layout>
      <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%', justifyContent: 'center', background: 'white' }}>
        <div className="logo">FitMeals</div>
        <Space size={50} className="menu" direction="horizontal">
          <div className='search'>
            <Input.Search allowClear placeholder="Search Recipes" onSearch={onSearch} />
          </div>
          <UserOutlined style={{ color: 'black' }}></UserOutlined>
        </Space>
      </Layout.Header>
      <Layout.Content className="site-layout" style={{ marginTop: 64, backgroundColor: "#032D23" }}>
        <div className="newRecipe">
          <Form onFinish={onFinish}>
            <Form.Item name="title">
              <Input placeholder="Your Recipe's Title" bordered={false} style={{ fontSize: 48, fontWeight: "bold" }}></Input>
            </Form.Item> 
            <Form.Item name="description">
              <TextArea placeholder="Your Recipe's Description" rows={3} bordered={false} style={{ fontSize: 20 }}></TextArea>
            </Form.Item>            
            <div className="imagePicker">
              <Dragger style={{ minWidth: "75vw" }}>
                <div className="imagePickerIcon">
                  <UploadOutlined />
                </div>
                <p className="uploadTitle">Upload a picture of your recipe!</p>
                <p>Click or drag an image to this area to upload</p>
              </Dragger>
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
                  style={{ backgroundColor: "#032D23", borderWidth: 0, width: "30%", height: "100%", borderRadius: 20, fontWeight: "bold", fontSize: 26 }}>
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
export default NewRecipePage;