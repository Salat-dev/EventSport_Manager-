import React from 'react';
import { List, Typography } from 'antd';
import logofederation from '../landingpage/img/logofederation.jpeg'

const { Title, Paragraph } = Typography;

// Sample data for events
const events = [
    {
        id: 1,
        title: 'REMEMBER ALL MAESTRO',
        date: '2024-09-15',
        description: 'Douala',
    },
    {
        id: 2,
        title: 'COUPE DU CAMEROUN',
        date: '2024-10-05',
        description: 'Yaounde',
    },
    {
        id: 3,
        title: 'Art Exhibition',
        date: '2024-11-20',
        description: 'Explore stunning artworks from local artists.',
    },
    
];

const EventList = () => {
    return (
        <div style={{ padding: '10px' }}>
            <Title level={2}>Liste d'évènements</Title>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={events}
                renderItem={(event) => (
                    <List.Item
                        key={event.id}
                        extra={<img width={80} alt="event" src={logofederation} />}
                    >
                        <List.Item.Meta
                            title={<a href="#">{event.title}</a>}
                            description={event.date}
                        />
                        <Paragraph>{event.description}</Paragraph>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default EventList;