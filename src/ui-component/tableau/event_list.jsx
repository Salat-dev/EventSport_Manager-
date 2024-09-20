import React, { useEffect, useState } from 'react';
import { List, Avatar, Card, Button, Modal, Input, Form, message } from 'antd';
import { createClient } from '@supabase/supabase-js';
import { Typography, Box } from '@mui/material';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { styled } from '@mui/system';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Style personnalisé pour le conteneur de la liste
const ListContainer = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#f0f2f5',
  borderRadius: '12px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
});

// Style pour le champ de recherche
const SearchBar = styled(Input)({
  marginBottom: '20px',
  width: '100%',
});

// Style personnalisé pour chaque élément de la liste
const ListItemStyled = styled(Card)({
  marginBottom: '16px',
  borderRadius: '12px',
  transition: 'transform 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
  },
});

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('event_list')
        .select('id, title, description, location, period, logo_url');

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
        setFilteredEvents(data);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, events]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  const handleModalOk = async (values) => {
    try {
      let logoUrl = selectedEvent.logo_url;

      if (values.logo && values.logo.file) {
        const file = values.logo.file.originFileObj;
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('event-logos')
          .upload(`logos/${file.name}`, file);

        if (uploadError) throw uploadError;

        logoUrl = supabase.storage.from('event-logos').getPublicUrl(uploadData.path).publicURL;
      }

      const { error } = await supabase
        .from('event_list')
        .update({
          title: values.title,
          description: values.description,
          location: values.location,
          period: values.period,
          logo_url: logoUrl,
        })
        .eq('id', selectedEvent.id);

      if (error) throw error;

      message.success('Événement mis à jour avec succès !');
      setIsModalVisible(false);
      setSelectedEvent(null);
      await fetchEvents(); // Recharger les événements pour mettre à jour la liste
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'événement :', error);
      message.error('Une erreur s\'est produite lors de la mise à jour de l\'événement.');
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const { error } = await supabase
        .from('event_list')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      message.success('Événement supprimé avec succès !');
      await fetchEvents(); // Recharger les événements pour mettre à jour la liste
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement :', error);
      message.error('Une erreur s\'est produite lors de la suppression de l\'événement.');
    }
  };

  return (
    <ListContainer>
      <Typography variant="h4" gutterBottom>
        Liste des Événements
      </Typography>
      <SearchBar
        placeholder="Rechercher un événement..."
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={filteredEvents}
        renderItem={event => (
          <ListItemStyled
            key={event.id}
            onClick={() => handleEventClick(event)}
            hoverable
          >
            <List.Item.Meta
              avatar={
                <Avatar 
                  src={event.logo_url} 
                  shape="square" 
                  size={100} 
                  style={{ borderRadius: '12px' }} 
                />
              }
              title={
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                  {event.title}
                </Typography>
              }
              description={
                <div>
                  <Typography variant="body1" style={{ marginBottom: '8px' }}>
                    {event.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {event.location} | {event.period}
                  </Typography>
                </div>
              }
            />
          </ListItemStyled>
        )}
      />
      {selectedEvent && (
        <Modal
          title="Modifier l'événement"
          visible={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
          width={800}
        >
          <Form
            initialValues={{
              title: selectedEvent.title,
              description: selectedEvent.description,
              location: selectedEvent.location,
              period: [selectedEvent.period[0], selectedEvent.period[1]],
              logo: null,
            }}
            onFinish={handleModalOk}
          >
            <Form.Item label="Titre" name="title" rules={[{ required: true, message: 'Veuillez entrer un titre' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Veuillez entrer une description' }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Lieu" name="location" rules={[{ required: true, message: 'Veuillez entrer un lieu' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Période" name="period" rules={[{ required: true, message: 'Veuillez entrer une période' }]}>
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Logo" name="logo">
              <Input type="file" accept="image/*" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Valider
              </Button>
              <Button onClick={handleModalCancel} style={{ marginLeft: '10px' }}>
                Annuler
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </ListContainer>
  );
};

export default EventList;
