import { Layout } from 'antd';
import React from 'react';
import Categories from '../../components/Categories/Categories';
import Feed from '../../components/Feed/Feed';
import Header from '../../components/Header/Header';
import './styles.css';

function HomePage() {
 
  return (
    <Layout>
     <Header/>
      <Layout.Content className="home-layout" >
        <Categories></Categories>
        <Feed title={"Featured Recipes"}></Feed>
      </Layout.Content>
    </Layout>
  );

}
export default HomePage;