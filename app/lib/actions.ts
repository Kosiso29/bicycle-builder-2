'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


const checkForNull = (value: string) => value === "" ? null : value

export async function createModel(formData: FormData) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { category_id, brand_id, model, image_url, actual_width, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y,
        back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price, price_gb, price_us, price_in, key_metrics, aerodynamics, weight, comfort, stiffness, overall,
        groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y, global_composite_operation, canvas_layer_level,
        lengths, sizes, ratios, size_chart_url, is_primary, color_name, color_value, color_props, linked_stem, linked_handle_bar, preview_image_url, canvas_marker_x, canvas_marker_y } = formDataObject;

    const modelsPresets: any = Object.entries(formDataObject).filter(item => item[0].includes("preset_"));

    try {
        await sql`
            INSERT INTO models (category_id, brand_id, name, image_url, actual_width, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y, 
            back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price, price_gb, price_us, price_in, key_metrics, aerodynamics, weight, comfort, stiffness, overall, 
            groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y, global_composite_operation, canvas_layer_level,
            lengths, sizes, ratios, size_chart_url, is_primary, color_name, color_value, linked_stem, linked_handle_bar, preview_image_url, canvas_marker_x, canvas_marker_y)
            VALUES (${category_id}, ${brand_id}, ${model}, ${image_url}, ${Number(actual_width)}, ${stem_x}, ${stem_y}, ${saddle_x}, ${saddle_y}, ${front_wheel_x}, ${front_wheel_y}, 
            ${back_wheel_x}, ${back_wheel_y}, ${!!has_stem}, ${!!has_handle_bar}, ${price}, ${price_gb}, ${price_us}, ${price_in}, ${key_metrics}, ${aerodynamics}, ${weight}, ${comfort}, ${stiffness}, ${overall}, 
            ${groupset_drivetrain_x}, ${groupset_drivetrain_y}, ${groupset_shifter_x}, ${groupset_shifter_y}, ${handle_bar_x}, ${handle_bar_y}, ${global_composite_operation}, ${canvas_layer_level},
            ${JSON.parse(lengths)}, ${JSON.parse(sizes)}, ${JSON.parse(ratios)}, ${size_chart_url}, ${!!is_primary}, ${color_name}, ${color_value}, ${checkForNull(linked_stem)}, ${checkForNull(linked_handle_bar)}, ${preview_image_url}, ${canvas_marker_x}, ${canvas_marker_y})
        `;

        const selectedModel: any = await sql`
        SELECT * FROM models WHERE name = ${model} AND category_id = ${category_id} AND brand_id = ${brand_id} AND image_url = ${image_url};
        `;

        // Only insert new presets if any were selected, else don't create any presets mapping
        if (modelsPresets.length > 0) {
            for (const modelPreset of modelsPresets) {
                const splitModelPreset = modelPreset[1].split("_");
                const model_id = selectedModel.rows[0]?.id;
                const preset_id = splitModelPreset[1];
                await sql`
              INSERT INTO models_presets (model_id, preset_id) VALUES (${model_id}::uuid, ${preset_id}::uuid);
              `
            }
        }

        // create colors
        for (const color_prop of JSON.parse(color_props)) {
            const model_id = selectedModel.rows[0]?.id;
            await sql`
                INSERT INTO colors (model_id, name, value, image_url, price, price_gb, price_us, price_in) VALUES (${model_id}::uuid, ${color_prop.name}, ${color_prop.value}, ${color_prop.image_url}, ${color_prop.price}, ${color_prop.price_gb}, ${color_prop.price_us}, ${color_prop.price_in});
            `
        }

        await autoCalculateRatings();

    } catch (error) {
        console.log('error', error)
    }

    revalidatePath('/dashboard/components');
}

