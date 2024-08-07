import { QueryResultRow, sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from "next/cache";

// Types
import { Models } from "@/app/lib/definitions";

export async function fetchModels(): Promise<Models> {
    noStore();
    try {
        const data = await sql`
        SELECT
            c1.name AS category,
            b.name AS brand,
            p.name AS preset,
            m.name AS model,
            m.id,
            m.image_url AS src,
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
            m.price,
            m.key_metrics,
            m.aerodynamics,
            m.weight,
            m.comfort,
            m.stiffness,
            m.overall,
            m.best_aerodynamics,
            m.best_lightweight,
            m.global_composite_operation AS "globalCompositeOperation",
            c2.name AS "canvasLayerLevel"
        FROM
            categories c1
        JOIN
            models m ON c1.id = m.category_id
        JOIN
            brands b ON m.brand_id = b.id
        JOIN
            presets p ON m.preset_id = p.id
        LEFT JOIN
            categories c2 ON m.canvas_layer_level = c2.id 
        ORDER BY
            b.name, m.name;`;

        const models = data.rows.map((model: QueryResultRow) => ({
            ...model
        })) as Models;
        return models;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the models.');
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