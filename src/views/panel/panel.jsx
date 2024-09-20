import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Radio, InputNumber, Typography } from 'antd';
import { PlusOutlined, MinusOutlined, SyncOutlined, TrophyOutlined, PauseOutlined, PlayCircleOutlined, ProjectOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const KarateScorePanel = () => {
  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);
  const [bluePenalties, setBluePenalties] = useState({ c1: false, c2: false, c3: false, hc: false, h: false });
  const [redPenalties, setRedPenalties] = useState({ c1: false, c2: false, c3: false, hc: false, h: false });
  const [time, setTime] = useState(180); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    let interval = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => setTime(180);

  const incrementScore = (color, points) => {
    if (color === 'blue') setBlueScore(blueScore + points);
    else setRedScore(redScore + points);
  };

  const decrementScore = (color, points) => {
    if (color === 'blue') setBlueScore(blueScore - points);
    else setRedScore(redScore - points);
  };

  const handlePenaltyChange = (color, penalty) => {
    if (color === 'blue') setBluePenalties({ ...bluePenalties, [penalty]: !bluePenalties[penalty] });
    else setRedPenalties({ ...redPenalties, [penalty]: !redPenalties[penalty] });
  };

  const resetPanel = () => {
    setBlueScore(0);
    setRedScore(0);
    setBluePenalties({ c1: false, c2: false, c3: false, hc: false, h: false });
    setRedPenalties({ c1: false, c2: false, c3: false, hc: false, h: false });
    resetTimer();
    setWinner(null);
    setIsRunning(false);
  };

  const projectScorePanel = () => {
    window.open('/projected-score', '_blank');
  };

  return (
    <Row gutter={16} style={{ padding: '20px' }}>
      {/* Left Section: Combat Management */}
      <Col span={12}>
        <Card title="Gestion du Combat" bordered={false}>
          <div>
            <Button type="primary" onClick={startTimer} icon={<PlayCircleOutlined />}>
              Démarrer
            </Button>
            <Button type="danger" onClick={stopTimer} icon={<PauseOutlined />} style={{ marginLeft: '10px' }}>
              Arrêter
            </Button>
            <Button onClick={resetTimer} icon={<SyncOutlined />} style={{ marginLeft: '10px' }}>
              Actualiser Temps
            </Button>
            <InputNumber
              min={0}
              max={600}
              value={time}
              onChange={(value) => setTime(value)}
              style={{ marginLeft: '10px' }}
            />
          </div>

          {/* Score Buttons */}
          <div style={{ marginTop: '20px' }}>
            <Title level={4}>Points Bleus</Title>
            <Button onClick={() => incrementScore('blue', 3)} style={{ backgroundColor: '#1890ff', color: '#fff' }}>Ippon +3</Button>
            <Button onClick={() => incrementScore('blue', 2)} style={{ backgroundColor: '#1890ff', color: '#fff', marginLeft: '10px' }}>Waza-ari +2</Button>
            <Button onClick={() => incrementScore('blue', 1)} style={{ backgroundColor: '#1890ff', color: '#fff', marginLeft: '10px' }}>Yuko +1</Button>
            <Button onClick={() => decrementScore('blue', 3)} style={{ backgroundColor: '#1890ff', color: '#fff', marginLeft: '10px' }}>Ippon -3</Button>
            <Button onClick={() => decrementScore('blue', 2)} style={{ backgroundColor: '#1890ff', color: '#fff', marginLeft: '10px' }}>Waza-ari -2</Button>
            <Button onClick={() => decrementScore('blue', 1)} style={{ backgroundColor: '#1890ff', color: '#fff', marginLeft: '10px' }}>Yuko -1</Button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <Title level={4}>Points Rouges</Title>
            <Button onClick={() => incrementScore('red', 3)} style={{ backgroundColor: '#ff4d4f', color: '#fff' }}>Ippon +3</Button>
            <Button onClick={() => incrementScore('red', 2)} style={{ backgroundColor: '#ff4d4f', color: '#fff', marginLeft: '10px' }}>Waza-ari +2</Button>
            <Button onClick={() => incrementScore('red', 1)} style={{ backgroundColor: '#ff4d4f', color: '#fff', marginLeft: '10px' }}>Yuko +1</Button>
            <Button onClick={() => decrementScore('red', 3)} style={{ backgroundColor: '#ff4d4f', color: '#fff', marginLeft: '10px' }}>Ippon -3</Button>
            <Button onClick={() => decrementScore('red', 2)} style={{ backgroundColor: '#ff4d4f', color: '#fff', marginLeft: '10px' }}>Waza-ari -2</Button>
            <Button onClick={() => decrementScore('red', 1)} style={{ backgroundColor: '#ff4d4f', color: '#fff', marginLeft: '10px' }}>Yuko -1</Button>
          </div>

          {/* Penalties */}
          <div style={{ marginTop: '20px' }}>
            <Title level={4}>Pénalités Bleues</Title>
            {['c1', 'c2', 'c3', 'hc', 'h'].map((penalty) => (
              <Radio.Button
                key={penalty}
                onClick={() => handlePenaltyChange('blue', penalty)}
                style={{ marginLeft: '10px', backgroundColor: bluePenalties[penalty] ? '#1890ff' : '#fff' }}
              >
                {penalty.toUpperCase()}
              </Radio.Button>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>
            <Title level={4}>Pénalités Rouges</Title>
            {['c1', 'c2', 'c3', 'hc', 'h'].map((penalty) => (
              <Radio.Button
                key={penalty}
                onClick={() => handlePenaltyChange('red', penalty)}
                style={{ marginLeft: '10px', backgroundColor: redPenalties[penalty] ? '#ff4d4f' : '#fff' }}
              >
                {penalty.toUpperCase()}
              </Radio.Button>
            ))}
          </div>

          {/* Winner Selection and Reset */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button type="primary" danger onClick={() => setWinner('red')} icon={<TrophyOutlined />}>
              Rouge Vainqueur
            </Button>
            <Button type="primary" onClick={() => setWinner('blue')} icon={<TrophyOutlined />} style={{ marginLeft: '10px' }}>
              Bleu Vainqueur
            </Button>
            <Button type="default" danger onClick={resetPanel} icon={<SyncOutlined />} style={{ marginLeft: '10px' }}>
              Actualiser
            </Button>
          </div>
        </Card>
      </Col>

      {/* Right Section: Score Panel */}
      <Col span={12}>
        <Card title="Panneau de Score" bordered={false}>
         

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Title level={4}>Événement Karaté</Title>
            <Text strong>Numéro du Tatamis: 1</Text>
            <br />
            <Text strong>Phase du Tournoi: Demi-finale</Text>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Title level={2}>
              {Math.floor(time / 60)
                .toString()
                .padStart(2, '0')}
              :
              {(time % 60).toString().padStart(2, '0')}
            </Title>
          </div>
          <Row gutter={16}>
            
            <Col span={12} style={{ textAlign: 'center' }}>
              <div>
                <img src="blue_logo.png" alt="Blue Athlete Logo" style={{ width: '50px' }} />
                <Title level={4} style={{ color: '#1890ff' }}>Athlète Bleu</Title>
              </div>
              <Title level={1} style={{ color: '#1890ff' }}>{blueScore}</Title>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
            
              <div>
                <img src="red_logo.png" alt="Red Athlete Logo" style={{ width: '50px' }} />
                <Title level={4} style={{ color: '#ff4d4f' }}>Athlète Rouge</Title>
              </div>
              <Title level={1} style={{ color: '#ff4d4f' }}>{redScore}</Title>
            </Col>
          </Row>

          {/* Penalty Display */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Title level={4}>Pénalités</Title>
            <Row gutter={16}>
              <Col span={12}>
                {['c1', 'c2', 'c3', 'hc', 'h'].map((penalty) => (
                  <Text key={penalty} style={{ display: 'block', color: bluePenalties[penalty] ? '#1890ff' : '#000' }}>
                    {penalty.toUpperCase()}: {bluePenalties[penalty] ? '✔️' : '❌'}
                  </Text>
                ))}
              </Col>
              <Col span={12}>
                {['c1', 'c2', 'c3', 'hc', 'h'].map((penalty) => (
                  <Text key={penalty} style={{ display: 'block', color: redPenalties[penalty] ? '#ff4d4f' : '#000' }}>
                    {penalty.toUpperCase()}: {redPenalties[penalty] ? '✔️' : '❌'}
                  </Text>
                ))}
              </Col>
            </Row>
          </div>

          {/* Project Button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button type="primary" icon={<ProjectOutlined />} onClick={projectScorePanel}>
              Projeter
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default KarateScorePanel;
