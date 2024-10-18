import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { supabase } from '../../supabaseClient'; 

const { Title, Paragraph } = Typography;

const { Content } = Layout;

const Soon = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Fonction pour récupérer les événements à venir
  const fetchUpcomingEvents = async () => {
    const { data, error } = await supabase
      .from('events_calendar')
      .select('*')
      .gte('date', new Date().toISOString()) // Récupère les événements dont la date est supérieure ou égale à la date actuelle
      .order('date', { ascending: true });

    if (error) {
      console.error('Erreur lors de la récupération des événements:', error);
    } else {
      setUpcomingEvents(data);
    }
  };

  useEffect(() => {
    fetchUpcomingEvents(); // Appel à la fonction de récupération des événements au montage du composant
  }, []);

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      {/* SECTION ÉVÉNEMENTS À VENIR */}
      <Content style={{ padding: '50px', backgroundColor: '#fff' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Événements à venir</Title>
        <Row gutter={[16, 16]}>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <Col span={8} key={event.id}>
                <Card hoverable title={event.title} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <CalendarOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
                  <Paragraph><strong>Date :</strong> {new Date(event.date).toLocaleDateString()}</Paragraph>
                  <Paragraph><strong>Lieu :</strong> {event.venue}</Paragraph>
                  <Paragraph><strong>Tickets :</strong> {event.tickets}</Paragraph>
                </Card>
              </Col>
            ))
          ) : (
            <Paragraph>Aucun événement à venir.</Paragraph>
          )}
        </Row>
      </Content>
    </Layout>
  );
};

export default Soon;
