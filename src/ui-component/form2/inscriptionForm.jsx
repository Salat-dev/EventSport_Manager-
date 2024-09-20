import React from 'react';
import { Card, Row, Col } from 'antd';
import { TeamOutlined, UsergroupAddOutlined, TrophyOutlined, IdcardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './OptionsPage.css';

const options = [
  { title: 'Club', path: '/club_registration', icon: <TeamOutlined /> },
  { title: 'Évènement', path: '/evenement', icon: <UsergroupAddOutlined /> },
  { title: 'Athlète', path: '/athletes', icon: <TrophyOutlined /> },
  { title: 'Officiel', path: '/officiel', icon: <IdcardOutlined /> },
];

const OptionsPage = () => {
  return (
    <div className="options-container">
      <h1 className="page-title">Enregistrements</h1>
      <Row gutter={[16, 16]} justify="center">
        {options.map((option) => (
          <Col key={option.title} xs={24} sm={12} md={8} lg={6}>
            <Link to={option.path}>
              <Card hoverable className="option-card">
                <div className="card-content">
                  <div className="icon">{option.icon}</div>
                  <h3>{option.title}</h3>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OptionsPage;
