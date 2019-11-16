import React from 'react';
import { SaleCard } from './components';
import { SpanningTable } from './components/FinishSaleDialog/FinishSaleDialog';
export default {
  title: 'Sales',
};

export const card = () => <SaleCard></SaleCard>;

export const finishTable = () => <SpanningTable></SpanningTable>;
