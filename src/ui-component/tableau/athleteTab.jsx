import React from 'react';
import { List, Card, Button, Typography } from 'antd';
import { Link } from 'react-router-dom'; // Importez Link

const { Title } = Typography;

const ListAthlet = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <Card style={{ width: '70%', padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Liste des Athlètes</Title>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={[
            { title: 'Liste Totale', filter: 'total', path: '/list_total_athlete' },
            { title: 'Liste par Club', filter: 'club', path: '/list_par_club' },
            { title: 'Liste par Catégorie', filter: 'category', path: '/list_par_categories' },
            { title: 'Liste par Club/Catégorie', filter: 'club-category', path: '/athletes/club-category' },
          ]}
          renderItem={item => (
            <List.Item>
              <Link to={item.path}>
                <Button type="primary" block>
                  {item.title}
                </Button>
              </Link>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ListAthlet;
