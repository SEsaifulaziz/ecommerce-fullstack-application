import React, { useState } from 'react';
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

// Category Banner Images
import homeBanner from './assets/Image/backgrounds/image 98.png';
import electronicsBanner from './assets/Image/backgrounds/image 106.png';

// Home and Outdoor Images
import itemH1 from './assets/Image/interior/1.png';
import itemH2 from './assets/Image/interior/3.png';
import itemH3 from './assets/Image/interior/6.png';
import itemH4 from './assets/Image/interior/7.png';
import itemH5 from './assets/Image/interior/8.png';
import itemH6 from './assets/Image/interior/9.png';
import itemH7 from './assets/Image/interior/image 89.png';
import itemH8 from './assets/Image/interior/image 93.png';

// Electronics Images
import itemE1 from './assets/Image/tech/8.png';
import itemE2 from './assets/Image/tech/image 85.png';
import itemE3 from './assets/Image/tech/image 32.png';
import itemE4 from './assets/Image/tech/image 33.png';
import itemE5 from './assets/Image/tech/image 34.png';
import itemE6 from './assets/Image/tech/image 23.png';
import itemE7 from './assets/Image/tech/image 86.png';
import itemE8 from './assets/Image/tech/6.png';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const homeAndOutdoorItems = [
    { name: "Soft chairs", price: "19", image: itemH1 },
    { name: "Sofa & chair", price: "19", image: itemH2 },
    { name: "Kitchen dishes", price: "19", image: itemH3 },
    { name: "Smart watches", price: "19", image: itemH4 },
    { name: "Kitchen mixer", price: "100", image: itemH5 },
    { name: "Blenders", price: "39", image: itemH6 },
    { name: "Home appliance", price: "19", image: itemH7 },
    { name: "Coffee maker", price: "10", image: itemH8 },
  ];

  const electronicsItems = [
    { name: "Smart watches", price: "19", image: itemE1 },
    { name: "Cameras", price: "89", image: itemE2 },
    { name: "Headphones", price: "10", image: itemE3 },
    { name: "Smartphones", price: "19", image: itemE4 },
    { name: "Gaming set", price: "35", image: itemE5 },
    { name: "Laptop & PC", price: "340", image: itemE6 },
    { name: "Smartphones", price: "19", image: itemE7 },
    { name: "Electric kettle", price: "240", image: itemE8 },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'listing':
        return <ProductListing setPage={setCurrentPage} />;
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

            <CategorySection
              title="Home and outdoor"
              bannerBg="#FFE6BF"
              bannerImg={homeBanner}
              items={homeAndOutdoorItems}
              setPage={setCurrentPage}
            />

            <CategorySection
              title="Consumer electronics"
              bannerBg="#E5F1FF"
              bannerImg={electronicsBanner}
              items={electronicsItems}
              setPage={setCurrentPage}
            />

            <InquiryForm />
            <RecommendedItems setPage={setCurrentPage} />
            <Services />
            <RegionSuppliers />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header setPage={setCurrentPage} />

      <main className="flex-grow pb-12">
        {renderContent()}
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;

