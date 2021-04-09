import { Layout } from 'antd';
import React, { useState } from 'react';
import Categories from '../../components/Categories/Categories';
import Feed from '../../components/Feed/Feed';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './styles.css';
import { Helmet } from 'react-helmet';

function HomePage() {
 const [searchQuery, setSearchQuery] = useState<string | undefined>()
 const [categoryQuery, setCategoryQuery] = useState<string[] | undefined>()
  return (
    <Layout>
      <Helmet>
        <title>FitMeals Home</title>
      </Helmet>
      <Header setSearchQuery={setSearchQuery} />
      <Layout.Content className="home-layout" >
        <Categories setCategoryQuery={setCategoryQuery}></Categories>
        <Feed title={"Featured Recipes"} searchQuery={searchQuery} categoryQuery={categoryQuery}></Feed>
      </Layout.Content>
      <Footer></Footer>
    </Layout>
  );
}
export default HomePage;