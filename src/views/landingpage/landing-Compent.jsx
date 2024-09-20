import React from 'react';
import { Layout, Menu, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import LiveSection from './live-section';
import SectionEvent from './sectio-event';
import logo from './img/logo.svg'

const { Header } = Layout;

const MenueList = () => {
  return (
    <Layout>
      <Header style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}>
        {/* Logo */}
        <div style={{ color: '#000', fontWeight: 'bold', fontSize: '1.5em', marginRight: 'auto',bottom:'100' }}>
        <img src={logo} alt="Berry" width="100" height="100" />
        </div>

        {/* Menu */}
        <Menu mode="horizontal" style={{ backgroundColor: 'transparent', flexGrow: 1, justifyContent: 'center', color: '#000' }}>
          <Menu.Item key="evenement" style={{ color: '#000',fontSize: '1.1em' }}>
            Evenement
          </Menu.Item>
          <Menu.Item key="creer-club" style={{ color: '#000',fontSize: '1.1em' }}>
            Créer Club
          </Menu.Item>
          <Menu.Item key="boutique" style={{ color: '#000',fontSize: '1.1em'}}>
            Boutique
          </Menu.Item>
          <Menu.Item key="search" style={{ border: 'none',fontSize: '1.1em' }}>
            <Input
              placeholder="Rechercher"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
          </Menu.Item>
        </Menu>

        {/* Login Button */}
        <Button type="primary" style={{ marginLeft: 'auto', backgroundColor: '#c01c15', borderColor: '#c01c15' }}>
          Login
        </Button>
      </Header>

      {/* Adding some content to scroll */}
      <Layout.Content style={{ marginTop: 64, padding: '0 50px' }}>
        <div style={{ height: 'auto', background: '#fff', padding: 24 }}>
         <LiveSection/>
         <SectionEvent/>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default MenueList;