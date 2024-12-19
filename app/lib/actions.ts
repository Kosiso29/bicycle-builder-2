'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});


const checkForNull = (value: string) => value === "" ? null : value

const executeParameterizedQuery = async (modelData: any, client: any, dataTable: string) => {

    // Extract columns and values
    const columns = Object.keys(modelData);
    const values = Object.values(modelData).map((value) =>
        value === undefined || value === "" ? null : value
    );

    // Generate placeholders for parameterized query
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");

    // Create the query string
    const query = `
        INSERT INTO ${dataTable} (${columns.join(", ")})
        VALUES (${placeholders});
    `;

    // Execute the query with parameterized values
    await client.query(query, values);
}

export async function createLinkedModels(formData: FormData, productId: string, client: any) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { category_id, brand_id, model, image_url, image_url_2, image_url_layer, actual_width, actual_width_2, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y,
        back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price_sg, price_gb, price_us, price_in, key_metrics, aerodynamics, weight, comfort, stiffness, overall,
        groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y, global_composite_operation, canvas_layer_level, global_composite_operation_2, canvas_layer_level_2,
        lengths, sizes, ratios, steerer_size, size_chart_url, is_primary, color_name, color_value, color_props, linked_stem, linked_handle_bar, preview_image_url, canvas_marker_x, canvas_marker_y,
        ////////////////////////////////////////////////// products props /////////////////////////////////////////////////////////////////
        sku, product_type_id, vendor, buy_price_us, location, lead_time, linked_component_category_id
    } = formDataObject;

    const modelData = {
        category_id: linked_component_category_id, brand_id, product_id: productId, name: model, image_url, actual_width, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y, back_wheel_x, back_wheel_y,
        has_stem: !!has_stem, has_handle_bar: !!has_handle_bar, price_sg, price_gb, price_us, price_in, key_metrics, aerodynamics, weight, comfort, stiffness, overall, groupset_drivetrain_x, groupset_drivetrain_y,
        groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y, global_composite_operation, canvas_layer_level,
        lengths: JSON.parse(lengths) || [], sizes: JSON.parse(sizes) || [], ratios: JSON.parse(ratios) || [],
        steerer_size, size_chart_url, is_primary: true, color_name, color_value, linked_stem: checkForNull(linked_stem), linked_handle_bar: checkForNull(linked_handle_bar),
        preview_image_url, canvas_marker_x, canvas_marker_y,
    };

    await executeParameterizedQuery(modelData, client, "models");

    // Select from models table
    const selectedModelId = await client.query(
        `
            SELECT * FROM models WHERE product_id = $1 AND category_id = $2 AND is_primary = $3;
        `,
        [productId, linked_component_category_id, true]
    );

    const modelId = selectedModelId.rows[0]?.id;

    if (!modelId) {
        throw new Error('Failed to retrieve linked model Id');
    }

    return modelId;
}

