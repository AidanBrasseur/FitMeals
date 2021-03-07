import { Layout } from 'antd';
import React from 'react';
import Categories from '../../components/Categories/Categories';
import Feed from '../../components/Feed/Feed';
import Header from '../../components/Header/Header';
import './styles.css';

function SavedRecipesPage() {
 
  return (
    <Layout >
     <Header/>
      <Layout.Content className="saved-layout" >
        <Feed title={"Your Saved Recipes"}></Feed>
      </Layout.Content>
    </Layout>
  );

}
export default SavedRecipesPage;