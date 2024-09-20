import React, { useEffect, useState } from 'react';
import { Table, message, Button, Space, Popconfirm, Modal, Form, Input, Select,DatePicker } from 'antd';
import { createClient } from '@supabase/supabase-js';

// Configuration de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const { Option } = Select;

const CoachTable = () => {
  const [loading, setLoading] = useState(false);
  const [coachs, setCoach] = useState([]);
  const [editingCoach, setEditingCoach] = useState(null); // Athlete being edited
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fonction pour récupérer les athlètes
  const fetchCoach = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('coachs').select('id, nom, prenom, categorie, club_pays, sexe, age');

    if (error) {
      message.error('Erreur lors de la récupération des données : ' + error.message);
    } else {
      setCoach(data);
    }
    setLoading(false);
  };

  // Fonction pour supprimer un athlète
  const deleteAthlete = async (id) => {
    setLoading(true);
    const { error } = await supabase.from('coachs').delete().eq('id', id);

    if (error) {
      message.error('Erreur lors de la suppression du coach : ' + error.message);
    } else {
      message.success('Donnée supprimé avec succès');
      fetchCoach(); // Met à jour la liste après suppression
    }
    setLoading(false);
  };

  // Fonction pour afficher la modale de modification
  const showEditModal = (coach) => {
    setEditingCoach(coach);
    setIsModalVisible(true);
    form.setFieldsValue(coach); // Pré-remplit le formulaire avec les données actuelles
  };

  // Fonction pour mettre à jour l'athlète
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const { error } = await supabase
        .from('coachs')
        .update(values)
        .eq('id', editingCoach.id);

      if (error) {
        message.error('Erreur lors de la mise à jour du coach : ' + error.message);
      } else {
        message.success('Donnée mis à jour avec succès');
        fetchCoach(); // Rafraîchir la liste après la mise à jour
        setIsModalVisible(false); // Fermer la modale
      }
    } catch (error) {
      message.error('Erreur lors de la validation des champs : ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Colonnes du tableau
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
    },
    {
      title: 'Catégorie',
      dataIndex: 'categorie',
      key: 'categorie',
    },
    {
      title: 'Club/Pays',
      dataIndex: 'club_pays',
      key: 'club_pays',
    },
    {
      title: 'Sexe',
      dataIndex: 'sexe',
      key: 'sexe',
    },
    {
      title: 'Âge',
      dataIndex: 'age',
      key: 'age',
    },
   
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showEditModal(record)}>Modifier</Button>
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer  ?"
            onConfirm={() => deleteAthlete(record.id)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="link" danger>Supprimer</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchCoach();
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={coachs}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
        style={{ margin: '20px', borderRadius: '10px', overflow: 'hidden' }}
      />

      {/* Modale pour modifier un athlète */}
      <Modal
        title="Modifier les données"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        okText="Valider"
        cancelText="Annuler"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nom"
            name="nom"
            rules={[{ required: true, message: 'Veuillez entrer le nom de l\'athlète' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Prénom"
            name="prenom"
            rules={[{ required: true, message: 'Veuillez entrer le prénom de l\'athlète' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Catégorie"
            name="categorie"
            rules={[{ required: true, message: 'Veuillez entrer la catégorie de l\'athlète' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Club/Pays"
            name="club_pays"
            rules={[{ required: true, message: 'Veuillez entrer le club ou le pays de l\'athlète' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sexe"
            name="sexe"
            rules={[{ required: true, message: 'Veuillez sélectionner le sexe de l\'athlète' }]}
          >
            <Select>
              <Option value="M">Masculin</Option>
              <Option value="F">Féminin</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Âge"
            name="age"
            rules={[{ required: true, message: 'Veuillez entrer l\'âge de l\'athlète' }]}
          >
            <Input />
          </Form.Item>
         
        </Form>
      </Modal>
    </>
  );
};

export default CoachTable;
