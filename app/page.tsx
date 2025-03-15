import { Button } from "@mui/material";
import Link from "next/link";
import Header from "@/app/components/header";
import HeroSection from "@/app/components/hero-section";
import HowItWorks from "@/app/components/how-it-works";
import RoadBikesSection from "@/app/components/road-bikes-section";
import ReadyToRide from "@/app/components/ready-to-ride";
import Footer from "@/app/components/footer";
import PartnerSection from "@/app/components/partner-section";
import FeaturedBuildSection from "./components/featured-build-section";

export default function Home() {

    return (
        <main className="relative">
            <Header textColor="white" />
            <HeroSection />
            {/* <PartnerSection /> */}
            <HowItWorks />
            <RoadBikesSection />
            <FeaturedBuildSection />
            <ReadyToRide />
            <Footer />
            {/* <div className="h-screen flex items-center justify-center bg-[#1A1A1A]">
                <div className="flex gap-10">
                    <Link href="/build">
                        <Button variant="contained">New Build</Button>
                    </Link>
                    <Link href="/openai">
                        <Button variant="outlined">Current Bike</Button>
                    </Link>
                </div>
                <div className="absolute right-5 bottom-5">
                    <Link href="/login">
                        <Button variant="outlined">Admin</Button>
                    </Link>
                </div>
            </div> */}
        </main>
    );
}
