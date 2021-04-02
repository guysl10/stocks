mport React from 'react';
import ProductGrid from '../../products/components/ProductGrid/ProductGrid';
import { getHomePageProducts } from '../shared/homeService';

function Home() {
  return (
    <div>
      <ProductGrid gridService={getHomePageProducts} />
    </div>
  );
}

export default Home;