export async function createAccessoryModel(formData: FormData) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { accessory_id, brand_id, model, price, preview_image_url } = formDataObject;

    try {
        await sql`
            INSERT INTO accessory_models (accessory_id, brand_id, name, price, preview_image_url)
            VALUES (${accessory_id}, ${brand_id}, ${model}, ${price}, ${preview_image_url})
        `;

    } catch (error) {
        console.log('error', error)
    }

    revalidatePath('/dashboard/components');
}

export async function createBuildsAndModelsBuilds(formData: FormData) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { name, image_url } = formDataObject;
    const model_ids: any = formData.getAll('model[]');
    const color_ids: any = formData.getAll('color[]');

    try {
        await sql`
            INSERT INTO presets (name, image_url)
            VALUES (${name}, ${image_url})
        `;

        const selectedBuild: any = await sql`
            SELECT * FROM presets WHERE name = ${name};
        `;

        const build_id = selectedBuild.rows[0].id;

        for (const model_id of model_ids) {
            if (model_id) {
                await sql`
                    INSERT INTO models_presets (model_id, preset_id) VALUES (${model_id}::uuid, ${build_id}::uuid);
                `
            }
        }

        for (const color_id of color_ids) {
            if (color_id) {
                await sql`
                    INSERT INTO colors_presets (color_id, preset_id) VALUES (${color_id}::uuid, ${build_id}::uuid);
                `
            }
        }

        await autoCalculateRatings();

    } catch (error) {
        console.log('error', error)
    }

    revalidatePath('/dashboard/components');
}

export async function deleteModel(id: string) {
    try {
        await sql`DELETE FROM models WHERE id = ${id}`;

        revalidatePath('/dashboard/components');
    } catch (error) {
        console.log('error', error)
    }
}

export async function deleteBuild(id: string) {
    try {
        await sql`DELETE FROM presets WHERE id = ${id}`;

        revalidatePath('/dashboard/components');
    } catch (error) {
        console.log('error', error)
    }
}

export async function deleteAccessoryModel(id: string) {
    try {
        await sql`DELETE FROM accessory_models WHERE id = ${id}`;

        revalidatePath('/dashboard/components');
    } catch (error) {
        console.log('error', error)
    }
}

export async function createBrands(brands: any) {

    try {
        for (const brand of brands) {
            await sql`
            INSERT INTO brands (name)
            VALUES (${brand})
            `;
        }
    } catch (error) {
        console.log('error', error)
    }

    revalidatePath('/dashboard/components');
}

export async function createPresets(presets: any) {

    try {
        for (const preset of presets) {
            await sql`
            INSERT INTO presets (name)
            VALUES (${preset})
            `;
        }
    } catch (error) {
        console.log('error', error)
    }

    revalidatePath('/dashboard/components');
}

export async function createAccessories(formData: any) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { accessories } = formDataObject;

    try {
        for (const accessory of JSON.parse(accessories)) {
            await sql`
                INSERT INTO accessories (name)
                VALUES (${accessory})
            `;
        }
    } catch (error) {
        console.log('error', error)
    }

    revalidatePath('/dashboard/components');
}

