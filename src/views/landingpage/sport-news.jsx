import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Layout, Input, Button, Row, Col, Card, Typography, Avatar } from 'antd';
import { BellOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import './EventInfo.css'; // Assurez-vous d'avoir un fichier CSS pour des styles supplémentaires

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const athletes = [
  {
    name: 'John Doe',
    country: 'USA',
    image: 'https://via.placeholder.com/300x300',
    performance: 'Champion du Monde 2024',
  },
  {
    name: 'Jane Smith',
    country: 'FR',
    image: 'https://via.placeholder.com/300x300',
    performance: 'Record national 2024',
  },
  {
    name: 'Takashi Yamada',
    country: 'JP',
    image: 'https://via.placeholder.com/300x300',
    performance: 'Double médaillé d’or',
  },
];

const news = [
  {
    title: 'Le tournoi national débute demain !',
    description: 'Le championnat de Karaté le plus attendu commence demain à Paris.',
    image: 'https://via.placeholder.com/400x250',
  },
  {
    title: 'Jane Smith bat un record historique',
    description: 'La star du Karaté français bat un record lors de la dernière compétition internationale.',
    image: 'https://via.placeholder.com/400x250',
  },
  {
    title: 'Club de Tokyo remporte 3 médailles',
    description: 'Le club de Tokyo continue sa série de victoires avec 3 nouvelles médailles d’or.',
    image: 'https://via.placeholder.com/400x250',
  },
];

const clubs = [
  {
    name: 'Club de Paris',
    image: 'https://via.placeholder.com/200x200',
    description: 'L’un des clubs les plus performants d’Europe avec plusieurs médailles d’or.',
  },
  {
    name: 'Club de Tokyo',
    image: 'https://via.placeholder.com/200x200',
    description: 'Club dominant au niveau international avec des champions mondiaux.',
  },
  {
    name: 'Club de New York',
    image: 'https://via.placeholder.com/200x200',
    description: 'Club réputé pour sa discipline et ses athlètes de renommée mondiale.',
  },
];



const HeroSection = () => {
  return (
    <div className="hero-section" style={{
      backgroundImage: 'url(/path/to/herpo.jpeg)', // Replace with your image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '500px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#fff'
    }}>
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '40px', borderRadius: '10px' }}>
        <Title level={1} style={{ color: '#fff' }}>Pioneering Sports Investment for Tomorrow's Champions</Title>
        <Paragraph style={{ color: '#fff', fontSize: '18px' }}>Empowering the next generation of athletes with world-class support and sponsorships.</Paragraph>
        <Button type="primary" size="large" style={{ marginTop: '20px' }}>Sign Up</Button>
      </div>
    </div>
  );
};

const EventInfo = () => {
  return (
    <Layout className="bg-gray-50 min-h-screen">
      {/* HEADER */}
      <Header style={{ backgroundColor: '#282c34', padding: '0 50px', display: 'flex', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src="https://via.placeholder.com/150x50" alt="Logo" className="h-10" />
          </Link>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Rechercher..."
            style={{ width: 300, borderRadius: 5 }}
          />
        </div>
        <div className="flex items-center space-x-6">
          <Button type="text" icon={<BellOutlined />} />
          <Avatar icon={<UserOutlined />} />
        </div>
      </Header>

      {/* MAIN CONTENT */}
      <Content style={{ padding: '24px', marginTop: '64px' }}>
        

        {/* SECTION ATHLÈTES */}
        <section className="container mx-auto px-4 py-8">
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50' }}>Athlètes en Tête</Title>
          <Row gutter={[32, 32]} justify="center">
            {athletes.map((athlete, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cover={
                    <img
                      alt={athlete.name}
                      src={athlete.image}
                      style={{ height: 100, width: 100, objectFit: 'cover', borderRadius: '50%', margin: '20px auto' }}
                    />
                  }
                >
                  <Card.Meta
                    title={athlete.name}
                    description={`${athlete.country} - ${athlete.performance}`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* SECTION CLUBS */}
        <section className="container mx-auto px-4 py-8">
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50' }}>Clubs les Plus Performants</Title>
          <Row gutter={[32, 32]} justify="center">
            {clubs.map((club, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cover={
                    <img
                      alt={club.name}
                      src={club.image}
                      style={{ height: 100, width: 100, objectFit: 'cover', borderRadius: '50%', margin: '20px auto' }}
                    />
                  }
                >
                  <Card.Meta
                    title={club.name}
                    description={club.description}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* SECTION ÉVÉNEMENTS À VENIR */}
        <section className="container mx-auto px-4 py-8">
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50' }}>Événements à Venir</Title>
          <Card style={{ textAlign: 'center', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>Championnat National - Paris | 15 Octobre 2024</li>
              <li>Open International - Lyon | 20 Novembre 2024</li>
              <li>Tournoi de Tokyo | 10 Décembre 2024</li>
            </ul>
          </Card>
        </section>
      </Content>

      {/* FOOTER */}
      <Footer style={{ textAlign: 'center', backgroundColor: '#282c34', color: '#fff' }}>
        <Paragraph>© 2024 Championnat Mondial de Karaté. Tous droits réservés.</Paragraph>
      </Footer>
    </Layout>
  );
};

export default EventInfo;