export async function createModel(formData: FormData, linkedStemFormData: any, linkedHandleBarFormData: any) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { category_id, brand_id, model, image_url, image_url_2, image_url_layer, actual_width, actual_width_2, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y,
        back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price_sg, price_gb, price_us, price_in, key_metrics, aerodynamics, weight, comfort, stiffness, overall,
        groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y, global_composite_operation, canvas_layer_level, global_composite_operation_2, canvas_layer_level_2,
        lengths, sizes, ratios, steerer_size, size_chart_url, is_primary, color_name, color_value, color_props, linked_stem, linked_handle_bar, preview_image_url, canvas_marker_x, canvas_marker_y,
        ////////////////////////////////////////////////// products props /////////////////////////////////////////////////////////////////
        sku, product_type_id, vendor, buy_price_us, location, lead_time, enabled
    } = formDataObject;

    const modelsPresets: any = Object.entries(formDataObject).filter(item => item[0].includes("preset_"));

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Insert into products table
        await client.query(
            `
                INSERT INTO products (sku, product_type_id, vendor, buy_price_us, sell_price_sg, sell_price_us, sell_price_gb, sell_price_in, location, lead_time, enabled)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            `,
            [sku, product_type_id, vendor, buy_price_us, price_sg, price_us, price_gb, price_in, location, lead_time, !!enabled]
        );

        // Select from products
        const selectedProduct = await client.query(
            `
            SELECT * FROM products WHERE sku = $1;
          `,
            [sku]
        );

        const productId = selectedProduct.rows[0]?.id;

        if (!productId) {
            throw new Error('Failed to retrieve product ID');
        }

        // Select from product_types
        const selectedProductType = await client.query(
            `
                SELECT * FROM product_types WHERE id = $1;
            `,
            [product_type_id]
        );

        const productTypeName = selectedProductType.rows[0]?.name;

        if (!productTypeName) {
            throw new Error('Failed to retrieve product type');
        }

        // Select from categories
        const categories = await client.query(`
            SELECT * FROM categories;
        `);

        let linkedStemModelId = null;
        let linkedHandleBarModelId = null;

        if (linkedStemFormData) {
            linkedStemModelId = await createLinkedModels(linkedStemFormData, productId, client);
        }

        if (linkedHandleBarFormData) {
            linkedHandleBarModelId = await createLinkedModels(linkedHandleBarFormData, productId, client);
        }

        for (const category of categories.rows) {
            if (category.name.includes(productTypeName)) {

                const modelInsertQuery = async (canvasLayerImageUrl?: string, globalCompositeOperation?: string, canvasLayerLevel?: string) => {
                    const imageUrl = /Back|Shifter/i.test(category.name) ? image_url_2 : image_url;
                    const actualWidth = Number(/Back|Shifter/i.test(category.name) ? actual_width_2 : actual_width);
                    const isPrimary = /Back|Shifter/i.test(category.name) ? false : true;

                    const modelData = {
                        category_id: category.id, brand_id, product_id: productId, name: model, image_url: canvasLayerImageUrl || imageUrl, actual_width: actualWidth, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y, back_wheel_x, back_wheel_y,
                        has_stem: !!has_stem, has_handle_bar: !!has_handle_bar, price_sg, price_gb, price_us, price_in, key_metrics, aerodynamics, weight, comfort, stiffness, overall, groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y,
                        global_composite_operation: globalCompositeOperation || global_composite_operation, canvas_layer_level: canvasLayerLevel || canvas_layer_level, lengths: JSON.parse(lengths) || [], sizes: JSON.parse(sizes) || [],
                        ratios: JSON.parse(ratios) || [], steerer_size, size_chart_url, is_primary: canvasLayerImageUrl ? false : isPrimary, color_name, color_value,
                        linked_stem: checkForNull(linkedStemModelId), linked_handle_bar: checkForNull(linkedHandleBarModelId), preview_image_url, canvas_marker_x, canvas_marker_y,
                    };

                    await executeParameterizedQuery(modelData, client, "models");

                };

                await modelInsertQuery();

                const selectedModel = await client.query(
                    `
                        SELECT * FROM models WHERE name = $1 AND category_id = $2 AND brand_id = $3 AND image_url = $4;
                    `,
                    [model, category.id, brand_id, /Back|Shifter/i.test(category.name) ? image_url_2 : image_url]
                );

                if (!/Back|Shifter/i.test(category.name)) {
                    if (image_url_layer && global_composite_operation_2 && canvas_layer_level_2) {
                        await modelInsertQuery(image_url_layer, global_composite_operation_2, canvas_layer_level_2);
                    }

                    // Only insert new presets if any were selected, else don't create any presets mapping
                    if (modelsPresets.length > 0) {
                        for (const modelPreset of modelsPresets) {
                            const splitModelPreset = modelPreset[1].split("_");
                            const model_id = selectedModel.rows[0]?.id;
                            const preset_id = splitModelPreset[1];

                            await client.query(
                                `
                                    INSERT INTO models_presets (model_id, preset_id)
                                    VALUES ($1::uuid, $2::uuid);
                                `,
                                [model_id, preset_id]
                            );
                        }
                    }
                }

                for (const color_prop of JSON.parse(color_props)) {
                    const model_id = selectedModel.rows[0]?.id;

                    await client.query(
                        `
                            INSERT INTO colors (model_id, name, value, image_url, price_sg, price_gb, price_us, price_in)
                            VALUES ($1::uuid, $2, $3, $4, $5, $6, $7, $8);
                        `,
                        [
                            model_id, color_prop.name, color_prop.value,
                            /Back|Shifter/i.test(category.name) ? color_prop.image_url_2 : color_prop.image_url,
                            color_prop.price_sg, color_prop.price_gb, color_prop.price_us, color_prop.price_in,
                        ]
                    );
                }
            }
        }

        await autoCalculateRatings();

        await client.query('COMMIT');

        return true;
    } catch (error: any) {
        await client.query('ROLLBACK');
        console.log('error', error);
        return error.message || 'Failed to create model';
    } finally {
        client.release(); // Ensure the connection is released
        revalidatePath('/dashboard/components');
    }

}

