import Banner from "../component/home/banner";
import Category from "../component/home/category";
import BestSelling from "../component/home/bestSelling";
import OtherProduct from "../component/home/otherProducts";

export default function Home() {
  return (
    <>
      <div className=" mt-5 ">
        <Banner />
      </div>
      <div className=" mt-5">
        <BestSelling />
      </div>
      <div className=" mt-9">
        <Category />
      </div>
      <div className=" m1-5">
        <OtherProduct />
      </div>
    </>
  );
}
