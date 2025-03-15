import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import PrivacyPolicy from "@/app/privacy-policy/components/privacy-policy";
import ReadyToRideSection from "../components/ready-to-ride-section";

export default function Page() {
    return (
        <div>
            <Header textColor="white" />
            <PrivacyPolicy />
            <ReadyToRideSection />
            <Footer />
        </div>
    )
}
