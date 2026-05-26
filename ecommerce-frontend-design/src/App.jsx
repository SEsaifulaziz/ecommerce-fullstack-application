import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Deals from './components/Deals';
import CategorySection from './components/CategorySection';
import InquiryForm from './components/InquiryForm';
import RecommendedItems from './components/RecommendedItems';
import Services from './components/Services';
import RegionSuppliers from './components/RegionSuppliers';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductListing from './components/ProductListing';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Messages from './components/Messages';
import Orders from './components/Orders';
import { fetchProducts } from './api/products';
import { useApp } from './context/AppContext';
import { getProductImage } from './utils/productImage';

import homeBanner from './assets/Image/backgrounds/image 98.png';
import electronicsBanner from './assets/Image/backgrounds/image 106.png';

function mapProductsToCategoryItems(products) {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: getProductImage(product.image),
  }));
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [homeProducts, setHomeProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [homeLoading, setHomeLoading] = useState(true);
  const [homeError, setHomeError] = useState('');
  const { openProduct } = useApp();

  useEffect(() => {
    let cancelled = false;

    async function loadHomeProducts() {
      setHomeLoading(true);
      setHomeError('');
      try {
        const page = await fetchProducts(0, 50);
        const all = page.content || [];
        if (cancelled) return;

        const electronics = all.filter((p) =>
          (p.category || '').toLowerCase().includes('electronic')
        );
        const homeAndOutdoor = all.filter(
          (p) => !(p.category || '').toLowerCase().includes('electronic')
        );

        setElectronicsProducts(mapProductsToCategoryItems(electronics.slice(0, 8)));
        setHomeProducts(mapProductsToCategoryItems(homeAndOutdoor.slice(0, 8)));
      } catch {
        if (!cancelled) {
          setHomeError('Could not load products from the server. Check VITE_API_BASE_URL in .env');
        }
      } finally {
        if (!cancelled) setHomeLoading(false);
      }
    }

    loadHomeProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleProductSelect = useCallback(
    (productId) => {
      openProduct(productId);
      setCurrentPage('details');
    },
    [openProduct]
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'listing':
        return <ProductListing setPage={setCurrentPage} onProductSelect={handleProductSelect} />;
      case 'details':
        return <ProductDetails setPage={setCurrentPage} />;
      case 'cart':
        return <Cart setPage={setCurrentPage} />;
      case 'profile':
        return <Profile setPage={setCurrentPage} />;
      case 'message':
        return <Messages setPage={setCurrentPage} />;
      case 'orders':
        return <Orders setPage={setCurrentPage} />;
      default:
        return (
          <div className="container">
            <Hero />
            <Deals />

            {homeError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {homeError}
              </div>
            )}

            {homeLoading ? (
              <p className="text-center text-[#8B96A5] py-10">Loading products from server...</p>
            ) : (
              <>
                <CategorySection
                  title="Home and outdoor"
                  bannerBg="#FFE6BF"
                  bannerImg={homeBanner}
                  items={homeProducts}
                  setPage={setCurrentPage}
                  onProductSelect={handleProductSelect}
                />

                <CategorySection
                  title="Consumer electronics"
                  bannerBg="#E5F1FF"
                  bannerImg={electronicsBanner}
                  items={electronicsProducts}
                  setPage={setCurrentPage}
                  onProductSelect={handleProductSelect}
                />
              </>
            )}

            <InquiryForm />
            <RecommendedItems onProductSelect={handleProductSelect} />
            <Services />
            <RegionSuppliers />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header setPage={setCurrentPage} />

      <main className="flex-grow pb-12">{renderContent()}</main>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
