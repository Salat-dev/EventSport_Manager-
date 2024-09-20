import React, { useState } from 'react';
import { Card, Row, Col, Divider, Button, Space } from 'antd';

const TournamentBracket = () => {
    // État pour suivre les gagnants des matchs
    const [results, setResults] = useState({
        'match1': null,
        'match2': null,
        'match3': null,
        'final': null,
    });

    // Données des matchs
    const matches = [
        { id: 'match1', players: ['Athlète 1', 'Athlète 2'] },
        { id: 'match2', players: ['Athlète 3', 'Athlète 4'] },
        { id: 'match3', players: ['Gagnant 1', 'Gagnant 2'] },
        { id: 'final', players: ['Finaliste 1', 'Finaliste 2'] },
    ];

    // Fonction pour gérer la sélection des gagnants
    const handleWinner = (matchId, winner) => {
        setResults(prev => ({ ...prev, [matchId]: winner }));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Première ligne - Premier tour */}
            <Row justify="center" gutter={16} style={{ marginBottom: '20px' }}>
                <Col span={8}>
                    <Card
                        title="Match 1"
                        style={{ textAlign: 'center', backgroundColor: '#1890ff', color: '#fff' }}
                    >
                        <div>{matches[0].players[0]}</div>
                        <Divider />
                        <div>{matches[0].players[1]}</div>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                onClick={() => handleWinner('match1', matches[0].players[0])}
                            >
                                {matches[0].players[0]}
                            </Button>
                            <Button
                                type="danger"
                                onClick={() => handleWinner('match1', matches[0].players[1])}
                            >
                                {matches[0].players[1]}
                            </Button>
                        </Space>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        title="Match 2"
                        style={{ textAlign: 'center', backgroundColor: '#ff4d4f', color: '#fff' }}
                    >
                        <div>{matches[1].players[0]}</div>
                        <Divider />
                        <div>{matches[1].players[1]}</div>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                onClick={() => handleWinner('match2', matches[1].players[0])}
                            >
                                {matches[1].players[0]}
                            </Button>
                            <Button
                                type="danger"
                                onClick={() => handleWinner('match2', matches[1].players[1])}
                            >
                                {matches[1].players[1]}
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
            <Divider />
            {/* Deuxième ligne - Demi-finales */}
            <Row justify="center" style={{ marginBottom: '20px' }}>
                <Col span={8}>
                    <Card
                        title="Demi-finale"
                        style={{ textAlign: 'center', backgroundColor: '#1890ff', color: '#fff' }}
                    >
                        <div>{results['match1'] || 'Gagnant Match 1'}</div>
                        <Divider />
                        <div>{results['match2'] || 'Gagnant Match 2'}</div>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                onClick={() => handleWinner('match3', results['match1'] || 'Gagnant Match 1')}
                            >
                                {results['match1'] || 'Gagnant Match 1'}
                            </Button>
                            <Button
                                type="danger"
                                onClick={() => handleWinner('match3', results['match2'] || 'Gagnant Match 2')}
                            >
                                {results['match2'] || 'Gagnant Match 2'}
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
            <Divider />
            {/* Troisième ligne - Finale */}
            <Row justify="center">
                <Col span={8}>
                    <Card
                        title="Finale"
                        style={{ textAlign: 'center', backgroundColor: '#ff4d4f', color: '#fff' }}
                    >
                        <div>{results['match3'] || 'Gagnant Match 3'}</div>
                        <Divider />
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                onClick={() => handleWinner('final', results['match3'] || 'Gagnant Match 3')}
                            >
                                {results['match3'] || 'Gagnant Match 3'}
                            </Button>
                            <Button
                                type="danger"
                                onClick={() => handleWinner('final', 'Adversaire')}
                            >
                                Adversaire
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TournamentBracket;
