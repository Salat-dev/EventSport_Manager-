import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, message, Card, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { supabase } from '../../supabaseClient'; // Assurez-vous d'avoir configuré Supabase

const { Option } = Select;

const OfficialForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Gérer l'upload d'image
  const handleImageUpload = async ({ file, onSuccess, onError }) => {
    setUploading(true);
    
    // Générer un nom de fichier unique
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    // Uploader l'image dans le bucket Supabase
    const { data, error } = await supabase.storage
      .from('official_images') // Nom du bucket
      .upload(`public/${fileName}`, file);

    if (error) {
      message.error('Erreur lors de l\'upload de l\'image');
      onError(error);
      setUploading(false);
    } else {
      // Récupérer l'URL publique de l'image uploadée
      const { publicUrl } = supabase
        .storage
        .from('official_images')
        .getPublicUrl(`public/${fileName}`)
        .data;

      setImageUrl(publicUrl);
      message.success('Image uploadée avec succès');
      onSuccess(data);
      setUploading(false);
    }
  };

  // Gérer la soumission du formulaire
  const onFinish = async (values) => {
    setLoading(true);

    const { error } = await supabase
      .from('official_event')
      .insert([{
        first_name: values.first_name,
        last_name: values.last_name,
        nationality: values.nationality,
        birth_date: values.birth_date,
        category: values.category,
        image_url: imageUrl || null, // Insérer l'URL de l'image si elle existe, sinon null
      }]);

    if (error) {
      message.error('Erreur lors de l\'enregistrement des données');
    } else {
      message.success('Officiel enregistré avec succès');
      form.resetFields(); // Réinitialiser le formulaire
      setImageUrl(null); // Réinitialiser l'image
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '60%', padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>Inscription Officiel</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Nom"
            name="last_name"
            rules={[{ required: true, message: 'Veuillez entrer le nom de l\'officiel' }]}
          >
            <Input placeholder="Nom" />
          </Form.Item>

          <Form.Item
            label="Prénom"
            name="first_name"
            rules={[{ required: true, message: 'Veuillez entrer le prénom de l\'officiel' }]}
          >
            <Input placeholder="Prénom" />
          </Form.Item>

          <Form.Item
            label="Nationalité"
            name="nationality"
            rules={[{ required: true, message: 'Veuillez entrer la nationalité de l\'officiel' }]}
          >
            <Input placeholder="Nationalité" />
          </Form.Item>

          <Form.Item
            label="Date de naissance"
            name="birth_date"
            rules={[{ required: true, message: 'Veuillez sélectionner la date de naissance' }]}
          >
            <DatePicker placeholder="Date de naissance" style={{ width: '100%' }} />
          </Form.Item>           

          <Form.Item
            label="Catégorie"
            name="category"
            rules={[{ required: true, message: 'Veuillez sélectionner une catégorie' }]}
          >
            <Select placeholder="Sélectionner une catégorie">
              <Option value="Arbitre">Arbitre</Option>
              <Option value="Assistant Arbitre">Assistant Arbitre</Option>
              <Option value="Médecin">Médecin</Option>
              <Option value="Autre">Autre</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Photo de l'officiel (Optionnel)"
          >
            <Upload
              name="image"
              customRequest={handleImageUpload}
              listType="picture"
              accept="image/*"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>Télécharger une photo (Optionnel)</Button>
            </Upload>
            {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Enregistrer
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default OfficialForm;