export async function createAccessoryModel(formData: FormData) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { accessory_id, brand_id, model, price_sg, price_gb, price_us, price_in, preview_image_url } = formDataObject;

    try {
        await sql`
            INSERT INTO accessory_models (accessory_id, brand_id, name, price_sg, price_gb, price_us, price_in, preview_image_url)
            VALUES (${accessory_id}, ${brand_id}, ${model}, ${price_sg}, ${price_gb}, ${price_us}, ${price_in}, ${preview_image_url})
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

export async function deleteProduct(id: string) {
    try {
        await sql`DELETE FROM products WHERE id = ${id}`;

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

export async function updateLinkedModels(formData: FormData, linkedComponentId: string) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { category_id, brand_id, model, image_url, image_url_2, image_url_layer, actual_width, actual_width_2, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y,
        back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price_sg, price_gb, price_us, price_in, key_metrics, aerodynamics, weight, comfort, stiffness, overall,
        groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y, global_composite_operation, canvas_layer_level, global_composite_operation_2, canvas_layer_level_2,
        lengths, sizes, ratios, steerer_size, size_chart_url, is_primary, color_name, color_value, color_props, linked_stem, linked_handle_bar, preview_image_url, canvas_marker_x, canvas_marker_y,
        ////////////////////////////////////////////////// products props /////////////////////////////////////////////////////////////////
        sku, product_type_id, vendor, buy_price_us, location, lead_time, linked_component_category_id
    } = formDataObject;

    await sql`
        UPDATE models
        SET category_id = ${linked_component_category_id}, brand_id = ${brand_id}, name = ${model}, image_url = ${image_url}, actual_width = ${actual_width}, stem_x = ${stem_x}, stem_y = ${stem_y}, saddle_x = ${saddle_x}, saddle_y = ${saddle_y}, front_wheel_x = ${front_wheel_x}, front_wheel_y = ${front_wheel_y}, 
        back_wheel_x = ${back_wheel_x}, back_wheel_y = ${back_wheel_y}, has_stem = ${!!has_stem}, has_handle_bar = ${!!has_handle_bar}, price_sg = ${price_sg}, price_gb = ${price_gb}, price_us = ${price_us}, price_in = ${price_in}, key_metrics = ${key_metrics}, aerodynamics = ${aerodynamics}, weight = ${weight}, comfort = ${comfort}, stiffness = ${stiffness}, overall = ${overall}, 
        groupset_drivetrain_x = ${groupset_drivetrain_x}, groupset_drivetrain_y = ${groupset_drivetrain_y}, groupset_shifter_x = ${groupset_shifter_x}, groupset_shifter_y = ${groupset_shifter_y}, handle_bar_x = ${handle_bar_x}, handle_bar_y = ${handle_bar_y}, global_composite_operation = ${global_composite_operation}, canvas_layer_level = ${canvas_layer_level},
        lengths = ${JSON.parse(lengths)}, sizes = ${JSON.parse(sizes)}, ratios = ${JSON.parse(ratios)}, steerer_size = ${steerer_size}, size_chart_url = ${size_chart_url}, is_primary = ${false}, color_name = ${color_name}, color_value = ${color_value}, linked_stem = ${checkForNull(linked_stem)}, linked_handle_bar = ${checkForNull(linked_handle_bar)}, preview_image_url = ${preview_image_url}, canvas_marker_x = ${canvas_marker_x}, canvas_marker_y = ${canvas_marker_y}
        WHERE id = ${linkedComponentId};
    `;
}

export async function updateModel(id: string, formData: any, linkedStemFormData: any, linkedHandleBarFormData: any) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const modelsPresets: any = Object.entries(formDataObject).filter(item => item[0].includes("preset_"));

    const { category_id, brand_id, model, image_url, image_url_2, image_url_layer, actual_width, actual_width_2, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y,
        back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price_sg, price_gb, price_us, price_in, key_metrics, aerodynamics, weight, comfort, stiffness, overall,
        groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y, global_composite_operation, canvas_layer_level, global_composite_operation_2, canvas_layer_level_2,
        lengths, sizes, ratios, steerer_size, size_chart_url, is_primary, color_name, color_value, color_props, linked_stem, linked_handle_bar, preview_image_url, canvas_marker_x, canvas_marker_y,
        ////////////////////////////////////////////////// products props /////////////////////////////////////////////////////////////////
        sku, product_type_id, vendor, buy_price_us, location, lead_time, enabled
    } = formDataObject;



    try {
        await sql`
            UPDATE products
            SET sku = ${sku}, product_type_id = ${product_type_id}, vendor = ${vendor}, buy_price_us = ${buy_price_us}, sell_price_sg = ${price_sg}, sell_price_us = ${price_us}, sell_price_gb = ${price_gb}, sell_price_in = ${price_in}, location = ${location}, lead_time = ${lead_time}, enabled = ${!!enabled}
            WHERE id = ${id};
        `

        const selectedProductType: any = await sql`
            SELECT * FROM product_types WHERE id = ${product_type_id};
        `;

        const productTypeName = selectedProductType.rows[0]?.name;

        if (!productTypeName) {
            throw new Error('Failed to retrieve product type');
        }

        const categories: any = await sql`
            SELECT * FROM categories;
        `;

        if (linkedStemFormData) {
            await updateLinkedModels(linkedStemFormData, linked_stem);
        }

        if (linkedHandleBarFormData) {
            await updateLinkedModels(linkedHandleBarFormData, linked_handle_bar);
        }

        for (const category of categories.rows) {
            if (category.name.includes(productTypeName)) {

                const getSelectedModel = async () => {
                    if (/Back|Shifter/i.test(category.name)) {
                        return await sql`
                            SELECT * FROM models WHERE product_id = ${id} AND category_id = ${category.id} AND is_primary = ${false};
                        `;
                    }

                    return await sql`
                        SELECT * FROM models WHERE product_id = ${id} AND category_id = ${category.id} AND is_primary = ${true};
                    `;
                }

                const selectedModel: any = await getSelectedModel();

                const modelId = selectedModel.rows[0]?.id;

                if (!modelId) {
                    throw new Error('Failed to retrieve model ID');
                }

                const modelUpdateQuery = async (modelUpdateId: string, canvasLayerImageUrl?: string, globalCompositeOperation?: string, canvasLayerLevel?: string) => {
                    const imageUrl = /Back|Shifter/i.test(category.name) ? image_url_2 : image_url;
                    const actualWidth = Number(/Back|Shifter/i.test(category.name) ? actual_width_2 : actual_width);
                    const isPrimary = /Back|Shifter/i.test(category.name) ? false : true;
                    await sql`
                        UPDATE models
                        SET category_id = ${category.id}, brand_id = ${brand_id}, name = ${model}, image_url = ${canvasLayerImageUrl || imageUrl}, actual_width = ${actualWidth}, stem_x = ${stem_x}, stem_y = ${stem_y}, saddle_x = ${saddle_x}, saddle_y = ${saddle_y}, front_wheel_x = ${front_wheel_x}, front_wheel_y = ${front_wheel_y}, 
                        back_wheel_x = ${back_wheel_x}, back_wheel_y = ${back_wheel_y}, has_stem = ${!!has_stem}, has_handle_bar = ${!!has_handle_bar}, price_sg = ${price_sg}, price_gb = ${price_gb}, price_us = ${price_us}, price_in = ${price_in}, key_metrics = ${key_metrics}, aerodynamics = ${aerodynamics}, weight = ${weight}, comfort = ${comfort}, stiffness = ${stiffness}, overall = ${overall}, 
                        groupset_drivetrain_x = ${groupset_drivetrain_x}, groupset_drivetrain_y = ${groupset_drivetrain_y}, groupset_shifter_x = ${groupset_shifter_x}, groupset_shifter_y = ${groupset_shifter_y}, handle_bar_x = ${handle_bar_x}, handle_bar_y = ${handle_bar_y}, global_composite_operation = ${globalCompositeOperation || global_composite_operation}, canvas_layer_level = ${canvasLayerLevel || canvas_layer_level},
                        lengths = ${JSON.parse(lengths)}, sizes = ${JSON.parse(sizes)}, ratios = ${JSON.parse(ratios)}, steerer_size = ${steerer_size}, size_chart_url = ${size_chart_url}, is_primary = ${canvasLayerImageUrl ? false : isPrimary}, color_name = ${color_name}, color_value = ${color_value}, linked_stem = ${checkForNull(linked_stem)}, linked_handle_bar = ${checkForNull(linked_handle_bar)}, preview_image_url = ${preview_image_url}, canvas_marker_x = ${canvas_marker_x}, canvas_marker_y = ${canvas_marker_y}
                        WHERE id = ${modelUpdateId};
                    `;
                }

                await modelUpdateQuery(modelId);

                // Delete existing presets mapping for the current model so that new ones can be used to overwrite them (this is only required in models update)
                await sql`
                    DELETE FROM models_presets WHERE model_id = ${modelId};
                `

                if (!/Back|Shifter/i.test(category.name)) {
                    // This handles layered image components therefore it gets its own component modelId from the database
                    if (image_url_layer && global_composite_operation_2 && canvas_layer_level_2) {
                        const layeredImageModel: any = await sql`
                            SELECT * FROM models WHERE product_id = ${id} AND category_id = ${category.id} AND is_primary = ${false};
                        `;

                        const layeredImageModelId = layeredImageModel.rows[0]?.id;

                        if (!layeredImageModelId) {
                            throw new Error('Failed to retrieve Layered Image model ID');
                        }

                        await modelUpdateQuery(layeredImageModelId, image_url_layer, global_composite_operation_2, canvas_layer_level_2);
                    }

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
                }

                // Delete existing colors
                await sql`
                    DELETE FROM colors WHERE model_id = ${modelId};
                `

                // recreate colors
                for (const color_prop of JSON.parse(color_props)) {
                    await sql`
                        INSERT INTO colors (model_id, name, value, image_url, price_sg, price_gb, price_us, price_in) VALUES (${modelId}::uuid, ${color_prop.name}, ${color_prop.value}, ${/Back|Shifter/i.test(category.name) ? color_prop.image_url_2 : color_prop.image_url}, ${color_prop.price_sg}, ${color_prop.price_gb}, ${color_prop.price_us}, ${color_prop.price_in});
                    `
                }
            }
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

    const { accessory_id, brand_id, model, price_sg, price_gb, price_us, price_in, preview_image_url } = formDataObject;

    try {
        await sql`
        UPDATE accessory_models
        SET accessory_id = ${accessory_id}, brand_id = ${brand_id}, name = ${model}, price_sg = ${price_sg}, price_gb = ${price_gb}, price_us = ${price_us}, price_in = ${price_in}, preview_image_url = ${preview_image_url}
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
