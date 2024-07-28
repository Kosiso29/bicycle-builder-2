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
        best_aerodynamics, best_lightweight, groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y } = formDataObject;

    const modelsPresets: any = Object.entries(formDataObject).filter(item => item[0].includes("preset_"));

    try {
        await sql`
            INSERT INTO models (category_id, brand_id, name, image_url, actual_width, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y, 
            back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price, key_metrics, aerodynamics, weight, comfort, stiffness, overall, 
            best_aerodynamics, best_lightweight, groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y)
            VALUES (${category_id}, ${brand_id}, ${model}, ${image_url}, ${Number(actual_width)}, ${stem_x}, ${stem_y}, ${saddle_x}, ${saddle_y}, ${front_wheel_x}, ${front_wheel_y}, 
            ${back_wheel_x}, ${back_wheel_y}, ${!!has_stem}, ${!!has_handle_bar}, ${price}, ${key_metrics}, ${aerodynamics}, ${weight}, ${comfort}, ${stiffness}, ${overall}, 
            ${best_aerodynamics}, ${best_lightweight}, ${groupset_drivetrain_x}, ${groupset_drivetrain_y}, ${groupset_shifter_x}, ${groupset_shifter_y}, ${handle_bar_x}, ${handle_bar_y})
        `;

        const selectedModel: any = await sql`
        SELECT * FROM models WHERE name = ${model} AND category_id = ${category_id} AND brand_id = ${brand_id} AND image_url = ${image_url};
        `;

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
    // let newModelsPresets = null;
    // if (modelsPresets.length > 0) {
    //     newModelsPresets = modelsPresets.map((modelPreset: any) => {
    //         const splitModelPreset = modelPreset[1].split("_");
    //         const model_id = splitModelPreset[0];
    //         const preset_id = splitModelPreset[1];
    //         return `('${model_id}', '${preset_id}')`
    //     }).join(', ');
    // }
    // console.log('formDataObject', formDataObject, modelsPresets, newModelsPresets);

    const { category_id, brand_id, model, image_url, actual_width, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y,
        back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price, key_metrics, aerodynamics, weight, comfort, stiffness, overall,
        best_aerodynamics, best_lightweight, groupset_drivetrain_x, groupset_drivetrain_y, groupset_shifter_x, groupset_shifter_y, handle_bar_x, handle_bar_y } = formDataObject;

    try {
        await sql`
        UPDATE models
        SET category_id = ${category_id}, brand_id = ${brand_id}, name = ${model}, image_url = ${image_url}, actual_width = ${actual_width}, stem_x = ${stem_x}, stem_y = ${stem_y}, saddle_x = ${saddle_x}, saddle_y = ${saddle_y}, front_wheel_x = ${front_wheel_x}, front_wheel_y = ${front_wheel_y}, 
        back_wheel_x = ${back_wheel_x}, back_wheel_y = ${back_wheel_y}, has_stem = ${!!has_stem}, has_handle_bar = ${!!has_handle_bar}, price = ${price}, key_metrics = ${key_metrics}, aerodynamics = ${aerodynamics}, weight = ${weight}, comfort = ${comfort}, stiffness = ${stiffness}, overall = ${overall}, 
        best_aerodynamics = ${best_aerodynamics}, best_lightweight = ${best_lightweight}, groupset_drivetrain_x = ${groupset_drivetrain_x}, groupset_drivetrain_y = ${groupset_drivetrain_y}, groupset_shifter_x = ${groupset_shifter_x}, groupset_shifter_y = ${groupset_shifter_y}, handle_bar_x = ${handle_bar_x}, handle_bar_y = ${handle_bar_y}
        WHERE id = ${id};
        `

        // Delete existing presets mapping for the current model so that new ones can be used to overwrite them
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

        // console.log('query', `INSERT INTO models_presets (model_id, preset_id) VALUES ${newModelsPresets};`)
        // if (newModelsPresets && newModelsPresets?.length > 0) {
        //     await sql`
        //     INSERT INTO models_presets (model_id, preset_id) VALUES ${newModelsPresets};
        //     `
        // }

        // if (newModelsPresets && newModelsPresets?.length > 0) {
        //     await sql`
        //     INSERT INTO models_presets (model_id, preset_id) VALUES ('19089797-86a4-4b1e-bd46-4272632580c2', 'e6deae44-6bba-4c1c-b0dd-2581bb8b9a3f'), ('19089797-86a4-4b1e-bd46-4272632580c2', '48b90652-65a3-4fb6-9a00-cbd2becb05c3');
        //     `
        // }

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
