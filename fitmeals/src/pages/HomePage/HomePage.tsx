import { Layout } from 'antd';
import React from 'react';
import Categories from '../../components/Categories/Categories';
import Feed from '../../components/Feed/Feed';
import Header from '../../components/Header/Header';
import './styles.css';

function HomePage() {
 
  return (
    <Layout >
     <Header/>
      <Layout.Content className="site-layout" >
        <Categories></Categories>
        <Feed></Feed>
      </Layout.Content>
    </Layout>
  );

}
export default HomePage;