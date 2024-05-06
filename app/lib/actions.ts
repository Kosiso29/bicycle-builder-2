'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";


export async function createComponent(formData: FormData) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { category_id, brand_id, model, image_url, actual_width, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y,
        back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price, key_metrics, aerodynamics, weight, comfort, stiffness, overall, best_aerodynamics, best_lightweight } = formDataObject;

    try {
        await sql`
        INSERT INTO models (category_id, brand_id, name, image_url, actual_width, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y, 
        back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price, key_metrics, aerodynamics, weight, comfort, stiffness, overall, best_aerodynamics, best_lightweight)
        VALUES (${category_id}, ${brand_id}, ${model}, ${image_url}, ${Number(actual_width)}, ${stem_x}, ${stem_y}, ${saddle_x}, ${saddle_y}, ${front_wheel_x}, ${front_wheel_y}, 
        ${back_wheel_x}, ${back_wheel_y}, ${!!has_stem}, ${!!has_handle_bar}, ${price}, ${key_metrics}, ${aerodynamics}, ${weight}, ${comfort}, ${stiffness}, ${overall}, ${best_aerodynamics}, ${best_lightweight})
      `;
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

export async function updateModel(id: string, formData: any) {
    const formDataObject: any = {};

    formData.forEach((value: any, key: any) => {
        formDataObject[key] = value;
    });

    const { category_id, brand_id, model, image_url, actual_width, stem_x, stem_y, saddle_x, saddle_y, front_wheel_x, front_wheel_y,
        back_wheel_x, back_wheel_y, has_stem, has_handle_bar, price, key_metrics, aerodynamics, weight, comfort, stiffness, overall, best_aerodynamics, best_lightweight } = formDataObject;

    try {
        await sql`
        UPDATE models
        SET category_id = ${category_id}, brand_id = ${brand_id}, name = ${model}, image_url = ${image_url}, actual_width = ${actual_width}, stem_x = ${stem_x}, stem_y = ${stem_y}, saddle_x = ${saddle_x}, saddle_y = ${saddle_y}, front_wheel_x = ${front_wheel_x}, front_wheel_y = ${front_wheel_y}, 
        back_wheel_x = ${back_wheel_x}, back_wheel_y = ${back_wheel_y}, has_stem = ${!!has_stem}, has_handle_bar = ${!!has_handle_bar}, price = ${price}, key_metrics = ${key_metrics}, aerodynamics = ${aerodynamics}, weight = ${weight}, comfort = ${comfort}, stiffness = ${stiffness}, overall = ${overall}, best_aerodynamics = ${best_aerodynamics}, best_lightweight = ${best_lightweight}
        WHERE id = ${id};
        `

        revalidatePath('/dashboard/components');
        revalidatePath(`/dashboard/components/${id}/edit`);
    } catch (error) {
        console.log('error', error);
    }
}
