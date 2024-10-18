import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Typography, Button, Select, InputNumber, Form, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { createClient } from '@supabase/supabase-js';

const { Content, Header, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


const TicketReservationPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fonction pour récupérer les événements depuis Supabase
  const fetchEvents = async () => {
    try {
      // Requête pour récupérer les événements
      const { data, error } = await supabase
        .from('events_calendar')
        .select('id, title');

      if (error) {
        throw error; // Affiche l'erreur si la requête échoue
      }

      if (data.length === 0) {
        message.warning('Aucun événement trouvé dans la base de données.');
      } else {
        setEvents(data); // Stocke les événements récupérés dans l'état
      }
    } catch (error) {
      // Affiche l'erreur dans la console et avec un message
      console.error('Erreur lors de la récupération des événements :', error.message);
      message.error('Erreur lors de la récupération des événements.');
    }
  };

  // Utilisation de useEffect pour charger les événements dès le chargement de la page
  useEffect(() => {
    fetchEvents(); // Appelle la fonction pour récupérer les événements
  }, []);

  const handleEventChange = (value) => {
    const event = events.find((event) => event.id === value);
    setSelectedEvent(event);
  };

  const handleSubmit = () => {
    if (!selectedEvent) {
      message.error('Veuillez sélectionner un événement');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(`Réservation confirmée pour ${ticketCount} billet(s) à l'événement "${selectedEvent.title}"`);
    }, 1500);
  };

  return (
    <Layout style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* HEADER */}
      <Header
        style={{
          position: 'fixed',
          width: '100%',
          zIndex: 1000,
          backgroundColor: '#001529',
          padding: '0 50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Title style={{ color: '#fff', margin: '0', fontSize: '24px' }}>Réservation de Tickets - Championnats de Karaté</Title>
      </Header>

      {/* CONTENT */}
      <Content style={{ marginTop: '80px', padding: '50px', backgroundColor: '#f0f2f5' }}>
        <Row gutter={[16, 16]} justify="center">
          <Col span={12}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>Réservez vos Tickets</Title>
              <Form layout="vertical" onFinish={handleSubmit}>
                {/* Sélection de l'événement */}
                <Form.Item label="Choisissez un événement" required>
                  <Select
                    placeholder="Sélectionner un événement"
                    onChange={handleEventChange}
                    style={{ width: '100%' }}
                  >
                    {events.map((event) => (
                      <Option key={event.id} value={event.id}>
                        {event.title} - {event.date} ({event.venue})
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Sélection du nombre de tickets */}
                <Form.Item label="Nombre de tickets" required>
                  <InputNumber
                    min={1}
                    max={10}
                    value={ticketCount}
                    onChange={(value) => setTicketCount(value)}
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                {/* Affichage du prix total */}
                {selectedEvent && (
                  <Paragraph style={{ textAlign: 'center', fontSize: '18px', marginBottom: '20px' }}>
                    Prix total : <strong>{ticketCount * selectedEvent.price} €</strong>
                  </Paragraph>
                )}

                {/* Bouton de réservation */}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<ShoppingCartOutlined />}
                    style={{ width: '100%', backgroundColor: '#f5222d', borderColor: '#f5222d' }}
                    loading={loading}
                  >
                    Payer et Réserver
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* FOOTER */}
      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff' }}>
        <Paragraph>© 2024 Championnat Mondial de Karaté. Tous droits réservés.</Paragraph>
      </Footer>
    </Layout>
  );
};

export default TicketReservationPage;
