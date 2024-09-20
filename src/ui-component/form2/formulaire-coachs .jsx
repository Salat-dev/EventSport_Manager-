import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, message, Card, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { supabase } from '../../supabaseClient'; // Assurez-vous d'avoir configuré Supabase

const { Option } = Select;

const CoachForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Récupérer les clubs depuis Supabase
  useEffect(() => {
    const fetchClubs = async () => {
      const { data, error } = await supabase.from('clubs').select('club_name');
      if (error) {
        message.error(`Erreur lors de la récupération des clubs : ${error.message}`);
      } else {
        setClubs(data);
      }
    };
    fetchClubs();
  }, []);

  // Gérer l'upload d'image
  const handleImageUpload = async ({ file, onSuccess, onError }) => {
    setUploading(true);
    
    // Générer un nom de fichier unique
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    // Uploader l'image dans le bucket Supabase
    const { data, error } = await supabase.storage
      .from('coach_images') // Nom du bucket
      .upload(`public/${fileName}`, file);

    if (error) {
      message.error(`Erreur lors de l'upload de l'image : ${error.message}`);
      onError(error);
      setUploading(false);
    } else {
      // Récupérer l'URL publique de l'image uploadée
      const { publicURL, error: urlError } = supabase
        .storage
        .from('coach_images')
        .getPublicUrl(`public/${fileName}`);

      if (urlError) {
        message.error(`Erreur lors de la récupération de l'URL de l'image : ${urlError.message}`);
        setUploading(false);
      } else {
        setImageUrl(publicURL);
        message.success('Image uploadée avec succès');
        onSuccess(data);
        setUploading(false);
      }
    }
  };

  // Gérer la soumission du formulaire
  const onFinish = async (values) => {
    setLoading(true);

    const { error } = await supabase
      .from('coachs') // Nom de la table corrigé
      .insert([{
        first_name: values.first_name,
        last_name: values.last_name,
        club: values.club,
        birth_date: values.birth_date,
        image_url: imageUrl || null, // Insérer l'URL de l'image si elle existe, sinon null
      }]);

    if (error) {
      message.error(`Erreur lors de l'enregistrement des données : ${error.message}`);
    } else {
      message.success('Entraîneur enregistré avec succès');
      form.resetFields(); // Réinitialiser le formulaire
      setImageUrl(null); // Réinitialiser l'image
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '60%', padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>Inscription Entraîneur</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Nom de l'entraîneur"
            name="last_name"
            rules={[{ required: true, message: 'Veuillez entrer le nom de l\'entraîneur' }]}
          >
            <Input placeholder="Nom" />
          </Form.Item>

          <Form.Item
            label="Prénom de l'entraîneur"
            name="first_name"
            rules={[{ required: true, message: 'Veuillez entrer le prénom de l\'entraîneur' }]}
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
            label="Date de naissance"
            name="birth_date"
            rules={[{ required: true, message: 'Veuillez sélectionner la date de naissance' }]}
          >
            <DatePicker placeholder="Date de naissance" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Photo de l'entraîneur"
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

export default CoachForm;
