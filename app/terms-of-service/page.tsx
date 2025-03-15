import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import TermsOfService from "@/app/terms-of-service/components/terms-of-service";
import ReadyToRideSection from "../components/ready-to-ride-section";

export default function Page() {
    return (
        <div>
            <Header textColor="white" />
            <TermsOfService />
            <ReadyToRideSection />
            <Footer />
        </div>
    )
}
