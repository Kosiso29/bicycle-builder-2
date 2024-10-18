import Header from "@/app/components/header";
import FeaturedBuilds from "@/app/components/featured-builds";
import { fetchBuilds } from "@/app/lib/data";

export default async function Page() {
    const builds = await fetchBuilds();

    return (
        <div className="bg-back-color-1">
            <Header />
            <div className="pt-32 wrapper-padding">
                <h1 className="flex items-center text-3xl font-bold">Featured Builds <span className="text-2xl font-normal ml-1">({ builds.filter((build: any) => build.name !== "None").length })</span></h1>
                <FeaturedBuilds builds={builds} />
            </div>
        </div>
    )
}
