import React from 'react';
import { Typography, Row, Col, Modal, Button } from 'antd';
import { BarcodeOutlined } from '@ant-design/icons';
import './Ticket.css'; // Assurez-vous que ce fichier est bien importé

const { Title, Paragraph } = Typography;

const Ticket = ({ ticket, onClose }) => {
  return (
    <Modal
      title="Prévisualisation du ticket"
      visible={true}
      footer={[
        <Button key="print" onClick={() => window.print()}>
          Imprimer
        </Button>,
        <Button key="close" onClick={onClose}>
          Fermer
        </Button>,
      ]}
      onCancel={onClose}
    >
      <div className="ticket-container">
        <Row className="ticket">
          <Col className="ticket-center" span={24}>
            <Title level={2}>{ticket.title}</Title>
            <Paragraph>
              <strong>Date:</strong> {ticket.date.format('YYYY-MM-DD HH:mm')}
            </Paragraph>
            <Paragraph>
              <strong>Lieu:</strong> {ticket.location}
            </Paragraph>
            <Paragraph>
              <strong>Prix:</strong> ${ticket.price}
            </Paragraph>
            <div className="barcode-section">
              <BarcodeOutlined style={{ fontSize: '100px' }} />
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default Ticket;
