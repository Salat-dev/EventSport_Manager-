import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, message, Spin } from 'antd';
import { createClient } from '@supabase/supabase-js';
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined,
  TrophyOutlined,
  SolutionOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
//import './Dashboard.css'; // Ajoute un fichier CSS pour styliser si nécessaire

// Initialisation de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Dashboard = () => {
  const [totals, setTotals] = useState({
    arbitres: 0,
    athlete_club: 0,
    athletes: 0,
    authentification: 0,
    clubs: 0,
    coach_event: 0,
    coachs: 0,
    event: 0,
    event_list: 0,
    events_calendar: 0,
    official_event: 0,
    officiels: 0,
    profiles: 0,
    ticket_event: 0,
    tickets: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  // Récupérer le total de chaque table
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const tables = [
          'arbitres',
          'athlete_club',
          'athletes',
          'authentification',
          'clubs',
          'coach_event',
          'coachs',
          'event',
          'event_list',
          'events_calendar',
          'official_event',
          'officiels',
          'profiles',
          'ticket_event',
          'tickets',
          'users',
        ];

        const totalPromises = tables.map(async (table) => {
          const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact' });

          if (error) {
            message.error(`Erreur lors de la récupération des données de la table ${table}`);
            return 0;
          }

          return count;
        });

        const totalsResult = await Promise.all(totalPromises);

        const totalsMap = tables.reduce((acc, table, idx) => {
          acc[table] = totalsResult[idx];
          return acc;
        }, {});

        setTotals(totalsMap);
      } catch (error) {
        message.error('Erreur lors de la récupération des totaux des tables.');
      } finally {
        setLoading(false);
      }
    };

    fetchTotals();
  }, []);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
  }

  return (
    <div className="dashboard-container">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Arbitres" value={totals.arbitres} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Athlètes" value={totals.athletes} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Clubs" value={totals.clubs} prefix={<TrophyOutlined />} />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic title="Total Coachs" value={totals.coachs} prefix={<SolutionOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Événements" value={totals.event} prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Tickets" value={totals.tickets} prefix={<FileTextOutlined />} />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic title="Total Utilisateurs" value={totals.users} prefix={<SafetyOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Officiels" value={totals.officiels} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Authentification" value={totals.authentification} prefix={<SafetyOutlined />} />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic title="Total Événements Calendrier" value={totals.events_calendar} prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Événements Officiels" value={totals.official_event} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Profiles" value={totals.profiles} prefix={<UserOutlined />} />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic title="Total Coachs Événements" value={totals.coach_event} prefix={<SolutionOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Liste Événements" value={totals.event_list} prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Tickets Événements" value={totals.ticket_event} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
