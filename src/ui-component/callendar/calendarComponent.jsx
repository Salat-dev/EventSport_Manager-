import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Button, Input, DatePicker, Form, message, Spin } from 'antd';
import { createClient } from '@supabase/supabase-js';
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import moment from 'moment';

// Initialisation de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const KarateCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [clickedEvent, setClickedEvent] = useState(null); // Événement sélectionné lors du clic
  const [editMode, setEditMode] = useState(false); // Indique si l'on modifie un événement

  // Charger les événements depuis Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events_calendar').select('*');
      if (error) console.error('Error fetching events:', error);
      setEvents(data.map(event => ({
        id: event.id,
        title: event.title,
        start: event.period_start,
        end: event.period_end,
        color: getEventColor(event), // Fonction pour définir la couleur de l'événement
        ...event,
      })));
    };
    fetchEvents();
  }, []);

  const getEventColor = (event) => {
    if (event.is_archived) return 'blue'; // Couleur pour les événements archivés
    if (event.is_draft) return 'yellow'; // Couleur pour les brouillons
    if (new Date(event.period_end) < new Date()) return 'lightgray'; // Couleur pour les événements passés
    return 'green'; // Couleur par défaut pour les événements à jour
  };

  const handleDateClick = () => {
    form.resetFields();
    setEditMode(false); // Mode création
    setModalVisible(true);
  };

  const handleSaveEvent = async (values) => {
    setLoading(true);
    try {
      const eventData = {
        title: values.title,
        description: values.description,
        period_start: values.period[0].format('YYYY-MM-DD HH:mm'),
        period_end: values.period[1].format('YYYY-MM-DD HH:mm'),
        location: values.location,
        is_draft: isDraft,
        is_archived: false, // Ajoutez ici pour la gestion de l'archivage si nécessaire
      };

      if (editMode && clickedEvent) {
        // Mise à jour de l'événement existant
        const { error } = await supabase
          .from('events_calendar')
          .update(eventData)
          .eq('id', clickedEvent.id);
        if (error) throw error;

        setEvents(events.map(e => (e.id === clickedEvent.id ? { ...e, ...eventData } : e)));
        message.success('Événement modifié avec succès !');
      } else {
        // Création d'un nouvel événement
        const { data, error } = await supabase.from('events_calendar').insert([eventData]);

        if (error) throw error;

        setEvents([...events, { ...eventData, start: eventData.period_start, end: eventData.period_end }]);
        message.success(isDraft ? 'Brouillon enregistré avec succès !' : 'Événement créé avec succès !');
      }

      setModalVisible(false);
      setIsDraft(false);
    } catch (error) {
      console.error('Error saving event:', error);
      message.error('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (info) => {
    setClickedEvent(info.event);
    setEditMode(false); // Mode affichage
  };

  const handleDeleteEvent = async () => {
    try {
      const { error } = await supabase
        .from('events_calendar')
        .delete()
        .eq('id', clickedEvent.id);

      if (error) throw error;

      setEvents(events.filter(e => e.id !== clickedEvent.id));
      message.success('Événement supprimé avec succès !');
      setClickedEvent(null);
    } catch (error) {
      console.error('Error deleting event:', error);
      message.error('Une erreur est survenue.');
    }
  };

  const handleEditEvent = () => {
    setEditMode(true); // Passer en mode édition
    form.setFieldsValue({
      title: clickedEvent.title,
      description: clickedEvent.extendedProps.description,
      period: [moment(clickedEvent.start), moment(clickedEvent.end)],
      location: clickedEvent.extendedProps.location,
    });
    setModalVisible(true); // Ouvrir la modal de modification
  };

  const closeModal = () => {
    setClickedEvent(null);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />

      {/* Modal pour créer ou modifier un événement */}
      <Modal
        title={editMode ? "Modifier l'événement" : "Créer un événement de karaté"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form form={form} onFinish={handleSaveEvent}>
            <Form.Item name="title" label="Titre" rules={[{ required: true, message: 'Titre requis' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Description requise' }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="period" label="Période" rules={[{ required: true, message: 'Période requise' }]}>
              <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item name="location" label="Lieu" rules={[{ required: true, message: 'Lieu requis' }]}>
              <Input />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => setIsDraft(true)} htmlType="submit">
                Enregistrer comme brouillon
              </Button>
              <Button onClick={() => setIsDraft(false)} type="primary" htmlType="submit">
                {editMode ? 'Modifier' : 'Créer'}
              </Button>
              <Button onClick={() => setModalVisible(false)}>Annuler</Button>
            </div>
          </Form>
        </Spin>
      </Modal>

      {/* Modal d'affichage des détails de l'événement */}
      {clickedEvent && !editMode && (
        <Modal
          title={clickedEvent.title}
          visible={!!clickedEvent}
          onCancel={closeModal}
          footer={[
            <Button key="delete" type="danger" onClick={handleDeleteEvent}>
              Supprimer
            </Button>,
            <Button key="edit" type="primary" onClick={handleEditEvent}>
              Modifier
            </Button>,
            <Button key="close" onClick={closeModal}>
              Fermer
            </Button>
          ]}
        >
          <p><CalendarOutlined /> <strong>Période:</strong> Début: {moment(clickedEvent.start).format('YYYY-MM-DD HH:mm')} / Fin: {moment(clickedEvent.end).format('YYYY-MM-DD HH:mm')}</p>
          <p><EnvironmentOutlined /> <strong>Lieu:</strong> {clickedEvent.extendedProps.location}</p>
          <p><ClockCircleOutlined /> <strong>État:</strong> {clickedEvent.extendedProps.is_draft ? 'Brouillon' : new Date(clickedEvent.end) < new Date() ? 'Terminé' : 'À venir'}</p>
        </Modal>
      )}
    </div>
  );
};

export default KarateCalendar;
