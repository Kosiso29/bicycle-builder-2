import Header from "@/app/components/header";
import FeaturedBuildsContainer from "@/app/components/featured-builds-container";
import { fetchBuilds } from "@/app/lib/data";

export default async function Page() {
    const builds = await fetchBuilds();

    return (
        <div className="bg-back-color-1">
            <Header />
            <FeaturedBuildsContainer builds={builds} />
        </div>
    )
}
