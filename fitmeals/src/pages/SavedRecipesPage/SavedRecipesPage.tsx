import { Layout } from 'antd';
import React, { useState } from 'react';
import Categories from '../../components/Categories/Categories';
import Feed from '../../components/Feed/Feed';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './styles.css';

function SavedRecipesPage() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>()
  return (
    <Layout >
     <Header setSearchQuery={setSearchQuery}/>
      <Layout.Content className="saved-layout" >
        <Feed title={"Your Saved Recipes"} saved={true} searchQuery={searchQuery}></Feed>
      </Layout.Content>
      <Footer></Footer>
    </Layout>
  );

}
export default SavedRecipesPage;