import React, { useState } from 'react';
import {
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
  notification
} from 'antd';
import { Button } from '@mui/material';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { PlusOutlined } from '@ant-design/icons';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const App = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    console.log('Form values:', values);
    const { nom, prenom, nationalite, sexe, age,  upload } = values;
    let photo_url = null;

    if (upload && upload.length > 0) {
      const file = upload[0].originFileObj;
      console.log('Uploading file:', file);

      const { data, error } = await supabase
        .storage
        .from('athletes-photos') // Assurez-vous que ce conteneur existe dans Supabase Storage
        .upload(`public/${file.name}`, file, {
          cacheControl: '5',
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
      .from('arbitres')
      .insert([
        { 
          nom, 
          prenom, 
          nationalite, 
          sexe, 
           age, 
          photo_url 
        }
      ]);

    if (insertError) {
      notification.error({
        message: 'Erreur lors de l\'insertion',
        description: insertError.message,
      });
    } else {
      notification.success({
        message: 'Arbitre enregistré avec succès!',
        description: 'L\'arbitre a été ajouté avec succès.',
      });
      form.resetFields(); // Réinitialiser le formulaire après l'envoi
      setTimeout(() => {
        window.location.href = 'List-arbitre';  
          }, 1000);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      initialValues={{ size: componentSize }}
      onValuesChange={({ size }) => setComponentSize(size)}
      size={componentSize}
      style={{ maxWidth: 1000 }}
      onFinish={handleFinish}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Nom" name="nom">
        <Input />
      </Form.Item>
      <Form.Item label="Prénom" name="prenom">
        <Input />
      </Form.Item>
     
      <Form.Item label="Nationalité" name="nationalite">
        <Input />
      </Form.Item>
      <Form.Item label="Sexe" name="sexe">
        <Select>
          <Select.Option value="Homme">Homme</Select.Option>
          <Select.Option value="Femme">Femme</Select.Option>
        </Select>
      </Form.Item>

     
      <Form.Item label="Date de Naissance" name="age">
        <DatePicker />
      </Form.Item>
     
      <Form.Item
        label="Upload"
        name="upload"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
      >
        <Upload listType="picture-card">
          <button type="button" style={{ border: 0, background: 'none' }}>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button
          style={{ position: 'relative', marginLeft: '300px' }}
          variant="contained"
          endIcon={<DoneRoundedIcon />}
          type="submit"
        >
          Valider
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
