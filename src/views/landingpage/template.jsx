import React from 'react';
import { Layout, Menu, Button, Row, Col, Card, Typography, Space, Carousel, Table } from 'antd';
import { ShoppingCartOutlined, VideoCameraOutlined, TrophyOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Icon from '../../ui-component/Icon.svg';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';

import hero from './img/hero.jpg';


const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const partners = [
  { name: 'Sponsor 1', Icon: 'https://via.placeholder.com/64' },
  { name: 'Sponsor 2', Icon: 'https://via.placeholder.com/64' },
  { name: 'Sponsor 3', Icon: 'https://via.placeholder.com/64' },
];

const columns = [
  { title: 'Nom', dataIndex: 'name', key: 'name' },
  { title: 'Clubs', dataIndex: 'country', key: 'country' },
  { title: 'Score', dataIndex: 'score', key: 'score' },
  { title: 'Médailles', dataIndex: 'medals', key: 'medals' },
];

const athleteScores = [
  { key: '1', name: 'Joseph Tsala ', country: 'VBF', score: 98, medals: '🥇🥈' },
  { key: '2', name: 'Jules Cesar', country: 'VBF', score: 85, medals: '🥇🥉' },
  { key: '3', name: 'Ze Alpha', country: 'CKC', score: 92, medals: '🥇🥇🥉' },
];

const upcomingEvents = [
  { title: 'Championnat National de Karaté', date: '15 Octobre 2024', venue: 'Paris', tickets: '100€' },
  { title: 'Open International de Karaté', date: '20 Novembre 2024', venue: 'Lyon', tickets: '120€' },
];

// Liste d'actualités (Exemple de données)
const actualites = [
  {
    title: 'John Doe remporte la médaille d\'or',
    description: 'John Doe a remporté la médaille d\'or lors du championnat mondial 2024, une performance époustouflante.',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    title: 'Jane Smith bat le record national',
    description: 'Jane Smith a battu le record national lors du dernier tournoi. Elle se prépare pour la compétition internationale.',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    title: 'Nouvelle star montante : Takashi Yamada',
    description: 'Le jeune athlète japonais Takashi Yamada continue de surprendre le monde du karaté avec ses performances impressionnantes.',
    image: 'https://via.placeholder.com/300x200',
  },
];

const Landing = () => {
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      {/* HEADER */}
      <Header
        style={{
          position: 'fixed',
          width: '100%',
          zIndex: 1000,
          backgroundColor: '#fff',
          padding: '0 50px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '40px', color: '#1890ff' }}>
          <img src={Icon} alt="Berry" width="8%" />
        </div>

        {/* Menu centré */}
        <Menu
          mode="horizontal"
          style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', borderBottom: 'none' }}
        >
          <Menu.Item key="1">
            <Link to="/">Accueil</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/athlete-grid">Athlètes</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/sport-news">Actualité</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/ticket">Billetterie</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/">Boutique</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="./panel">Partenaires</Link>
          </Menu.Item>
        </Menu>
        <Space size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button type="default" icon={<LoginOutlined />}>
              <Link to="/Authentification">Login</Link>
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: '#f5222d', borderColor: '#f5222d' }}
              icon={<UserAddOutlined />}
            >
              <Link to="/Registration">S'enregistrer</Link>
            </Button>
          </Space>
      </Header>

      {/* HERO SECTION */}
      <Content style={{ marginTop: '80px', padding: '50px', backgroundColor: '#f0f2f5' }}>
        <Row gutter={16} align="middle">
          {/* Texte à gauche */}
          <Col span={12}>
            <div style={{ padding: '20px' }}>
              <Title level={1} style={{ fontSize: '48px', fontWeight: 'bold', color: '#f5222d' }}>
                Championnat Mondial de Karaté 2024
              </Title>
              <Paragraph style={{ fontSize: '18px', color: '#333' }}>
                Suivez les plus grands champions de karaté en direct. Réservez vos tickets dès maintenant !
              </Paragraph>
              <Button
                type="primary"
                icon={<VideoCameraOutlined />}
                size="large"
                style={{ margin: '10px', backgroundColor: '#f5222d', borderColor: '#f5222d' }}
              >  
              <Link to="/livescreem"> Regarder en live </Link>
              </Button>
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                style={{ margin: '10px', backgroundColor: '#f5222d', borderColor: '#f5222d' }}
              >
             <Link to="/ticketreservation"> Reserver un ticket </Link>

              </Button>
            </div>
          </Col>

          {/* Image à droite */}
          <Col span={12}>
            <img
              src={hero}
              alt="Championnat Mondial de Karaté"
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
          </Col>
        </Row>
      </Content>

      {/* SECTION SCORES ET MÉDAILLES */}
      <Content style={{ padding: '50px', backgroundColor: '#fff' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Tableau des scores et médailles</Title>
        <Table dataSource={athleteScores} columns={columns} pagination={false} style={{ marginBottom: '50px' }} />
      </Content>

      {/* SECTION VIDEO EN DIRECT */}
      <Content style={{ padding: '50px', backgroundColor: '#f0f2f5', textAlign: 'center' }}>
        <Title level={2}>Regardez les combats en direct</Title>
        <Card style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff' }}>
          <VideoCameraOutlined style={{ fontSize: '64px', color: '#fff' }} />
          <Paragraph style={{ color: '#fff' }}>Stream en direct du prochain combat à 15:00</Paragraph>
          <Button type="primary" size="large" style={{ backgroundColor: '#f5222d', borderColor: '#f5222d' }}>Regarder maintenant</Button>
        </Card>
      </Content>

      {/* SECTION DES ATHLÈTES ET PERFORMANCES */}
      <Content style={{ padding: '50px', backgroundColor: '#fff' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Performances des Athlètes</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card hoverable style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <TrophyOutlined style={{ fontSize: '48px', color: '#f5222d' }} />
              <Title level={3}>Meilleures Performances</Title>
              <Paragraph>
                Découvrez les meilleures performances des athlètes.
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <TeamOutlined style={{ fontSize: '48px', color: '#f5222d' }} />
              <Title level={3}>Actualités des Événements</Title>
              <Paragraph>
                Tenez-vous au courant des dernières actualités.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* SECTION ÉVÉNEMENTS À VENIR */}
      <Content style={{ padding: '50px', backgroundColor: '#fff' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Événements à venir</Title>
        <Row gutter={[16, 16]}>
          {upcomingEvents.map(event => (
            <Col span={8} key={event.title}>
              <Card hoverable title={event.title} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <CalendarOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
                <Paragraph><strong>Date :</strong> {event.date}</Paragraph>
                <Paragraph><strong>Lieu :</strong> {event.venue}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      {/* SECTION ANNONCES ET ACTUALITÉS */}
      <Content style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Annonces et Actualités</Title>
        <Row gutter={[16, 16]}>
          {actualites.map((actu, index) => (
            <Col span={8} key={index}>
              <Card
                hoverable
                cover={<img alt={actu.title} src={actu.image} />}
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              >
                <Title level={3}>{actu.title}</Title>
                <Paragraph>{actu.description}</Paragraph>
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

export default Landing;
