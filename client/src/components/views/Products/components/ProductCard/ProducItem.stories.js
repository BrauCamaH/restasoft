import React from 'react';

import ProductCard  from './ProductCard';

export default {
  title: 'Products'
};

const product = {
  image: 'http://lorempixel.com/500/500/food',
  price: 89,
  description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, mollitia qui! Nisi fugit consectetur sint illum reiciendis et error nihil quia, facilis sit excepturi. Odit officiis magnam nam vel perferendis.',
  name: 'Product Name',
};
export const card = () => <ProductCard product={product}></ProductCard>;

