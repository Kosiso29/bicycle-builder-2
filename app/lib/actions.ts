'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


export async function createComponent(formData: FormData) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { category_id, brand_id, model, image_url, actual_width, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y,
        back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price, key_metrics, aerodynamics, weight, comfort, stiffness, overall,
        groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y, global_composite_operation, canvas_layer_level,
        lengths, sizes, ratios, size_chart_url, is_primary, color_props } = formDataObject;

    const modelsPresets: any = Object.entries(formDataObject).filter(item => item[0].includes("preset_"));

    try {
        await sql`
            INSERT INTO models (category_id, brand_id, name, image_url, actual_width, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y, 
            back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price, key_metrics, aerodynamics, weight, comfort, stiffness, overall, 
            groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y, global_composite_operation, canvas_layer_level,
            lengths, sizes, ratios, size_chart_url, is_primary)
            VALUES (${category_id}, ${brand_id}, ${model}, ${image_url}, ${Number(actual_width)}, ${stem_x}, ${stem_y}, ${saddle_x}, ${saddle_y}, ${front_wheel_x}, ${front_wheel_y}, 
            ${back_wheel_x}, ${back_wheel_y}, ${!!has_stem}, ${!!has_handle_bar}, ${price}, ${key_metrics}, ${aerodynamics}, ${weight}, ${comfort}, ${stiffness}, ${overall}, 
            ${groupset_drivetrain_x}, ${groupset_drivetrain_y}, ${groupset_shifter_x}, ${groupset_shifter_y}, ${handle_bar_x}, ${handle_bar_y}, ${global_composite_operation}, ${canvas_layer_level},
            ${JSON.parse(lengths)}, ${JSON.parse(sizes)}, ${JSON.parse(ratios)}, ${size_chart_url}, ${!!is_primary})
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
                INSERT INTO colors (model_id, name, value, image_url, price) VALUES (${model_id}::uuid, ${color_prop.name}, ${color_prop.value}, ${color_prop.image_url}, ${color_prop.price});
            `
        }

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

export async function updateModel(id: string, formData: any) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const modelsPresets: any = Object.entries(formDataObject).filter(item => item[0].includes("preset_"));

    const { category_id, brand_id, model, image_url, actual_width, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y,
        back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price, key_metrics, aerodynamics, weight, comfort, stiffness, overall,
        groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y, global_composite_operation, canvas_layer_level,
        lengths, sizes, ratios, size_chart_url, is_primary, color_props } = formDataObject;

    try {
        await sql`
        UPDATE models
        SET category_id = ${category_id}, brand_id = ${brand_id}, name = ${model}, image_url = ${image_url}, actual_width = ${actual_width}, stem_x = ${stem_x}, stem_y = ${stem_y}, saddle_x = ${saddle_x}, saddle_y = ${saddle_y}, front_wheel_x = ${front_wheel_x}, front_wheel_y = ${front_wheel_y}, 
        back_wheel_x = ${back_wheel_x}, back_wheel_y = ${back_wheel_y}, has_stem = ${!!has_stem}, has_handle_bar = ${!!has_handle_bar}, price = ${price}, key_metrics = ${key_metrics}, aerodynamics = ${aerodynamics}, weight = ${weight}, comfort = ${comfort}, stiffness = ${stiffness}, overall = ${overall}, 
        groupset_drivetrain_x = ${groupset_drivetrain_x}, groupset_drivetrain_y = ${groupset_drivetrain_y}, groupset_shifter_x = ${groupset_shifter_x}, groupset_shifter_y = ${groupset_shifter_y}, handle_bar_x = ${handle_bar_x}, handle_bar_y = ${handle_bar_y}, global_composite_operation = ${global_composite_operation}, canvas_layer_level = ${canvas_layer_level},
        lengths = ${JSON.parse(lengths)}, sizes = ${JSON.parse(sizes)}, ratios = ${JSON.parse(ratios)}, size_chart_url = ${size_chart_url}, is_primary = ${!!is_primary}
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
                INSERT INTO colors (model_id, name, value, image_url, price) VALUES (${id}::uuid, ${color_prop.name}, ${color_prop.value}, ${color_prop.image_url}, ${color_prop.price});
            `
        }

        revalidatePath('/dashboard/components');
        revalidatePath(`/dashboard/components/${id}/edit`);
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
