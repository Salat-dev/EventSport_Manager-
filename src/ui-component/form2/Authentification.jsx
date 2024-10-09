import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Card } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import LOGO from '../LOGO.png'; // Assurez-vous de mettre l'image correcte ici

const { Option } = Select;

// Créez un client Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthenticationForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const { username, password, role } = values;

    // Vérifiez si l'utilisateur existe et correspond au mot de passe
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', username)
      .eq('password', password) // Vous devriez hacher le mot de passe lors de l'insertion et de la vérification
      .single();

    if (error || !data) {
      setLoading(false);
      message.error('Échec de la connexion.');
      return;
    }

    if (data.role !== role) {
      setLoading(false);
      message.error('Le rôle sélectionné ne correspond pas à celui de votre compte.');
      return;
    }

    // Connexion réussie
    setLoading(false);
    message.success(`Connexion réussie en tant que ${role}`);

    // Redirection basée sur le rôle
    switch (role) {
      case 'manager':
        navigate('/dashboard'); // Redirige vers le dashboard du manager
        break;
      case 'coach':
        navigate('/landing-page'); // Redirige vers la landing page du coach
        break;
      case 'visitor':
        navigate('/landingpage'); // Redirige vers les matchs en direct
        break;
      case 'federation_member':
        navigate('/athlete-dashboard'); // Redirige vers un dashboard spécifique aux athlètes
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '900px',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
        bodyStyle={{ padding: 0 }}
      >
        {/* LOGO à gauche */}
        <div style={{ flex: 1, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={LOGO}
            alt="LOGO d'authentification"
            style={{ width: '50%', height: 'auto' }}
          />
<div style={{ flex: 1, padding: '30px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Connexion</h2>

          <Form
            form={form}
            name="authForm"
            onFinish={onFinish}
            layout="vertical"
            style={{ width: '110%' }}
          >
            {/* Adresse e-mail */}
            <Form.Item
              label="Adresse e-mail"
              name="username"
              rules={[{ required: true, message: 'Veuillez entrer votre adresse e-mail!' }]}
            >
              <Input />
            </Form.Item>

            {/* Mot de passe */}
            <Form.Item
              label="Mot de passe"
              name="password"
              rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
            >
              <Input.Password />
            </Form.Item>

            {/* Rôle */}
            <Form.Item
              label="Rôle"
              name="role"
              rules={[{ required: true, message: 'Veuillez sélectionner votre rôle!' }]}
            >
              <Select placeholder="Sélectionnez un rôle">
                <Option value="manager">Manager de l'événement</Option>
                <Option value="visitor">Visiteur</Option>
                <Option value="federation_member">Membre de la fédération</Option>
                <Option value="coach">Coach</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}     style={{ backgroundColor: '#c01c15', borderColor: '#c01c15',width: '100%'  }}>
                Se connecter
              </Button>
            </Form.Item>

            {/* Lien Créer un compte */}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <span>Pas encore de compte ? <Link to="/registration">Créer un compte</Link></span>
            </div>
          </Form>
        </div>

        </div>

        {/* Formulaire à droite */}
        
      </Card>
    </div>
  );
};

export default AuthenticationForm;
