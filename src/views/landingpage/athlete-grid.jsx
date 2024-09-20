import React, { useState } from 'react';
import { Card, Col, Row, Input } from 'antd';
import { TeamOutlined, SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const athletes = [
  {
    name: 'John Doe',
    image: 'https://via.placeholder.com/200x300',
    palmares: 'Champion du Monde 2020, Médaillé d’or Olympique 2021',
  },
  {
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/200x300',
    palmares: 'Championne d’Europe 2019, Médaillée d’argent Olympique 2021',
  },
  {
    name: 'Alex Brown',
    image: 'https://via.placeholder.com/200x300',
    palmares: 'Champion National 2018, Bronze aux Championnats du Monde 2020',
  },
  {
    name: 'Emily White',
    image: 'https://via.placeholder.com/200x300',
    palmares: 'Championne Panaméricaine 2019, Or aux Jeux Olympiques 2021',
  },
];

const AthletesGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les athlètes en fonction du terme de recherche
  const filteredAthletes = athletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#001f3f' }}>
        <TeamOutlined /> Nos Athlètes
      </h1>
      
      {/* Barre de recherche */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <Search
          placeholder="Rechercher un athlète"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '500px', width: '100%' }}
        />
      </div>
      
      {/* Grille de cartes */}
      <Row gutter={[16, 16]} justify="center">
        {filteredAthletes.length > 0 ? (
          filteredAthletes.map((athlete, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                hoverable
                cover={<img alt={athlete.name} src={athlete.image} style={{ borderRadius: '8px' }} />}
                style={{
                  textAlign: 'center',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#ffffff',
                }}
              >
                <h2 style={{ fontSize: '20px', color: '#1890ff' }}>{athlete.name}</h2>
                <p style={{ fontSize: '16px', color: '#555' }}>{athlete.palmares}</p>
              </Card>
            </Col>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '18px' }}>Aucun athlète trouvé.</p>
        )}
      </Row>
    </div>
  );
};

export default AthletesGrid;
