import Builder from "../components/builder";
import { fetchCategories } from "@/app/lib/data";

export default async function Build() {
 
    const categories = await fetchCategories();

    return (
        <main>
            <Builder categories={categories} />
        </main>

    );
}
