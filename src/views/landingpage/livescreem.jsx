import React from 'react';
import { Layout, Row, Col, Card, Typography, Button } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';

const { Content, Header, Footer } = Layout;
const { Title, Paragraph } = Typography;

const streams = [
  {
    id: 1,
    title: 'Championnat National de Karaté - Finale',
    time: '15:00 - 18:00',
    date: '15 Octobre 2024',
    thumbnail: 'https://via.placeholder.com/300x200', // Image de prévisualisation
  },
  {
    id: 2,
    title: 'Qualification open Kumite de Karaté - Demi-finale',
    time: '16:00 - 19:00',
    date: '20 Novembre 2024',
    thumbnail: 'https://via.placeholder.com/300x200',
  },
  {
    id: 3,
    title: 'Championnat National des cadet de Karaté - Phase de groupes',
    time: '10:00 - 12:00',
    date: '30 Novembre 2024',
    thumbnail: 'https://via.placeholder.com/300x200',
  },
];

const LiveStreamingPage = () => {
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
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Title style={{ color: '#fff', margin: '0', fontSize: '24px' }}>
          Streaming en Direct - Championnats de Karaté
        </Title>
      </Header>

      {/* CONTENT */}
      <Content style={{ marginTop: '80px', padding: '50px', backgroundColor: '#f0f2f5' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          Sélectionnez un événement à regarder en direct
        </Title>
        <Row gutter={[16, 16]}>
          {streams.map((stream) => (
            <Col span={8} key={stream.id}>
              <Card
                hoverable
                cover={<img alt={stream.title} src={stream.thumbnail} />}
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}
              >
                <VideoCameraOutlined style={{ fontSize: '24px', color: '#f5222d', marginBottom: '16px' }} />
                <Title level={3}>{stream.title}</Title>
                <Paragraph><strong>Date :</strong> {stream.date}</Paragraph>
                <Paragraph><strong>Heure :</strong> {stream.time}</Paragraph>
                <Button
                  type="primary"
                  style={{ backgroundColor: '#f5222d', borderColor: '#f5222d' }}
                  onClick={() => alert(`Regarder maintenant : ${stream.title}`)}
                >
                  Regarder maintenant
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      {/* FOOTER */}
      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff' }}>
        <Paragraph>© 2024 Championnat Mondial de Karaté. Tous droits réservés.</Paragraph>
      </Footer>
    </Layout>
  );
};

export default LiveStreamingPage;
