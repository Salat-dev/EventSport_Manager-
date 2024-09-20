import React, { useState, useEffect } from 'react';
import { Table, message, Spin, Button, Modal, Form, Input, Select, Switch, Space, Popconfirm,DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { supabase } from '../../supabaseClient';
import jsPDF from 'jspdf'; // Pour PDF
import html2canvas from 'html2canvas'; // Pour PNG
import { saveAs } from 'file-saver'; // Pour CSV

const { Option } = Select;

const OfficialList = () => {
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedOfficial, setSelectedOfficial] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOfficials();
  }, []);

  const fetchOfficials = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('official_event').select('*');
    if (error) {
      message.error('Erreur lors de la récupération des officiels');
    } else {
      setOfficials(data);
    }
    setLoading(false);
  };

  const addOrUpdateOfficial = async (values) => {
    setLoading(true);
    if (isEdit && selectedAthlete) {
      // Update athlete
      const { error } = await supabase
        .from('official_event')
        .update(values)
        .eq('id', selectedAthlete.id);
      if (error) {
        message.error('Erreur lors de la mise à jour de l\'athlète');
      } else {
        message.success('Athlète mis à jour avec succès');
      }
    } else {
      // Add athlete
      const { error } = await supabase.from('official_event').insert([values]);
      if (error) {
        message.error('Erreur lors de l\'ajout de l\'athlète');
      } else {
        message.success('Athlète ajouté avec succès');
      }
    }

    setIsModalVisible(false);
    form.resetFields();
    fetchOfficials();
    setLoading(false);
  };

  const deleteOfficial = async (officialId) => {
    setLoading(true);
    const { error } = await supabase.from('official_event').delete().eq('id', officialId);
    if (error) {
      message.error('Erreur lors de la suppression de l\'officiel');
    } else {
      message.success('Officiel supprimé avec succès');
      fetchOfficials();
    }
    setLoading(false);
  };

  const openEditModal = (official) => {
    setSelectedOfficial(official);
    setIsEdit(true);
    form.setFieldsValue(official);
    setIsModalVisible(true);
  };

  const openAddModal = () => {
    form.resetFields();
    setIsEdit(false);
    setIsModalVisible(true);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const table = document.getElementById('official-table');
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
      doc.save('officials.pdf');
    });
  };

  const exportPNG = () => {
    const table = document.getElementById('official-table');
    html2canvas(table).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'officials.png');
      });
    });
  };

  const exportCSV = () => {
    const csvData = officials.map((official) => ({
      Prénom: official.first_name,
      Nom: official.last_name,
      Nationalité: official.nationality,
      Catégorie: official.category,
    }));
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      Object.keys(csvData[0]).join(';') +
      '\n' +
      csvData.map((row) => Object.values(row).join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'officials.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const columns = [  
    { title: 'Nom', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Prénom', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Nationalité', dataIndex: 'nationality', key: 'nationality' },
    { title: 'Categorie', dataIndex: '  category ', key: '  category ' },
    { title: 'Statut', dataIndex: 'status', key: 'status', render: (status) => (status === 'accrédité' ? 'Accrédité' : 'En attente') },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, official) => (
        <Space>
          <EditOutlined onClick={() => openEditModal(official)} style={{ color: 'blue', cursor: 'pointer' }} />
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cet officiel?"
            onConfirm={() => deleteOfficial(official.id)}
            okText="Oui"
            cancelText="Non"
          >
            <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <Space style={{ marginBottom: '16px' }}>
        
        <Button type="primary" onClick={openAddModal}>
          Ajouter Officiel
        </Button>
        <Button onClick={exportPDF}>Exporter PDF</Button>
        <Button onClick={exportPNG}>Exporter Image</Button>
        <Button onClick={exportCSV}>Exporter CSV</Button>
        <Button onClick={handlePrint}>Imprimer</Button>
      </Space>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          id="official-table"
          dataSource={officials}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}

      {/* Modal pour ajouter/modifier un officiel */}
      <Modal
        title={isEdit ? 'Modifier Officiel' : 'Ajouter Officiel'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={addOrUpdateOfficial}>
          <Form.Item
            label="Prénom"
            name="first_name"
            rules={[{ required: true, message: 'Veuillez entrer le prénom' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nom"
            name="last_name"
            rules={[{ required: true, message: 'Veuillez entrer le nom' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nationalité"
            name="nationality"
            rules={[{ required: false, message: 'Veuillez entrer le nom du club' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Catégorie"
            name="category"
            rules={[{ required: true, message: 'Veuillez sélectionner une catégorie' }]}
          >
             <Select placeholder="Sélectionner une catégorie">
              <Option value="Arbitre">Arbitre</Option>
              <Option value="Assistant Arbitre">Assistant Arbitre</Option>
              <Option value="Médecin">Médecin</Option>
              <Option value="Autre">Autre</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            label="Accréditation"
            name="status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Accrédité" unCheckedChildren="En attente" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OfficialList;
