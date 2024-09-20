import React, { useState, useEffect } from 'react';
import { Modal, Button, List, Checkbox, Spin, Input, message } from 'antd';
import { createClient } from '@supabase/supabase-js';
import emailjs from 'emailjs-com';

// Initialisation de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


const CalendarList = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Charger les événements depuis Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events_calendar').select('*');
      if (error) console.error('Erreur lors du chargement des événements:', error);
      setEvents(data || []);
    };

    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('email, lastname, role');
      if (error) console.error('Erreur lors du chargement des utilisateurs:', error);
      setUsers(data || []);
    };

    fetchEvents();
    fetchUsers();
  }, []);

  const handleDeleteEvent = async (id) => {
    const { error } = await supabase.from('events_calendar').delete().eq('id', id);
    if (!error) {
      message.success('Événement supprimé avec succès.');
      setEvents(events.filter((event) => event.id !== id));
    } else {
      console.error('Erreur lors de la suppression:', error);
      message.error('Erreur lors de la suppression.');
    }
  };

  const handleArchiveEvent = async (id) => {
    const { error } = await supabase
      .from('events_calendar')
      .update({ archived: true })
      .eq('id', id);
    if (!error) {
      message.success('Événement archivé.');
      setEvents(events.map((event) => (event.id === id ? { ...event, archived: true } : event)));
    } else {
      console.error('Erreur lors de l\'archivage:', error);
      message.error('Erreur lors de l\'archivage.');
    }
  };

  const handleModifyEvent = (event) => {
    // Logique pour la modification (non implémentée ici)
    console.log('Modifier:', event);
  };

  const handleSendEmail = (event) => {
    setSelectedEvent(event);
    setEmailModalVisible(true);
  };

  const handleSend = async () => {
    setLoading(true);
    try {
        const templateParams = {
            to_email: selectedEmails.join(','),
            title: selectedEvent.title,
            description: selectedEvent.description,
            period_start: selectedEvent.period_start,
            period_end: selectedEvent.period_end,
            location: selectedEvent.location,
          };
      const result = await emailjs.send(
        'service_dosfblk', // Remplacez par votre Service ID
        'template_5kckkdp', // Remplacez par votre Template ID
        templateParams,
        'EsjnAGxkifTZJuEN1' // Remplacez par votre Public Key
      );


      if (result.text === 'OK') {
        message.success('L\'e-mail a été envoyé avec succès !');
        setEmailModalVisible(false);
        setSelectedEmails([]);
      } else {
        throw new Error('Échec de l\'envoi de l\'e-mail.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
      message.error('Erreur lors de l\'envoi de l\'e-mail.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (checkedValues) => {
    setSelectedEmails(checkedValues);
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <List
        header={<div>Liste des Événements</div>}
        bordered
        dataSource={events}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={() => handleDeleteEvent(item.id)} danger>
                Supprimer
              </Button>,
              <Button onClick={() => handleArchiveEvent(item.id)}>
                Archiver
              </Button>,
              <Button onClick={() => handleModifyEvent(item)}>
                Modifier
              </Button>,
              <Button onClick={() => handleSendEmail(item)} type="primary">
                Partager
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={`${item.description} - ${item.period_start} à ${item.period_end}`}
            />
          </List.Item>
        )}
      />

      {/* Modal pour sélectionner les adresses e-mail */}
      <Modal
        title="Partager l'événement"
        visible={emailModalVisible}
        onCancel={() => setEmailModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setEmailModalVisible(false)}>
            Annuler
          </Button>,
          <Button key="send" type="primary" loading={loading} onClick={handleSend}>
            Envoyer
          </Button>,
        ]}
      >
        <Spin spinning={loading}>
          <Input
            placeholder="Rechercher par email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Checkbox.Group
            options={filteredUsers.map((user) => ({
              label: `${user.lastname} (${user.email}, ${user.role})`,
              value: user.email,
            }))}
            value={selectedEmails}
            onChange={handleEmailChange}
          />
        </Spin>
      </Modal>
    </div>
  );
};

export default CalendarList;
