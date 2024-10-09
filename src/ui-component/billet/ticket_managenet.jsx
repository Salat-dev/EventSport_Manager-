import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, DatePicker, message, Popconfirm } from 'antd';
import { createClient } from '@supabase/supabase-js';
import Ticket from './Ticket'; // Composant de ticket à créer
import './TicketDesign.css'; // Importez votre CSS pour styliser

// Initialisation de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TicketManagement = () => {
  const [form] = Form.useForm();
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [previewTicket, setPreviewTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  // Créer ou mettre à jour un ticket
  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD HH:mm:ss'), // Formatage correct de la date
      };

      if (editingTicket) {
        // Mettre à jour un ticket existant
        const { error } = await supabase
          .from('ticket_event')
          .update(formattedValues)
          .eq('id', editingTicket.id);

        if (error) throw error;

        setTickets((prev) =>
          prev.map((ticket) => (ticket.id === editingTicket.id ? { ...ticket, ...formattedValues } : ticket))
        );
        message.success('Ticket mis à jour avec succès!');
      } else {
        // Créer un nouveau ticket
        const { data, error } = await supabase.from('ticket_event').insert([formattedValues]).select();
        if (error) throw error;
        setTickets([...tickets, data[0]]);
        message.success('Ticket créé avec succès!');
      }

      form.resetFields();
      setIsModalVisible(false);
      setEditingTicket(null);
    } catch (error) {
      console.error('Erreur Supabase:', error);
      message.error('Erreur lors de la sauvegarde du ticket');
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un ticket
  const handleDelete = async (ticketId) => {
    try {
      const { error } = await supabase.from('ticket_event').delete().eq('id', ticketId);
      if (error) throw error;
      setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
      message.success('Ticket supprimé avec succès!');
    } catch (error) {
      console.error('Erreur Supabase:', error);
      message.error('Erreur lors de la suppression du ticket');
    }
  };

  // Prévisualiser un ticket
  const handlePreview = (ticket) => {
    setPreviewTicket(ticket);
  };

  // Ouvrir le modal pour créer ou éditer un ticket
  const openModal = (ticket = null) => {
    if (ticket) {
      setEditingTicket(ticket);
      form.setFieldsValue({
        ...ticket,
        date: ticket.date ? moment(ticket.date) : null,
      });
    }
    setIsModalVisible(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingTicket(null);
  };

  return (
    <div className="ticket-management-container">
      <Button type="primary" onClick={() => openModal()}>
        Créer un nouvel événement
      </Button>

      <Table
        dataSource={tickets}
        rowKey="id"
        columns={[
          {
            title: 'Titre',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Lieu',
            dataIndex: 'location',
            key: 'location',
          },
          {
            title: 'Prix',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, ticket) => (
              <>
                <Button onClick={() => handlePreview(ticket)} style={{ marginRight: '10px' }}>
                  Aperçu
                </Button>
                <Button onClick={() => openModal(ticket)} type="default" style={{ marginRight: '10px' }}>
                  Modifier
                </Button>
                <Popconfirm title="Êtes-vous sûr de vouloir supprimer ce ticket?" onConfirm={() => handleDelete(ticket.id)}>
                  <Button type="danger">Supprimer</Button>
                </Popconfirm>
              </>
            ),
          },
        ]}
      />

      {/* Modal pour la création et l'édition */}
      <Modal title={editingTicket ? 'Modifier le ticket' : 'Créer un ticket'} visible={isModalVisible} onCancel={closeModal} footer={null}>
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
            {editingTicket ? 'Mettre à jour' : 'Créer'}
          </Button>
        </Form>
      </Modal>

      {/* Prévisualisation du ticket */}
      {previewTicket && (
        <Modal
          title="Aperçu du Ticket"
          visible={!!previewTicket}
          onCancel={() => setPreviewTicket(null)}
          footer={[
            <Button key="print" onClick={() => window.print()}>
              Imprimer
            </Button>,
            <Button key="close" onClick={() => setPreviewTicket(null)}>
              Fermer
            </Button>,
          ]}
        >
          <Ticket ticket={previewTicket} />
        </Modal>
      )}
    </div>
  );
};

export default TicketManagement;
