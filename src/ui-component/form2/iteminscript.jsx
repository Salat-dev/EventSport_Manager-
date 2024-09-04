import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';

import { Button, Card, Form, Input, Space,DatePicker,InputNumber,Upload } from 'antd';
const ItemForm = () => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [form] = Form.useForm();
  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 100,
      }}
      form={form}
      name="dynamic_form_complex"
      
      autoComplete="off"
      initialValues={{
        items: [{}],
      }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div
            style={{
              display: 'flex',
              rowGap: 32,
              flexDirection: 'column',
            }}
          >
            {fields.map((field) => (
              <Card
                size="small"
                title={`${field.name + 1}`}
                key={field.key} 
              >
               

                {/* Nest Form.List */}
                <Form.Item >
                  <Form.List name={[field.name, 'list']}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 32,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>

                            <Form.Item noStyle name={[subField.name, 'first']}>
                              <Input placeholder="Nom" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, 'second']}>
                              <Input placeholder="Prénom" />
                            </Form.Item>

                            <Form.Item
                            noStyle name={[subField.name, 'date']}>
                                <DatePicker  placeholder="Date de naissance"/>
                              </Form.Item> 

                              <Form.Item noStyle name={[subField.name, 'Poids']}>
                                <InputNumber placeholder="Poids"/>
                              </Form.Item>


                              <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
                                    <Upload action="/upload.do" listType="picture-card">
                                      <button
                                        style={{
                                          border: 0,
                                          background: 'none',
                                        }}
                                        type="button"
                                      >
                                        <PlusOutlined />
                                        <div
                                          style={{
                                            marginTop: 8,
                                          }}
                                        >
                                          Upload
                                        </div>
                                      </button>
                                    </Upload>
                                  </Form.Item>

                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          + Ajouter un athlète
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

          
          </div>
        )}
      </Form.List>

      
    </Form>
  );
};
export default ItemForm;