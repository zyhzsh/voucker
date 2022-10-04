import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';
import Carousel from '../components/Customer/Carousel';
import ProductList from '../components/Customer/ProductList';
import Pagination from '../components/Common/Pagination';
export default function Home() {
  return (
    <div data-theme="winter" className="relative overflow-hidden ">
      <Navbar />
      <Carousel />
      <ProductList />
      <Pagination />
      <Footer />
    </div>
  );
}
