import React from 'react';
import Category from './CategoryItem';

const image = {
  id: 1,
  url: 'http://lorempixel.com/500/500/food',
  title: 'Breakfast',
};

export default {
  title: 'Category Item',
};

export const category = () => (
  <Category style={{ maxWidth: 300 }} image={image}></Category>
);
