import React from 'react';
import { Button, Col, Row, Statistic } from 'antd';
import { useNavigate } from 'react-router-dom';

function CountCard() {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/List-athlete'); // Remplacez par l'URL de votre destination
    };
     return  (
  <Row gutter={16}>
    <Col span={12}>
      
      <Statistic title="Nombre total des athlètes" value={112893} precision={2} />
      <Button
      style={{ marginTop: 16 }}
      type="primary"
      onClick={handleClick}
    >
      Afficher la liste
    </Button>
    </Col>
   
  </Row>
);
}
export default CountCard;