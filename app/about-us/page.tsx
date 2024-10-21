import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import AboutUsHeroSection from "@/app/components/about-us-hero-section";
import OurHistorySection from "@/app/components/our-history-section";
import ThankYouSection from "@/app/components/thank-you-section";
import ReadyToRideSection from "@/app/components/ready-to-ride-section";

export default function Page() {
    return (
        <div>
            <Header textColor="white" />
            <AboutUsHeroSection />
            <OurHistorySection />
            <ThankYouSection />
            <ReadyToRideSection />
            <Footer />
        </div>
    )
}
