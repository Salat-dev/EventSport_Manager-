import React, { useState } from 'react';
import {
    Checkbox,
  Col,
  Row,
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
  Segmented,
  Divider,
  Typography,
} from 'antd';
import SecondForm from './flexform';
import { color } from '@mui/system';
import { blue } from '@mui/material/colors';
import ItemForm from './iteminscript';
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const InscriptiontFom = () => {
  const [componentVariant, setComponentVariant] = useState('filled');
  const onFormVariantChange = ({ variant }) => {
    setComponentVariant(variant);
  };
  return (


    <Form
      {...formItemLayout}
      onValuesChange={onFormVariantChange}
      variant={componentVariant}
      style={{
        maxWidth: 3000,
      }}
      initialValues={{
        variant: componentVariant,
      }}
    >
      <Form.Item label="Form variant" name="variant">
        <Segmented options={['outlined', 'filled', 'borderless']} />
      </Form.Item>

      <Form.Item
        label="Nom de l'équipe"
        name="Input"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        label="Nom du Coach/Entraineur"
        name="input"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        label="Nom du Capitaine"
        name="Input"
        rules={[
          {
           
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="Input"
        type ="mail"
        rules={[
          {
            required: false,
            message: 'Please input!',
          },
        ]}
      > 
      <Input />
       
      </Form.Item>

      <Form.Item
        name="Input"
        label="Inscription des athlètes"
        rules={[
          {
           
            message: 'Please input!',
          },
        ]}
      >
        < ItemForm 
        style={{
        maxWidth: 5000,
      }}/>
      </Form.Item>

      <Form.Item
        name="Input"
        label="Équipe médicale"
        rules={[
          {
           
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Créer l'évènement
        </Button>
      </Form.Item>
      <Divider />

    </Form>
      
    
  );
};
export default InscriptiontFom;