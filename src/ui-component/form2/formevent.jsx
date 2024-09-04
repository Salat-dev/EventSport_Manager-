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
} from 'antd';
import SecondForm from './flexform';
import ItemForm from './itemform';
import { color } from '@mui/system';
import { blue } from '@mui/material/colors';
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
const EventFom = () => {
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
        maxWidth: 1000,
      }}
      initialValues={{
        variant: componentVariant,
      }}
    >
      <Form.Item label="Form variant" name="variant">
        <Segmented options={['outlined', 'filled', 'borderless']} />
      </Form.Item>

      <Form.Item label="*INFORMATIONS DE L'ÉVÈNEMENT" > 
      </Form.Item>
      <Form.Item
        label="Titre de l'évènement"
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
        label="Description"
        name="TextArea"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="checkbox-group" label="Épreuves du tournoi">
      <Checkbox.Group>
        <Row>
          <Col span={8}>
            <Checkbox
              value="KATA"
              style={{
                lineHeight: '32px',
              }}
            >
            KATA
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox
              value="KUMITE"
              style={{
                lineHeight: '32px',
              }}
            
            >
              KUMITE
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox
              value="C"
              style={{
                lineHeight: '32px',
              }}
            >
              KATA et KUMITE
            </Checkbox>
          </Col>
        
        
        </Row>
      </Checkbox.Group>
    </Form.Item>

      <Form.Item
        label="Lieu"
        name="Select"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Select />
      </Form.Item>

      

      <Form.Item
        label="Periode de l'évènement"
        name="RangePicker"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <RangePicker />
      </Form.Item>




      <Form.Item
        label="Date limite des inscriptions"
        name="DatePicker"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item label="*INFORMATIONS SUPLÉMENTAIRES"
      style={{color:'red'}} > 
      </Form.Item>
      <Form.Item
        label="Moyen de transport"
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
        label="Hebergement"
        name="Input"
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
        label="Ajouter un sponsor"
        rules={[
          {
           
            message: 'Please input!',
          },
        ]}
      >
        <ItemForm />
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
    </Form>
  );
};
export default EventFom;