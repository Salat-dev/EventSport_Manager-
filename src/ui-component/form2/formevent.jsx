import React, { useState } from 'react';
import { Checkbox, Col, Row, Button, DatePicker, Form, Input, Select, Segmented,notification } from 'antd';
import { Image } from 'antd';
import { createClient } from '@supabase/supabase-js';
import event from './event.png'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};


const EventForm = () => {
  const [componentVariant, setComponentVariant] = useState('filled');

  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    console.log('Form values:', values);
    const { title, description,epreuve,location,period,deadline,transport,hebergement,medical_team,  upload } = values;
    let logo_url = null;

    if (upload && upload.length > 0) {
      const file = upload[0].originFileObj;
      console.log('Uploading file:', file);

      const { data, error } = await supabase
        .storage
        .from('coachs-photos') // Assurez-vous que ce conteneur existe dans Supabase Storage
        .upload(`public/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Erreur lors du téléchargement:', error.message);
        notification.error({
          message: 'Erreur lors du téléchargement',
          description: error.message,
          
        });
        return;
      }

      photo_url = data.path; // L'URL du fichier peut être obtenue après upload si nécessaire
    }

    const { error: insertError } = await supabase
      .from('event_list')
      .insert([
        { 
          title, 
          description,
          epreuve,
          location,
          period,
          deadline,
          transport,
          hebergement,
          medical_team,
          logo_url 

        }
      ]);

    if (insertError) {
      notification.error({
        message: 'Erreur lors de la création',
        description: insertError.message,
      });
    } else {
      notification.success({
        message: 'Évènement crée avec succès!',
        description: 'L\'évènement a été ajouté avec succès.',
      });
      form.resetFields(); // Réinitialiser le formulaire après l'envoi
      setTimeout(() => {
        window.location.href = 'evenements';  
          }, 1000);
    }
  };

  const onFormVariantChange = ({ variant }) => {
    setComponentVariant(variant);
  };

  return (
    <Row gutter={[24, 24]} style={{ padding: '40px', backgroundColor: '#f0f2f5' }}>
      {/* Section de l'image à gauche */}
      <Col xs={24} sm={12} lg={10}>
        <Image
          width="100%"
          height="805px"
        src={event} // Remplacez par l'image souhaitée
          alt="Illustration d'évènement"
          preview={false}
          style={{ borderRadius: '10px' }}
        />
      </Col>

      {/* Formulaire à droite */}
      <Col xs={24} sm={12} lg={14}>
        <Form
          {...formItemLayout}
          onValuesChange={onFormVariantChange}
          variant={componentVariant}
          style={{ maxWidth: 1000, backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}
          initialValues={{ variant: componentVariant }}
          onFinish={handleFinish}
          
        >
          <Form.Item label="Form variant" name="variant">
            <Segmented options={['outlined', 'filled', 'borderless']} />
          </Form.Item>

          <Form.Item label="*DONNÉE DE L'ÉVÈNEMENT" />

          <Form.Item
            label="Titre de l'évènement"
            name="title"
            rules={[{ required: true, message: 'Veuillez entrer un titre' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Veuillez entrer une description' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="epreuve" label="Épreuves du tournoi">
            <Checkbox.Group>
              <Row>
                <Col span={8}>
                  <Checkbox value="KATA">KATA</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="KUMITE">KUMITE</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="KATA et KUMITE">KATA et KUMITE</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="Lieu" name="location" rules={[{ required: true, message: 'Veuillez entrer un lieu' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Période de l'évènement" name="period" rules={[{ required: true, message: 'Veuillez entrer une période' }]}>
            <RangePicker />
          </Form.Item>

          <Form.Item
            label="Date limite des inscriptions"
            name="deadline"
            rules={[{ required: true, message: 'Veuillez entrer une date limite' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item label="*DONNÉE SUPLÉMENTAIRES" style={{ color: 'red' }} />

          <Form.Item label="Moyen de transport" name="transport">
            <Input />
          </Form.Item>

          <Form.Item label="Hébergement" name="hebergement">
            <Input />
          </Form.Item>

          <Form.Item label="Équipe médicale" name="medical_team">
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
      </Col>
    </Row>
  );
};

export default EventForm;
