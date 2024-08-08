import CategoryProducts from "./CategoryProducts";
import Header from "./Header";
import SpectialProducts from "./SpecialProducts";

const Home = () => {
  return (
    <div className="w-[90%] mx-auto">
      <Header />
      <SpectialProducts />
      <CategoryProducts />
    </div>
  );
};

export default Home;
