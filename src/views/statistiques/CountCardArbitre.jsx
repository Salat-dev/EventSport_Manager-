import React from 'react';
import { Button, Col, Row, Statistic } from 'antd';
const CountCardArbitre = () => (
  <Row gutter={16}>
    <Col span={12}>
      
      <Statistic title="Nombre total des arbitres" value={112893} precision={2} />
      <Button
        style={{
          marginTop: 16,
        }}
        type="primary"
      >
        Afficher la liste
      </Button>
    </Col>
   
  </Row>
);
export default CountCardArbitre;