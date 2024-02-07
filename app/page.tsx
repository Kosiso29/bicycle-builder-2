import BikeBuilder from "./components/bike-builder";
import NoSSR from "./components/no-ssr";

export default function Home() {
    return (
        <main className="">
            <NoSSR>
                <BikeBuilder />
            </NoSSR>
        </main>

    );
}
