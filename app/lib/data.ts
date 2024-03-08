import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from "next/cache";

export async function fetchCategories() {
    noStore();
    try {
        const data = await sql`
        SELECT
            c.name AS category,
            b.name AS brand,
            m.name AS model,
            m.id AS "modelId",
            m.image_url AS src,
            m.actual_width AS "actualWidth",
            m.has_stem AS "hasStem",
            m.has_handle_bar AS "hasHandleBar",
            m.stem_x AS "stemX",
            m.stem_y AS "stemY"
        FROM
            categories c
        JOIN
            models m ON c.id = m.category_id
        JOIN
            brands b ON m.brand_id = b.id;`;

        const categories = data.rows.map((category) => ({
            ...category
        }));
        return categories;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the categories.');
    }
}