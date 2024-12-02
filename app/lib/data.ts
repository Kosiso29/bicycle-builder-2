import { QueryResultRow, sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from 'next/headers';

// Types
import { Models } from "@/app/lib/definitions";

// Map region to the appropriate price column
const regionPriceMapping: Record<string, string> = {
    sg: 'price_sg',
    us: 'price_us',
    gb: 'price_gb',
    in: 'price_in',
};

export async function fetchModels(): Promise<Models> {
    noStore();
    const regionCookie = cookies().get('region')?.value || 'us';

    const priceColumn = regionPriceMapping[regionCookie] || 'price_us'; // Fallback to 'price_us'
    try {
        const data = await sql`
        SELECT
            c1.name AS category,
            b.name AS brand,
            m.name AS model,
            c2.name AS "canvasLayerLevel",
            m.id,
            m.image_url AS src,
            m.preview_image_url AS "previewSrc",
            m.actual_width AS "actualWidth",
            m.has_stem AS "hasStem",
            m.has_handle_bar AS "hasHandleBar",
            m.stem_x AS "stemX",
            m.stem_y AS "stemY",
            m.saddle_x AS "saddleX",
            m.saddle_y AS "saddleY",
            m.front_wheel_x AS "frontWheelSetX",
            m.front_wheel_y AS "frontWheelSetY",
            m.back_wheel_x AS "backWheelSetX",
            m.back_wheel_y AS "backWheelSetY",
            m.groupset_drivetrain_x AS "groupSet_drivetrainX",
            m.groupset_drivetrain_y AS "groupSet_drivetrainY",
            m.groupset_shifter_x AS "groupSet_shifterX",
            m.groupset_shifter_y AS "groupSet_shifterY",
            m.handle_bar_x AS "handleBarX",
            m.handle_bar_y AS "handleBarY",
            m.price_sg,
            m.price_gb,
            m.price_us,
            m.price_in,
            m.key_metrics,
            m.aerodynamics,
            m.weight,
            m.comfort,
            m.stiffness,
            m.overall,
            m.global_composite_operation AS "globalCompositeOperation",
            m.lengths,
            m.sizes,
            m.ratios,
            m.steerer_size,
            m.size_chart_url,
            m.is_primary,
            m.color_name,
            m.color_value,
            m.linked_stem,
            m.linked_handle_bar
        FROM
            categories c1
        JOIN
            models m ON c1.id = m.category_id
        JOIN
            brands b ON m.brand_id = b.id
        LEFT JOIN
            categories c2 ON m.canvas_layer_level = c2.id 
        ORDER BY
            b.name, m.name;`;

        const models: any = data.rows.map((model: QueryResultRow) => ({
            ...model,
            price: model[priceColumn]
        }));
        return models;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the models.');
    }
}

export async function fetchProducts(): Promise<Models> {
    noStore();
    const regionCookie = cookies().get('region')?.value || 'us';

    const priceColumn = regionPriceMapping[regionCookie] || 'price_us'; // Fallback to 'price_us'
    try {
        const data = await sql`
        SELECT
            pt.name AS product_type,
            p.id,
            p.sku,
            p.vendor,
            p.buy_price_us,
            p.sell_price_sg,
            p.sell_price_us,
            p.sell_price_gb,
            p.sell_price_in,
            p.location,
            p.lead_time
        FROM
            product_types pt
        JOIN
            products p ON pt.id = p.product_type_id
        ORDER BY
            pt.name, p.vendor;`;

        const products: any = data.rows.map((product: QueryResultRow) => ({
            ...product,
            price: product[priceColumn]
        }));
        return products;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the products.');
    }
}

export async function fetchAccessoryModels(): Promise<Models> {
    noStore();
    const regionCookie = cookies().get('region')?.value || 'us';

    const priceColumn = regionPriceMapping[regionCookie] || 'price_us'; // Fallback to 'price_us'
    try {
        const data = await sql`
        SELECT
            a.name AS accessory,
            b.name AS brand,
            am.name AS model,
            am.preview_image_url AS "previewSrc",
            am.id,
            am.price_sg,
            am.price_us,
            am.price_gb,
            am.price_in
        FROM
            accessories a
        JOIN
            accessory_models am ON a.id = am.accessory_id
        JOIN
            brands b ON am.brand_id = b.id
        ORDER BY
            b.name, am.name;`;

        const accessoryModels: any = data.rows.map((accessoryModel: QueryResultRow) => ({
            ...accessoryModel,
            price: accessoryModel[priceColumn]
        }));
        return accessoryModels;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the accessoryModels.');
    }
}

export async function fetchAccessories() {
    noStore();
    try {
        const data = await sql`
        SELECT * FROM accessories;`;

        const accessories = data.rows.reduce((acc, row) => {
            acc[row.id] = row.name;
            return acc;
        }, {});

        return accessories;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the accessories.');
    }
}

export async function fetchModelsPresets() {
    noStore();
    try {
        const data = await sql`
            SELECT 
                m.id as model_id, 
                m.name as model_name, 
                p.id as preset_id, 
                p.name as preset_name
            FROM models_presets mp
            JOIN models m ON mp.model_id = m.id
            JOIN presets p ON mp.preset_id = p.id;`;

        const modelsPresets = data.rows.map((modelPreset) => ({
            ...modelPreset
        }));
        return modelsPresets;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the models_presets.');
    }
}

export async function fetchColorsPresets() {
    noStore();
    const regionCookie = cookies().get('region')?.value || 'us';

    const priceColumn = regionPriceMapping[regionCookie] || 'price_us'; // Fallback to 'price_us'
    try {
        const data = await sql`
            SELECT 
                c.id as color_id, 
                c.name as color_name,
                c.model_id as color_model_id,
                c.value as color_value,
                c.price_sg as color_price_sg,
                c.price_us as color_price_us,
                c.price_gb as color_price_gb,
                c.price_in as color_price_in,
                c.image_url as color_image_url, 
                p.id as preset_id, 
                p.name as preset_name
            FROM colors_presets cp
            JOIN colors c ON cp.color_id = c.id
            JOIN presets p ON cp.preset_id = p.id;`;

        const colorsPresets = data.rows.map((colorPreset) => ({
            ...colorPreset,
            color_price: colorPreset[`color_${priceColumn}`]
        }));
        return colorsPresets;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the colors_presets.');
    }
}

export async function fetchCategories() {
    noStore();
    try {
        const data = await sql`
        SELECT * FROM categories;`;

        const categories = data.rows.reduce((acc, row) => {
            acc[row.id] = row.name;
            return acc;
        }, {});

        return categories;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the categories.');
    }
}

export async function fetchBrands() {
    noStore();
    try {
        const data = await sql`
        SELECT * FROM brands;`;

        const brands = data.rows.reduce((acc, row) => {
            acc[row.id] = row.name;
            return acc;
        }, {});

        return brands;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the brands.');
    }
}

export async function fetchPresets() {
    noStore();
    try {
        const data = await sql`
        SELECT * FROM presets;`;

        const presets = data.rows.reduce((acc, row) => {
            acc[row.id] = row.name;
            return acc;
        }, {});

        return presets;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the presets.');
    }
}

export async function fetchBuilds() {
    noStore();
    try {
        const data = await sql`
        SELECT * FROM presets;`;

        const presets = data.rows;

        return presets;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the presets.');
    }
}

export async function fetchColors() {
    noStore();
    const regionCookie = cookies().get('region')?.value || 'us';

    const priceColumn = regionPriceMapping[regionCookie] || 'price_us'; // Fallback to 'price_us'
    try {
        const data = await sql`
        SELECT
            m.name AS model,
            c.model_id,
            c.id,
            c.name,
            c.value,
            c.image_url,
            c.price_sg,
            c.price_gb,
            c.price_us,
            c.price_in
        FROM
            colors c
        JOIN
            models m ON m.id = c.model_id
        ORDER BY
            c.name;`;

        const colors = data.rows.map((color: QueryResultRow) => ({
            ...color,
            price: color[priceColumn]
        }));;

        return colors;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the colors.');
    }
}

export async function fetchProductTypes() {
    noStore();
    try {
        const data = await sql`
        SELECT * FROM product_types;`;

        const productTypes = data.rows.reduce((acc, row) => {
            acc[row.id] = row.name;
            return acc;
        }, {});

        return productTypes;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the product_types.');
    }
}

export async function fetchProductById(id: string) {
    noStore();
    try {
        const data = await sql`
        SELECT * FROM products
        WHERE products.id = ${id};
        `

        const product = data.rows[0];

        return product;
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch the product.');
    }
}

export async function fetchModelById(id: string) {
    noStore();
    try {
        const data = await sql`
        SELECT * FROM models
        WHERE models.id = ${id};
        `

        const model = data.rows[0];

        return model;
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch the model.');
    }
}

export async function fetchAccessoryModelById(id: string) {
    noStore();
    try {
        const data = await sql`
            SELECT * FROM accessory_models
            WHERE accessory_models.id = ${id};
        `

        const accessory_model = data.rows[0];

        return accessory_model;
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch the accessory_model.');
    }
}

export async function fetchUsers() {
    noStore();
    try {
        const data = await sql`
        SELECT * FROM users`;

        const users: any = data.rows;
        return users;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the users.');
    }
}

export async function fetchBuildsAndModelsBuilds(builds: any, modelsPresets: any, models: any) {
    try {
        return builds.filter((build: any) => build.name !== "None").map((build: any) => {
            const filteredModelsPresets = modelsPresets.filter((modelPreset: any) => modelPreset.preset_id === build.id);
            return [ build, filteredModelsPresets.map((filteredModelsPreset: any) => {
                    const filteredModel = models.filter((model: any) => model.id === filteredModelsPreset.model_id);
                    return { brand: filteredModel[0].brand, model: filteredModel[0].model, category: filteredModel[0].category, id: filteredModel[0].id }
                })
            ]
        });
    } catch (error) {
        console.error('Evaluation Error:', error);
        throw new Error('Failed to evaluate the builds and modelsbuilds data');
    }
}