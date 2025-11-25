import EligibilityNavigation from "@/components/home-page/EligibilityNavigation";
import FAQSection from "@/components/home-page/FAQ";
import FeaturedArticles from "@/components/home-page/FeaturedArticles";
import FinancialProducts from "@/components/home-page/FinancialProducts";
import HowWeWorks from "@/components/home-page/HowWeWorks";
import PartnerSlider from "@/components/home-page/PartnerSlider";
import Promotion from "@/components/home-page/Promotion";
import Services from "@/components/home-page/Services";
import EMICalculatorButton from "@/components/tools/EMICalculatorButton";
import Image from "next/image";
import finups_islamic_banner from "/public/finups-islamic-banner.jpg";

const FinupsIslamicPage = () => {
  return (
    <div>
      {/* <EMICalculatorButton />
      <div className="mb-6 lg:mb-20">
        <Image src={finups_islamic_banner} alt="Finups Islamic" />
        <div className="relative bottom-[14%] left-0 right-0 z-10 lg:absolute">
          <EligibilityNavigation />
        </div>
      </div>

      <Services />
      <FinancialProducts />
      <HowWeWorks />
      <FeaturedArticles />
      <PartnerSlider />
      <Promotion />
      <FAQSection /> */}
    </div>
  );
};

export default FinupsIslamicPage;
