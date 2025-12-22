import FAQSection from "@/components/home-page/FAQ";
import FeaturedArticles from "@/components/home-page/FeaturedArticles";
import FinancialProducts from "@/components/home-page/FinancialProducts";
import HomeSlider from "@/components/home-page/HomeSlider";
import HowWeWorks from "@/components/home-page/HowWeWorks";
import Promotion from "@/components/home-page/Promotion";
import Services from "@/components/home-page/Services";
import WhatsAppFloatButton from "@/components/home-page/WhatsAppFloatButton";
import EMICalculatorButton from "@/components/tools/EMICalculatorButton";

const HomePage = () => {
  return (
    <div>
      <EMICalculatorButton />
      <HomeSlider />
      <Services />
      <WhatsAppFloatButton phone="+8801711356235" className="z-50"/>
      <FinancialProducts />
      <HowWeWorks />
      <FeaturedArticles />
      {/* <PartnerSlider /> */}
      <Promotion />
      <FAQSection />
    </div>
  );
};

export default HomePage;
