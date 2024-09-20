import React from 'react';
import { Card, Button, Row, Col } from 'antd';

const athletes = [
  { name: 'Coupe du Cameroun  du KARATE', image: 'https://via.placeholder.com/100' },
  { name: 'Athlete 2', image: 'https://via.placeholder.com/100' },
  { name: 'Athlete 3', image: 'https://via.placeholder.com/100' },
  // Ajoutez plus d'athlètes ici
];

const LiveSection = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
        <Col>
          <h2 style={{ color: '#fff' }}>En direct</h2>
        </Col>
        <Col>
          <Button type="primary">View All</Button>
        </Col>
      </Row>
      <Row justify="center" gutter={16} wrap={false} style={{ overflowX: 'auto' }}>
        {athletes.map((athlete, index) => (
          <Col key={index} style={{ flex: '0 0 auto' }}>
            <Card
              hoverable
              cover={<img alt={athlete.name} src={athlete.image} />}
              style={{ width: 200, backgroundColor: '#1e3a5f' }}
            >
              <Card.Meta title={athlete.name} style={{ textAlign: 'center', color: '#fff' }} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LiveSection;