export async function updateModel(id: string, formData: any) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const modelsPresets: any = Object.entries(formDataObject).filter(item => item[0].includes("preset_"));

    const { category_id, brand_id, model, image_url, actual_width, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y,
        back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price, price_gb, price_us, price_in, key_metrics, aerodynamics, weight, comfort, stiffness, overall,
        groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y, global_composite_operation, canvas_layer_level,
        lengths, sizes, ratios, size_chart_url, is_primary, color_name, color_value, color_props, linked_stem, linked_handle_bar, preview_image_url, canvas_marker_x, canvas_marker_y } = formDataObject;



    try {
        await sql`
        UPDATE models
        SET category_id = ${category_id}, brand_id = ${brand_id}, name = ${model}, image_url = ${image_url}, actual_width = ${actual_width}, stem_x = ${stem_x}, stem_y = ${stem_y}, saddle_x = ${saddle_x}, saddle_y = ${saddle_y}, front_wheel_x = ${front_wheel_x}, front_wheel_y = ${front_wheel_y}, 
        back_wheel_x = ${back_wheel_x}, back_wheel_y = ${back_wheel_y}, has_stem = ${!!has_stem}, has_handle_bar = ${!!has_handle_bar}, price = ${price}, price_gb = ${price_gb}, price_us = ${price_us}, price_in = ${price_in}, key_metrics = ${key_metrics}, aerodynamics = ${aerodynamics}, weight = ${weight}, comfort = ${comfort}, stiffness = ${stiffness}, overall = ${overall}, 
        groupset_drivetrain_x = ${groupset_drivetrain_x}, groupset_drivetrain_y = ${groupset_drivetrain_y}, groupset_shifter_x = ${groupset_shifter_x}, groupset_shifter_y = ${groupset_shifter_y}, handle_bar_x = ${handle_bar_x}, handle_bar_y = ${handle_bar_y}, global_composite_operation = ${global_composite_operation}, canvas_layer_level = ${canvas_layer_level},
        lengths = ${JSON.parse(lengths)}, sizes = ${JSON.parse(sizes)}, ratios = ${JSON.parse(ratios)}, size_chart_url = ${size_chart_url}, is_primary = ${!!is_primary}, color_name = ${color_name}, color_value = ${color_value}, linked_stem = ${checkForNull(linked_stem)}, linked_handle_bar = ${checkForNull(linked_handle_bar)}, preview_image_url = ${preview_image_url}, canvas_marker_x = ${canvas_marker_x}, canvas_marker_y = ${canvas_marker_y}
        WHERE id = ${id};
        `

        // Delete existing presets mapping for the current model so that new ones can be used to overwrite them (this is only required in models update)
        await sql`
        DELETE FROM models_presets WHERE model_id = ${id};
        `

        // Only insert new presets if any were selected, else don't create any presets mapping
        if (modelsPresets.length > 0) {
            for (const modelPreset of modelsPresets) {
                const splitModelPreset = modelPreset[1].split("_");
                const model_id = splitModelPreset[0];
                const preset_id = splitModelPreset[1];
                await sql`
                INSERT INTO models_presets (model_id, preset_id) VALUES (${model_id}::uuid, ${preset_id}::uuid);
                `
            }
        }

        // Delete existing colors
        await sql`
            DELETE FROM colors WHERE model_id = ${id};
        `

        // recreate colors
        for (const color_prop of JSON.parse(color_props)) {
            await sql`
                INSERT INTO colors (model_id, name, value, image_url, price, price_gb, price_us, price_in) VALUES (${id}::uuid, ${color_prop.name}, ${color_prop.value}, ${color_prop.image_url}, ${color_prop.price}, ${color_prop.price_gb}, ${color_prop.price_us}, ${color_prop.price_in});
            `
        }

        await autoCalculateRatings();

        revalidatePath('/dashboard/components');
        revalidatePath(`/dashboard/components/${id}/edit`);
    } catch (error) {
        console.log('error', error);
    }
}

export async function updateAccessoryModel(id: string, formData: any) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { accessory_id, brand_id, model, price, preview_image_url } = formDataObject;

    try {
        await sql`
        UPDATE accessory_models
        SET accessory_id = ${accessory_id}, brand_id = ${brand_id}, name = ${model}, price = ${price}, preview_image_url = ${preview_image_url}
        WHERE id = ${id};
        `

        revalidatePath('/dashboard/components');
        revalidatePath(`/dashboard/components/accessory/${id}/edit`);
    } catch (error) {
        console.log('error', error);
    }
}

