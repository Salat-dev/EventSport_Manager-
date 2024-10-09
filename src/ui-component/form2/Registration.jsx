import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Select, message, Card } from 'antd';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { Link } from 'react-router-dom';

// Importation de l'image
import Logo from '../LOGO.png';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const { lastname, firstname, email, password, role } = values;

    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      message.error('Un compte existe déjà avec cet e-mail.');
      setLoading(false);
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const { error } = await supabase.from('users').insert([
      { lastname, firstname, email, password, role },
    ]);

    if (error) {
      setLoading(false);
      message.error('Erreur lors de l\'enregistrement: ' + error.message);
    } else {
      message.success('Enregistrement réussi');
      setTimeout(() => {
        window.location.href = 'Authentification';  
      }, 1000);
    }

    setLoading(false);
  };

  const passwordRules = [
    { required: true, message: 'Veuillez entrer votre mot de passe!' },
    { min: 8, message: 'Le mot de passe doit contenir au moins 8 caractères' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (@$!%*?&)',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '900px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Row gutter={16}>
          {/* Colonne pour l'image */}
          <Col xs={24} md={10}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                backgroundColor: '#fff', // Rouge pour illustrer l'exemple
                borderRadius: '10px 0 0 10px', // Arrondi à gauche
              }}
            >
              <img
                src={Logo}
                alt="Logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </Col>

          {/* Colonne pour le formulaire */}
          <Col xs={24} md={14}>
            <div style={{ padding: '30px' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>S'inscrire</h2>
              <Form
                name="registerForm"
                onFinish={onFinish}
                layout="vertical"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Nom"
                      name="lastname"
                      rules={[{ required: true, message: 'Veuillez entrer votre nom!' }]}
                    >
                      <Input placeholder="Votre nom" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Prénom"
                      name="firstname"
                      rules={[{ required: true, message: 'Veuillez entrer votre prénom!' }]}
                    >
                      <Input placeholder="Votre prénom" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Adresse e-mail"
                  name="email"
                  rules={[
                    { required: true, message: 'Veuillez entrer une adresse e-mail valide!' },
                    { type: 'email', message: 'Adresse e-mail invalide!' },
                  ]}
                >
                  <Input placeholder="Votre adresse e-mail" />
                </Form.Item>

                <Form.Item
                  label="Mot de passe"
                  name="password"
                  rules={passwordRules}
                  hasFeedback
                >
                  <Input.Password placeholder="Votre mot de passe" />
                </Form.Item>

                <Form.Item
                  label="Confirmez le mot de passe"
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Veuillez confirmer votre mot de passe!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Les deux mots de passe ne correspondent pas!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirmez votre mot de passe" />
                </Form.Item>

                <Form.Item
                  label="Rôle"
                  name="role"
                  rules={[{ required: true, message: 'Veuillez sélectionner un rôle!' }]}
                >
                  <Select placeholder="Sélectionnez un rôle">
                    <Select.Option value="manager">Manager de l'événement</Select.Option>
                    <Select.Option value="visitor">Visiteur</Select.Option>
                    <Select.Option value="federation_member">Membre de la fédération</Select.Option>
                    <Select.Option value="coach">Coach</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ backgroundColor: '#c01c15', borderColor: '#c01c15',width: '100%'  }}
                  >
                    S'inscrire
                  </Button>
                </Form.Item>


            {/* Lien pour créer un compte */}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <span>
             Vous avez un compte ? <Link to="/Authentification">connectez-vous</Link>
              </span>
            </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default RegistrationForm;
