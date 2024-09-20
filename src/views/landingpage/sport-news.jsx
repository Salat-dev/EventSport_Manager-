import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import i1 from './img/i1.jpg'

const sportsArticles = [
  {
    id: 1,
    title: "Victoire incroyable de l'équipe A",
    image: i1,
    link: "#"
  },
  {
    id: 2,
    title: "Record battu lors du match B",
    image: "https://source.unsplash.com/random/300x200?sport2",
    link: "#"
  },
  {
    id: 3,
    title: "Analyse du match C",
    image: "https://source.unsplash.com/random/300x200?sport3",
    link: "#"
  }
];

const SportsNewsSection = () => {
  return (
    <div style={{ padding: '20px', background: '#f0f2f5' }}>
      <Row gutter={[16, 16]} justify="center">
        {sportsArticles.map(article => (
          <Col key={article.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={article.title} src={article.image} />}
              style={{ borderRadius: '8px', overflow: 'hidden' }}
            >
              <Card.Meta title={article.title} />
              <a href={article.link} style={{ marginTop: '10px', display: 'block' }}>
                En savoir plus
              </a>
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="primary" href="#" shape="round">
          Afficher plus
        </Button>
      </div>
    </div>
  );
};

export default SportsNewsSection;