export async function updateBuildsAndModelsBuilds(id: string, formData: any) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { name, image_url } = formDataObject;
    const model_ids: any = formData.getAll('model[]');
    const color_ids: any = formData.getAll('color[]');

    try {
        await sql`
            UPDATE presets
            SET name = ${name}, image_url = ${image_url}
            WHERE id = ${id};
        `;

        // Delete existing models - builds mapping for the current build so that new ones can be used to overwrite them (this is only required in models builds update)
        await sql`
            DELETE FROM models_presets WHERE preset_id = ${id};
        `

        for (const model_id of model_ids) {
            if (model_id) {
                await sql`
                    INSERT INTO models_presets (model_id, preset_id) VALUES (${model_id}::uuid, ${id}::uuid);
                `
            }
        }

        // Delete existing presets mapping for the current color so that new ones can be used to overwrite them (this is only required in colors update)
        await sql`
            DELETE FROM colors_presets WHERE preset_id = ${id};
        `

        for (const color_id of color_ids) {
            if (color_id) {
                await sql`
                    INSERT INTO colors_presets (color_id, preset_id) VALUES (${color_id}::uuid, ${id}::uuid);
                `
            }
        }

        await autoCalculateRatings();

        revalidatePath('/dashboard/components');
        revalidatePath(`/dashboard/components/builds/${id}/edit`);
    } catch (error) {
        console.log('error', error);
    }
}


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function autoCalculateRatings() {

    try {
        await sql`
            WITH parameter_data AS (
                SELECT b.id AS preset_id,
                    -- Aerodynamics calculation
                    ROUND((
                        COALESCE((
                            SELECT m.aerodynamics
                            FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Front Wheel Set'
                        ), 0) +
                        COALESCE((
                            SELECT m.aerodynamics
                            FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Frame Set'
                        ), 0)
                    ) / 
                    (CASE
                        WHEN EXISTS (
                            SELECT 1 FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Front Wheel Set'
                        ) AND EXISTS (
                            SELECT 1 FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Frame Set'
                        ) THEN 2
                        WHEN EXISTS (
                            SELECT 1 FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Front Wheel Set'
                        ) OR EXISTS (
                            SELECT 1 FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Frame Set'
                        ) THEN 1
                        ELSE 1
                    END), 1) AS calculated_aerodynamics,

                    -- Weight calculation
                    ROUND((
                        COALESCE((
                            SELECT m.weight
                            FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Front Wheel Set'
                        ), 0) +
                        COALESCE((
                            SELECT m.weight
                            FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Frame Set'
                        ), 0)
                    ) /
                    (CASE
                        WHEN EXISTS (
                            SELECT 1 FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Front Wheel Set'
                        ) AND EXISTS (
                            SELECT 1 FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Frame Set'
                        ) THEN 2
                        WHEN EXISTS (
                            SELECT 1 FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Front Wheel Set'
                        ) OR EXISTS (
                            SELECT 1 FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Frame Set'
                        ) THEN 1
                        ELSE 1
                    END), 1) AS calculated_weight,

                    -- Overall calculation
                    ROUND((
                        COALESCE((
                            SELECT m.overall
                            FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Front Wheel Set'
                        ), 0) +
                        COALESCE((
                            SELECT m.overall
                            FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Frame Set'
                        ), 0)
                    ) /
                    (CASE
                        WHEN EXISTS (
                            SELECT 1 FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Front Wheel Set'
                        ) AND EXISTS (
                            SELECT 1 FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Frame Set'
                        ) THEN 2
                        WHEN EXISTS (
                            SELECT 1 FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Front Wheel Set'
                        ) OR EXISTS (
                            SELECT 1 FROM models m
                            JOIN models_presets mb ON m.id = mb.model_id
                            JOIN categories c ON m.category_id = c.id
                            WHERE mb.preset_id = b.id AND c.name = 'Frame Set'
                        ) THEN 1
                        ELSE 1
                    END), 1) AS calculated_overall
                FROM presets b
            )
            UPDATE presets
            SET
                aerodynamics = pd.calculated_aerodynamics::NUMERIC(2,1),
                weight = pd.calculated_weight::NUMERIC(2,1),
                overall = pd.calculated_overall::NUMERIC(2,1)
            FROM parameter_data pd
            WHERE presets.id = pd.preset_id;
        `;
    } catch (error) {
        console.log('error', error)
    }
}
