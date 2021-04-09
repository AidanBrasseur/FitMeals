import { Layout } from 'antd';
import React, { useState } from 'react';
import AdminFeed from '../../components/AdminFeed/AdminFeed';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './styles.css';
import { Helmet } from 'react-helmet';

function AdminPage() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>()
  return (
    <Layout >
      <Helmet>
        <title>Admin Page</title>
      </Helmet>
     <Header setSearchQuery={setSearchQuery}/>
      <Layout.Content className="admin-layout" >
        <AdminFeed searchQuery={searchQuery}></AdminFeed>
      </Layout.Content>
      <Footer></Footer>
    </Layout>
  );

}
export default AdminPage;