import FeaturedBuildCarousel from "@/app/components/featured-build-carousel";
import { fetchBuilds } from "@/app/lib/data";

export default async function FeaturedBuildSection() {
    const builds = await fetchBuilds();

    return (
        <div>
            <FeaturedBuildCarousel builds={builds} />
        </div>
    )
}
