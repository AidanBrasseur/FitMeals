import { Layout } from 'antd';
import React, { useState } from 'react';
import Categories from '../../components/Categories/Categories';
import Feed from '../../components/Feed/Feed';
import Header from '../../components/Header/Header';
import './styles.css';

function HomePage() {
 const [searchQuery, setSearchQuery] = useState<string | undefined>()
 const [categoryQuery, setCategoryQuery] = useState<string[] | undefined>()
  return (
    <Layout>
     <Header setSearchQuery={setSearchQuery}/>
      <Layout.Content className="home-layout" >
        <Categories setCategoryQuery={setCategoryQuery}></Categories>
        <Feed title={"Featured Recipes"} searchQuery={searchQuery} categoryQuery={categoryQuery}></Feed>
      </Layout.Content>
    </Layout>
  );

}
export default HomePage;