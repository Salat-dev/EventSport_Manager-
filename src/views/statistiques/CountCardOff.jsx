import React from 'react';
import { Button, Col, Row, Statistic } from 'antd';
const CountCardOff = () => (
  <Row gutter={16}>
    <Col span={12}>
      
      <Statistic title="Nombre total des officiels" value={112893} precision={2} />
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
export default CountCardOff;