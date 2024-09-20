import React, { useState } from 'react';
import { Button, Card, Form, Input, DatePicker, Upload, message, Modal, ColorPicker, List, Typography } from 'antd';
import { UploadOutlined, PrinterOutlined, EyeOutlined, DeleteOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography;

const TicketManager = () => {
  const [form] = Form.useForm();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);

  const onFinish = (values) => {
    const newTicket = { ...values, date: values.date.format('YYYY-MM-DD') };
    setTickets([...tickets, newTicket]);
    message.success('Billet créé avec succès!');
    form.resetFields();
  };

  const handlePreview = (ticket) => {
    setPreviewContent(ticket);
    setPreviewVisible(true);
  };

  const handlePrint = (ticket) => {
    // Ici, vous pourriez intégrer une logique pour imprimer le billet
    message.info('Fonction d\'impression non implémentée');
  };

  const handleDelete = (index) => {
    const newTickets = tickets.filter((_, i) => i !== index);
    setTickets(newTickets);
    message.success('Billet supprimé avec succès!');
  };

  const handleEdit = (index) => {
    setSelectedTicket(index);
    form.setFieldsValue(tickets[index]);
  };

  const handleCancelEdit = () => {
    setSelectedTicket(null);
    form.resetFields();
  };

  const handleSaveEdit = () => {
    const updatedTicket = { ...form.getFieldsValue(), date: form.getFieldValue('date').format('YYYY-MM-DD') };
    const updatedTickets = tickets.map((ticket, index) => (index === selectedTicket ? updatedTicket : ticket));
    setTickets(updatedTickets);
    setSelectedTicket(null);
    form.resetFields();
    message.success('Billet modifié avec succès!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Gestion des Billets" style={{ marginBottom: '20px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ date: moment() }}
        >
          <Form.Item label="Titre de l'événement" name="title" rules={[{ required: true, message: 'Veuillez entrer le titre de l\'événement!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Date de l'événement" name="date" rules={[{ required: true, message: 'Veuillez sélectionner la date de l\'événement!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Upload beforeUpload={() => false} showUploadList={false} customRequest={() => {}}>
              <Button icon={<UploadOutlined />}>Télécharger l'image</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Logo" name="logo">
            <Upload beforeUpload={() => false} showUploadList={false} customRequest={() => {}}>
              <Button icon={<UploadOutlined />}>Télécharger le logo</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Couleur" name="color">
            <ColorPicker />
          </Form.Item>
          <Form.Item>
            {selectedTicket !== null ? (
              <>
                <Button type="primary" onClick={handleSaveEdit} style={{ marginRight: '10px' }}>Sauvegarder les modifications</Button>
                <Button onClick={handleCancelEdit} danger>Annuler</Button>
              </>
            ) : (
              <Button type="primary" htmlType="submit">Créer le billet</Button>
            )}
          </Form.Item>
        </Form>
      </Card>

      <Card title="Billets Créés">
        <List
          dataSource={tickets}
          renderItem={(ticket, index) => (
            <List.Item
              actions={[
                <Button icon={<EyeOutlined />} onClick={() => handlePreview(ticket)}>Aperçu</Button>,
                <Button icon={<PrinterOutlined />} onClick={() => handlePrint(ticket)}>Imprimer</Button>,
                <Button icon={<EditOutlined />} onClick={() => handleEdit(index)}>Modifier</Button>,
                <Button icon={<DeleteOutlined />} onClick={() => handleDelete(index)} danger>Supprimer</Button>,
              ]}
            >
              <List.Item.Meta
                title={ticket.title}
                description={`Date: ${ticket.date}`}
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Aperçu du billet */}
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        {previewContent && (
          <div>
            <Title level={4}>{previewContent.title}</Title>
            <p>Date: {previewContent.date}</p>
            {/* Afficher l'image et le logo si disponibles */}
            {previewContent.image && <img src={previewContent.image} alt="Image du billet" style={{ width: '100%', marginBottom: '10px' }} />}
            {previewContent.logo && <img src={previewContent.logo} alt="Logo du billet" style={{ width: '100%', marginBottom: '10px' }} />}
            <div style={{ backgroundColor: previewContent.color, padding: '10px', color: '#fff' }}>
              Couleur du billet
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TicketManager;
