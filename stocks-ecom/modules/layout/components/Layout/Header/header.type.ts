import React from 'react';

export interface IHeaderItem {
  title:string,
  onClick(): void,
  display: boolean,
  icon: React.ReactNode
}
