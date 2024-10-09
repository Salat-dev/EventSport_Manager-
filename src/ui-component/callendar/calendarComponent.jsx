import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // Importer le plugin pour la vue semaine
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Button, Input, DatePicker, Form, message, Spin, List } from 'antd';
import { createClient } from '@supabase/supabase-js';
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import moment from 'moment';
import './calendar.css'; // Importez le fichier CSS personnalisé

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
  const [clickedEvent, setClickedEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [listModalVisible, setListModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState('dayGridMonth'); // Mode de vue actuel

  //insert element
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events_calendar').select('*');
      if (error) console.error('Error fetching events:', error);
      setEvents(data.map(event => ({
        id: event.id,
        title: event.title,
        start: event.period_start,
        end: event.period_end,
        color: getEventColor(event),
        ...event,
      })));
    };
    fetchEvents();
  }, []);

  const getEventColor = (event) => {
    if (event.is_archived) return 'blue';
    if (event.is_draft) return 'lightgoldenrodyellow';
    if (new Date(event.period_end) < new Date()) return 'lightgray';
    return 'lightgreen';
  };

  const handleDateClick = () => {
    form.resetFields();
    setEditMode(false);
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
        is_archived: false,
      };

      if (editMode && clickedEvent) {
        const { error } = await supabase
          .from('events_calendar')
          .update(eventData)
          .eq('id', clickedEvent.id);
        if (error) throw error;

        setEvents(events.map(e => (e.id === clickedEvent.id ? { ...e, ...eventData } : e)));
        message.success('Événement modifié avec succès !');
      } else {
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
    setEditMode(false);
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
    setEditMode(true);
    form.setFieldsValue({
      title: clickedEvent.title,
      description: clickedEvent.extendedProps.description,
      period: [moment(clickedEvent.start), moment(clickedEvent.end)],
      location: clickedEvent.extendedProps.location,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setClickedEvent(null);
  };

  const toggleListModal = () => {
    setListModalVisible(!listModalVisible);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <Button onClick={() => { setViewMode('dayGridMonth'); }} style={{ margin: '0 10px' }}>Mois</Button>
        <Button onClick={() => { setViewMode('timeGridWeek'); }} style={{ margin: '0 10px' }}>Semaine</Button>
        <Button onClick={() => { setViewMode('timeGridDay'); }} style={{ margin: '0 10px' }}>Aujourd'hui</Button>
        <Button onClick={toggleListModal} style={{ margin: '0 10px' }}>Liste des événements</Button>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={viewMode}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventClassNames={(arg) =>
          arg.event.extendedProps.is_draft
            ? 'fc-event fc-event-draft'
            : new Date(arg.event.end) < new Date()
            ? 'fc-event fc-event-past'
            : 'fc-event'
        }
      />

      {/* Modal pour créer ou modifier un événement */}
      <Modal
        title={editMode ? 'Modifier l\'événement' : 'Créer un événement de karaté'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        className="custom-modal"
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
            </Button>,
          ]}
        >
          <p>
            <CalendarOutlined /> <strong>Période:</strong> Début: {moment(clickedEvent.start).format('YYYY-MM-DD HH:mm')} / Fin: {moment(clickedEvent.end).format('YYYY-MM-DD HH:mm')}
          </p>
          <p><EnvironmentOutlined /> <strong>Lieu:</strong> {clickedEvent.extendedProps.location}</p>
          <p><ClockCircleOutlined /> <strong>État:</strong> {clickedEvent.extendedProps.is_draft ? 'Brouillon' : new Date(clickedEvent.end) < new Date() ? 'Terminé' : 'À venir'}</p>
        </Modal>
      )}

      {/* Modal de liste des événements */}
      <Modal
        title="Liste des événements"
        visible={listModalVisible}
        onCancel={toggleListModal}
        footer={<Button onClick={toggleListModal}>Fermer</Button>}
      >
        <List
          bordered
          dataSource={events}
          renderItem={event => (
            <List.Item>
              <div>
                <strong>{event.title}</strong>
                <p>{moment(event.period_start).format('YYYY-MM-DD HH:mm')} - {moment(event.period_end).format('YYYY-MM-DD HH:mm')}</p>
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default KarateCalendar;
