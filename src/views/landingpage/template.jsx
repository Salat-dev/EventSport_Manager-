import React from 'react';
import { Layout, Menu, Button, Row, Col, Card, Typography, List, Avatar,Space } from 'antd';
import { ShoppingCartOutlined, VideoCameraOutlined, TrophyOutlined, TeamOutlined, EnvironmentOutlined,SearchOutlined } from '@ant-design/icons';
import logo from './img/logo.svg';
import { Link } from 'react-router-dom'; // Importation de Link
import EventList from 'ui-component/tableau/event_list';



const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const upcomingEvents = [
  { title: 'Championnat National de Karaté', date: '15 Octobre 2024', city: 'Paris', venue: 'Palais des Sports' },
  { title: 'Open International de Karaté', date: '20 Novembre 2024', city: 'Lyon', venue: 'Stade de Gerland' },
  { title: 'Coupe de France de Karaté', date: '5 Décembre 2024', city: 'Marseille', venue: 'Parc Chanot' },
];

const partners = [
  { name: 'Sponsor 1', logo: 'https://via.placeholder.com/64' },
  { name: 'Sponsor 2', logo: 'https://via.placeholder.com/64' },
  { name: 'Sponsor 3', logo: 'https://via.placeholder.com/64' },
];

const products = [
  { name: 'Kimono de Karaté', price: '80€', image: 'https://via.placeholder.com/200' },
  { name: 'Gants de Karaté', price: '30€', image: 'https://via.placeholder.com/200' },
  { name: 'Ceinture Noire', price: '20€', image: 'https://via.placeholder.com/200' },
];

const Landing = () => {
  return (
    <Layout>
      {/* HEADER */}
      <Header style={{ backgroundColor: '#fff', padding: '0 50px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      {/* Logo à gauche */}
      <div style={{ fontWeight: 'bold', fontSize: '40px', color: '#1890ff' }}>
      <img src={logo} alt="Berry" width="70" height="100 "/>
      </div>

      {/* Menu centré avec icône de recherche */}
      <Menu mode="horizontal" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', borderBottom: 'none' }}>
      <Menu.Item key="1">
        <Link to="/">Accueil</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/athlete-grid">Athlètes</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/actualite">Actualité</Link>
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
      
      {/* Icône de recherche et boutons à droite */}
      <Space size="large">
        <Button icon={<SearchOutlined />} type="text" />
        <Button type="default">  <Link to="/Authentification">Login</Link></Button>
        <Button type="default"><Link to="/Registration">S'enregistrer</Link></Button>
      </Space>
    </Header>

      {/* HERO SECTION */}
      <Content style={{ padding: '50px', backgroundColor: '#f0f2f5', textAlign: 'center' }}>
        <Title level={1}>Championnat Mondial de Karaté 2024</Title>
        <Paragraph style={{ fontSize: '18px' }}>
          Suivez les plus grands champions de karaté en direct. Réservez vos tickets dès maintenant !
        </Paragraph>
        <Button type="primary" icon={<VideoCameraOutlined />} size="large" style={{ margin: '10px' }}>
          Suivre en ligne
        </Button>
        <Button type="primary" icon={<ShoppingCartOutlined />} size="large" style={{ margin: '10px' }}>
          Réserver des tickets
        </Button>
      </Content>

      {/* ACTUALITES ET PERFORMANCES */}
      <Content style={{ padding: '50px', backgroundColor: '#fff' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Dernières Actualités et Performances</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card hoverable>
              <TrophyOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
              <Title level={3}>Performances des athlètes</Title>
              <Paragraph>
                Découvrez les performances des meilleurs athlètes de karaté lors des dernières compétitions.
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable>
              <TeamOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
              <Title level={3}>Actualités des événements</Title>
              <Paragraph>
                Restez informé des dernières nouvelles concernant les compétitions de karaté à venir.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* BOUTIQUE SECTION */}
      <Content style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Produits de la Boutique</Title>
        <Row gutter={[16, 16]}>
          {products.map(product => (
            <Col span={8} key={product.name}>
              <Card hoverable cover={<img alt={product.name} src={product.image} />}>
                <Card.Meta title={product.name} description={product.price} />
                <Button type="primary" block style={{ marginTop: '10px' }}>
                  Acheter
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      {/* PROCHAIN EVENEMENT */}
      <Content style={{ padding: '50px', backgroundColor: '#fff' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Prochain Événement</Title>
        <Card hoverable style={{ textAlign: 'center' }}>
          <EnvironmentOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          <Title level={3}>Championnat National de Karaté</Title>
          <Paragraph>
            <strong>Date :</strong> 15 Octobre 2024<br />
            <strong>Ville :</strong> Paris<br />
            <strong>Salle :</strong> Palais des Sports
          </Paragraph>
        </Card>
      </Content>

      {/* TOUS LES EVENEMENTS A VENIR */}
      <Content style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Événements à venir</Title>
         <EventList/>
      </Content>

      {/* PARTENAIRES */}
      <Content style={{ padding: '50px', backgroundColor: '#fff' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Nos Partenaires</Title>
        <Row gutter={[16, 16]} justify="center">
          {partners.map(partner => (
            <Col span={4} key={partner.name} style={{ textAlign: 'center' }}>
              <img src={partner.logo} alt={partner.name} style={{ width: '100px' }} />
              <Paragraph>{partner.name}</Paragraph>
            </Col>
          ))}
        </Row>
      </Content>

      {/* FOOTER */}
      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff' }}>
        <Paragraph>© 2024 Championnat Mondial de Karaté. Tous droits réservés.</Paragraph>
        <Button type="link" href="#" style={{ color: '#fff' }}>
          Politique de confidentialité
        </Button>
      </Footer>
    </Layout>
  );
};

export default Landing;
