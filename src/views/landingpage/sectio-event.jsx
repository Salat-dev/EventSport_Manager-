import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import i1 from './img/i1.jpg';
import i5 from './img/i5.jpg';

const images = [i1 ];

const SectionEvent = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Row gutter={24} align="middle">
        <Col xs={24} md={12}>
          <h2 style={{ marginBottom: '16px', color: '#333' }}>Nom de l'Événement</h2>
          <div style={{ marginBottom: '16px' }}>
            <Button type="link" style={{ padding: 0, color: '#1e90ff' }}>Regarder en Direct</Button><br />
            <Button type="link" style={{ padding: 0, color: '#1e90ff' }}>Acheter un Ticket</Button><br />
            <Button type="link" style={{ padding: 0, color: '#1e90ff' }}>En Savoir Plus</Button>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <img
            src={images[currentImage]}
            alt="Slide"
            style={{ width: '50%', borderRadius: '8px' }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SectionEvent;