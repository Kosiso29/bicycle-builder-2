import { sql } from '@vercel/postgres';

export async function fetchModels() {
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

        const models = data.rows.map((model) => ({
            ...model
        }));
        return models;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the models.');
    }
}

export async function fetchCategories() {
    try {
        const data = await sql`
        SELECT ARRAY_AGG(name) AS categories FROM categories;`;

        const categories = data.rows[0].categories;
        return categories;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the categories.');
    }
}

export async function fetchBrands() {
    try {
        const data = await sql`
        SELECT ARRAY_AGG(name) AS brands FROM brands;`;

        const brands = data.rows[0].brands;
        return brands;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the brands.');
    }
}