import React, { useState, useEffect } from 'react';
import { Table, message, Spin, Button, Modal, Form, Input, Select, Switch, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { supabase } from '../../supabaseClient';
import jsPDF from 'jspdf'; // Pour PDF
import html2canvas from 'html2canvas'; // Pour PNG
import { saveAs } from 'file-saver'; // Pour CSV

const { Option } = Select;

const AthleteListTotal = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('athlete_club').select('*');
    if (error) {
      message.error('Erreur lors de la récupération des athlètes');
    } else {
      setAthletes(data);
    }
    setLoading(false);
  };

  const addOrUpdateAthlete = async (values) => {
    setLoading(true);
    if (isEdit && selectedAthlete) {
      // Update athlete
      const { error } = await supabase
        .from('athlete_club')
        .update(values)
        .eq('id', selectedAthlete.id);
      if (error) {
        message.error('Erreur lors de la mise à jour de l\'athlète');
      } else {
        message.success('Athlète mis à jour avec succès');
      }
    } else {
      // Add athlete
      const { error } = await supabase.from('athlete_club').insert([values]);
      if (error) {
        message.error('Erreur lors de l\'ajout de l\'athlète');
      } else {
        message.success('Athlète ajouté avec succès');
      }
    }

    setIsModalVisible(false);
    form.resetFields();
    fetchAthletes();
    setLoading(false);
  };

  const deleteAthlete = async (athleteId) => {
    setLoading(true);
    const { error } = await supabase.from('athlete_club').delete().eq('id', athleteId);
    if (error) {
      message.error('Erreur lors de la suppression de l\'athlète');
    } else {
      message.success('Athlète supprimé avec succès');
      fetchAthletes();
    }
    setLoading(false);
  };

  const openEditModal = (athlete) => {
    setSelectedAthlete(athlete);
    setIsEdit(true);
    form.setFieldsValue(athlete);
    setIsModalVisible(true);
  };

  const openAddModal = () => {
    form.resetFields();
    setIsEdit(false);
    setIsModalVisible(true);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const table = document.getElementById('athlete-table');
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
      doc.save('athletes.pdf');
    });
  };

  const exportPNG = () => {
    const table = document.getElementById('athlete-table');
    html2canvas(table).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'athletes.png');
      });
    });
  };

  const exportCSV = () => {
    const csvData = athletes.map((athlete) => ({
      Prénom: athlete.first_name,
      Nom: athlete.last_name,
      Club: athlete.club,
      Catégorie: athlete.level,
      Poids: athlete.weight,
      Statut: athlete.status,
    }));
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      Object.keys(csvData[0]).join(';') +
      '\n' +
      csvData.map((row) => Object.values(row).join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'athletes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const columns = [
    { title: 'Prénom', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Nom', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Club', dataIndex: 'club', key: 'club' },
    { title: 'Catégorie', dataIndex: 'level', key: 'level' },
    { title: 'Poids', dataIndex: 'weight', key: 'weight' },
    { title: 'Statut', dataIndex: 'status', key: 'status', render: (status) => (status === 'accrédité' ? 'Accrédité' : 'En attente') },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, athlete) => (
        <Space>
          <EditOutlined onClick={() => openEditModal(athlete)} style={{ color: 'blue', cursor: 'pointer' }} />
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer cet athlète?"
            onConfirm={() => deleteAthlete(athlete.id)}
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
          Ajouter Athlète
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
          id="athlete-table"
          dataSource={athletes}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}

      {/* Modal pour ajouter/modifier un athlète */}
      <Modal
        title={isEdit ? 'Modifier Athlète' : 'Ajouter Athlète'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={addOrUpdateAthlete}>
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
            label="Club"
            name="club"
            rules={[{ required: true, message: 'Veuillez entrer le nom du club' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Catégorie"
            name="level"
            rules={[{ required: true, message: 'Veuillez sélectionner une catégorie' }]}
          >
            <Select>
              <Option value="Cadets">Cadets</Option>
              <Option value="Juniors">Juniors</Option>
              <Option value="Minims">Minims</Option>
              <Option value="Seniors">Seniors</Option>
            </Select>
          </Form.Item>

          
          <Form.Item
            label="Poids"
            name="weight"
            rules={[{ required: true, message: 'Veuillez entrer le poids' }]}
          >
            <Input />
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

export default AthleteListTotal;
