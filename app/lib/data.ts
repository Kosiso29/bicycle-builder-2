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
            m.price,
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

        const models = data.rows.map((model: QueryResultRow) => ({
            ...model
        })) as Models;
        return models;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the models.');
    }
}

export async function fetchAccessoryModels(): Promise<Models> {
    noStore();
    try {
        const data = await sql`
        SELECT
            a.name AS accessory,
            b.name AS brand,
            am.name AS model,
            am.preview_image_url AS "previewSrc",
            am.id,
            am.price
        FROM
            accessories a
        JOIN
            accessory_models am ON a.id = am.accessory_id
        JOIN
            brands b ON am.brand_id = b.id
        ORDER BY
            b.name, am.name;`;

        const accessoryModels: any = data.rows.map((accessoryModel: QueryResultRow) => ({
            ...accessoryModel
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
    try {
        const data = await sql`
            SELECT 
                c.id as color_id, 
                c.name as color_name, 
                p.id as preset_id, 
                p.name as preset_name
            FROM colors_presets cp
            JOIN colors c ON cp.color_id = c.id
            JOIN presets p ON cp.preset_id = p.id;`;

        const colorsPresets = data.rows.map((colorPreset) => ({
            ...colorPreset
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
    try {
        const data = await sql`
        SELECT
            m.name AS model,
            c.model_id,
            c.id,
            c.name,
            c.value,
            c.image_url,
            c.price
        FROM
            colors c
        JOIN
            models m ON m.id = c.model_id
        ORDER BY
            c.name;`;

        const colors = data.rows;

        return colors;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the colors.');
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