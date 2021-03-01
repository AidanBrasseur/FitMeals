import { Layout } from 'antd';
import React from 'react';
import Categories from '../../components/Categories/Categories';
import Feed from '../../components/Feed/Feed';
import Header from '../../components/Header/Header';
import './styles.css';

function AdminPage() {
 
  return (
    <Layout >
     <Header/>
      <Layout.Content className="site-layout" >
       
        <Feed></Feed>
      </Layout.Content>
    </Layout>
  );

}
export default AdminPage;