import React, { useState, useEffect } from 'react';
import { Button, Form, Input, DatePicker, Modal, List, message } from 'antd';
import { createClient } from '@supabase/supabase-js';
import Ticket from './Ticket'; // Composant de ticket à créer
import './TicketDesign.css'; // Importez votre CSS

// Initialisation de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TicketDesign = () => {
  const [form] = Form.useForm();
  const [tickets, setTickets] = useState([]);
  const [previewTicket, setPreviewTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listModalVisible, setListModalVisible] = useState(false);

  // Charger les tickets depuis Supabase
  useEffect(() => {
    const fetchTickets = async () => {
      const { data, error } = await supabase.from('ticket_event').select('*');
      if (error) {
        console.error('Error fetching tickets:', error);
      } else {
        setTickets(data);
      }
    };
    fetchTickets();
  }, []);

  // Enregistrer un ticket
  const handleFinish = async (values) => {
    setLoading(true);
    try {
      // Formatage de la date en 'YYYY-MM-DD HH:mm:ss' pour Supabase
      const formattedValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD HH:mm:ss'), // Formatage correct de la date
      };

      const { data, error } = await supabase
        .from('ticket_event')
        .insert([formattedValues])
        .select(); // Retourne les données insérées

      if (error) throw error;

      // Si les données sont insérées correctement, on les ajoute à l'état
      if (data && data.length > 0) {
        const newTicket = data[0];
        setTickets([...tickets, newTicket]);
        message.success('Ticket créé avec succès!');
        form.resetFields(); // Réinitialiser le formulaire
      }
    } catch (error) {
      console.error('Erreur Supabase:', error); // Log détaillé de l'erreur
      message.error('Erreur lors de la création du ticket');
    } finally {
      setLoading(false);
    }
  };

  // Gérer la prévisualisation du ticket
  const handlePreview = (ticket) => {
    setPreviewTicket(ticket);
  };

  // Basculer l'affichage de la liste des événements
  const toggleListModal = () => {
    setListModalVisible(!listModalVisible);
  };

  return (
    <div className="ticket-design-container">
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item name="title" label="Titre" rules={[{ required: true }]}>
          <Input placeholder="Titre de l'événement" />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker showTime placeholder="Sélectionnez la date et l'heure" />
        </Form.Item>
        <Form.Item name="location" label="Lieu" rules={[{ required: true }]}>
          <Input placeholder="Lieu de l'événement" />
        </Form.Item>
        <Form.Item name="price" label="Prix" rules={[{ required: true }]}>
          <Input placeholder="Prix du billet" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Créer l'événement
        </Button>
        <Button style={{ marginLeft: '10px' }} onClick={toggleListModal}>
          Liste des événements
        </Button>
      </Form>

      {/* Modal de liste des tickets */}
      <Modal
        title="Liste des événements"
        visible={listModalVisible}
        onCancel={toggleListModal}
        footer={null}
      >
        <List
          bordered
          dataSource={tickets}
          renderItem={(ticket) => (
            <List.Item onClick={() => handlePreview(ticket)}>
              <strong>{ticket.title}</strong> - {ticket.date} - {ticket.location} - ${ticket.price}
            </List.Item>
          )}
        />
      </Modal>

      {/* Prévisualisation du ticket */}
      {previewTicket && (
        <Ticket ticket={previewTicket} onClose={() => setPreviewTicket(null)} />
      )}
    </div>
  );
};

export default TicketDesign;
