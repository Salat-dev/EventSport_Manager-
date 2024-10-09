import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, message, Card,DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { supabase } from '../../supabaseClient'; // Assurez-vous d'avoir configuré Supabase

const { Option } = Select;

const AthleteForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [kumite_categories, setKumite_categories] = useState([]);

  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Récupérer les clubs depuis Supabase
  useEffect(() => {
    const fetchClubs = async () => {
      const { data, error } = await supabase.from('clubs').select('club_name');
      if (error) {
        message.error('Erreur lors de la récupération des clubs');
      } else {
        setClubs(data);
      }
    };

    const fetchCategory = async () => {
      const { data, error } = await supabase.from('kumite_categories').select(' weight_category');
      if (error) {
        message.error('Erreur lors de la récupération des categories');
      } else {
        setKumite_categories(data);
      }
    };

    fetchClubs();
    fetchCategory();
  }, 
  
  
  
  []);

  

  // Gérer l'upload d'image
  const handleImageUpload = async ({ file, onSuccess, onError }) => {
    setUploading(true);
    
    // Générer un nom de fichier unique
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    // Uploader l'image dans le bucket Supabase
    const { data, error } = await supabase.storage
      .from('athlete_images') // Nom du bucket
      .upload(`public/${fileName}`, file);

    if (error) {
      message.error('Erreur lors de l\'upload de l\'image');
      onError(error);
      setUploading(false);
    } else {
      // Récupérer l'URL publique de l'image uploadée
      const { publicUrl } = supabase
        .storage
        .from('athlete_images')
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
      .from('athlete_club')
      .insert([{
        first_name: values.first_name,
        last_name: values.last_name,
        club: values.club,
        level: values.level,
        weight: values.weight,
        birth_date: values.birth_date,
        image_url: imageUrl || null, // Insérer l'URL de l'image si elle existe, sinon null
      }]);

    if (error) {
      message.error('Erreur lors de l\'enregistrement des données');
    } else {
      message.success('Athlète enregistré avec succès');
      form.resetFields(); // Réinitialiser le formulaire
      setImageUrl(null); // Réinitialiser l'image
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <Card style={{ width: '60%', padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>Inscription Athlète</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Nom de l'athlète"
            name="last_name"
            rules={[{ required: true, message: 'Veuillez entrer le nom de l\'athlète' }]}
          >
            <Input placeholder="Nom" />
          </Form.Item>

          <Form.Item
            label="Prénom de l'athlète"
            name="first_name"
            rules={[{ required: true, message: 'Veuillez entrer le prénom de l\'athlète' }]}
          >
            <Input placeholder="Prénom" />
          </Form.Item>

          <Form.Item
            label="Club"
            name="club"
            rules={[{ required: true, message: 'Veuillez sélectionner un club' }]}
          >
            <Select placeholder="Sélectionner un club">
              {clubs.map((club, index) => (
                <Option key={index} value={club.club_name}>
                  {club.club_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Niveau"
            name="level"
            rules={[{ required: true, message: 'Veuillez sélectionner un niveau' }]}
          >
            <Select placeholder="Sélectionner le niveau">
              <Option value="Cadets">Cadets</Option>
              <Option value="Juniors">Juniors</Option>
              <Option value="Minims">Minims</Option>
              <Option value="Seniors">Seniors</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Categories"
            name="weight"
            rules={[{ required: true, message: 'Veuillez entrer le poids de l\'athlète' }]}
          >
          <Select placeholder="Sélectionner un club">
              {kumite_categories.map((club, index) => (
                <Option key={index} value={club. weight_category}>
                  {club. weight_category}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Date de naissance"
            name="birth_date"
            rules={[{ required: true, message: 'Veuillez sélectionner la date de naissance' }]}
          >
            <DatePicker placeholder="Date de naissance" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Photo de l'athlète"
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

export default AthleteForm;
