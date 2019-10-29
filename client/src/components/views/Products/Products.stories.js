import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { DropzoneDialog } from 'material-ui-dropzone';
import { ProductCard } from './components';

import Button from '@material-ui/core/Button';

export default {
  title: 'Products',
};

const product = {
  image: 'http://lorempixel.com/500/500/food',
  price: 89,
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, mollitia qui! Nisi fugit consectetur sint illum reiciendis et error nihil quia, facilis sit excepturi. Odit officiis magnam nam vel perferendis.',
  name: 'Product Name',
};

export const uploadimage = () => (
  <DropzoneArea
    filesLimit={1}
    acceptedfiles={['image/']}
    showFileNamesInPreview={true}
    showAlerts={false}
  />
);

export const UploadbyDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Add Image</Button>
      <DropzoneDialog open={open} showPreviews={true}></DropzoneDialog>
    </div>
  );
};
export const card = () => <ProductCard product={product}></ProductCard>
