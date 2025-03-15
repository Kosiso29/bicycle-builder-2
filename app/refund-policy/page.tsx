import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import RefundPolicy from "@/app/refund-policy/components/refund-policy";
import ReadyToRideSection from "../components/ready-to-ride-section";

export default function Page() {
    return (
        <div>
            <Header textColor="white" />
            <RefundPolicy />
            <ReadyToRideSection />
            <Footer />
        </div>
    )
}
