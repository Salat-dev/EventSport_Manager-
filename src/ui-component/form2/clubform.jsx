import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Card, notification } from 'antd';
import { supabase } from '../../supabaseClient'; // Assurez-vous d'avoir configuré supabase

const ClubForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Fonction pour afficher une notification de succès
  const openSuccessNotification = () => {
    notification.success({
      message: 'Succès',
      description: 'Le club a été enregistré avec succès !',
      placement: 'topRight',
    });
  };

  // Fonction pour afficher une notification d'erreur
  const openErrorNotification = (error) => {
    notification.error({
      message: 'Erreur',
      description: `Une erreur s'est produite lors de l'enregistrement : ${error.message}`,
      placement: 'topRight',
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('clubs')
      .insert([{
        club_name: values.club_name,
        coach_name: values.coach_name,
        captain_name: values.captain_name,
        location: values.location,
        events: values.events.join(', '), // Enregistre les épreuves sélectionnées en chaîne de caractères
      }]);

    if (error) {
      openErrorNotification(error); // Affiche la notification d'erreur
      console.error("Erreur lors de l'enregistrement :", error);
    } else {
      openSuccessNotification(); // Affiche la notification de succès
      console.log("Club enregistré avec succès :", data);
    }

    setLoading(false);
    form.resetFields(); // Réinitialise le formulaire après soumission
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <Card style={{ width: '50%', padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>Inscription Club</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Nom du club"
            name="club_name"
            rules={[{ required: true, message: 'Veuillez entrer le nom du club' }]}
          >
            <Input placeholder="Nom du club" />
          </Form.Item>

          <Form.Item
            label="Nom du Coach"
            name="coach_name"
            rules={[{ required: true, message: 'Veuillez entrer le nom du coach' }]}
          >
            <Input placeholder="Nom du Coach" />
          </Form.Item>

          <Form.Item
            label="Nom du Capitaine"
            name="captain_name"
            rules={[{ required: true, message: 'Veuillez entrer le nom du capitaine' }]}
          >
            <Input placeholder="Nom du Capitaine" />
          </Form.Item>

          <Form.Item
            label="Localisation"
            name="location"
            rules={[{ required: true, message: 'Veuillez entrer la localisation' }]}
          >
            <Input placeholder="Localisation du club" />
          </Form.Item>

          <Form.Item
            label="Épreuve"
            name="events"
            rules={[{ required: true, message: 'Veuillez sélectionner au moins une épreuve' }]}
          >
            <Checkbox.Group>
              <Row>
                <Col span={8}>
                  <Checkbox value="Kata">Kata</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Kumite">Kumite</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Les deux">Les deux</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
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

export default ClubForm;
