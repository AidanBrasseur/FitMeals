import { Layout } from 'antd';
import React from 'react';
import AdminFeed from '../../components/AdminFeed/AdminFeed';
import Header from '../../components/Header/Header';
import './styles.css';

function AdminPage() {
 
  return (
    <Layout >
     <Header/>
      <Layout.Content className="site-layout" >
        <AdminFeed></AdminFeed>
      </Layout.Content>
    </Layout>
  );

}
export default AdminPage;