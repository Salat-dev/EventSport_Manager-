import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, ContainerOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import { Link } from 'react-router-dom';

const items = [

  {
    label: (
        <Link to="/create_event" style={{ textDecoration: 'none', color: 'inherit' }}>
            Créer un évènement
        </Link>
    ),
    key: 'event',
    icon: <EmojiEventsOutlinedIcon />,
},
{
  label: 'Créer/Gérer votre équipe',
  key: 'cr',
  icon: <AppRegistrationOutlinedIcon />,
  children: [
    {
      type: 'group',
        label:'Pas d équipe ',
      children: [
        {
          label: 'Enregistrer équipe',
          key: 'no',
        }
      ],
    },
    {
      type: 'group',
      label:'vous avez une équipe',
      children: [
        {
          label: 'Gérer votre équipe',
          key: 'create',
        }
      ],
    },
  ],
},

  {
    label: 'Se connecter/Créer un compte',
    key: 'login',
    icon: <HowToRegOutlinedIcon />,
    children: [
      {
        type: 'group',

        children: [
          {
            label: 'Authentification',
            key: 'auth',
          }
        ],
      },
      {
        type: 'group',
        children: [
          {
            label: 'Créer un compte',
            key: 'reg',
          }
        ],
      },
    ],
  },
 
];
const MenueList = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default MenueList;