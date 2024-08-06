import React, { useState } from 'react';
import {
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
  
} from 'antd';
import { Button } from '@mui/material';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { PlusOutlined } from '@ant-design/icons';

const Coach = () => {
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Nom">
        <Input />
      </Form.Item>
      <Form.Item label="Prénom">
        <Input />
      </Form.Item>
      <Form.Item label="Club/Pays">
        <Input />
      </Form.Item>
      <Form.Item label="Nationalité">
        <Input />
      </Form.Item>

      <Form.Item label="Sexe">
        <Select>
          <Select.Option value="demo">Homme</Select.Option>
          <Select.Option value="demo">Femme</Select.Option>
        </Select>
      </Form.Item>

      
      <Form.Item label="Catégories">
        <Cascader
          options={[
            {
              value: 'Kata',
              label: 'Kata Senior',
              children: [
               
                {
                    value: 'Messieurs',
                    label: 'Messieurs',
                  }
              ],
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="Age">
        <DatePicker />
      </Form.Item>
      

      <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
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

      <Form.Item >
      <Button style={{ position: 'relative', marginLeft: '300px' }} variant="contained" endIcon={<DoneRoundedIcon />}>
  Valider
</Button>
      </Form.Item>
    </Form>
  );
};
export default Coach;