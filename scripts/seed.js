const { db } = require('@vercel/postgres');
const {
    brands,
    categories,
    models,
    presets
} = require('../app/lib/placeholder-data.js');

async function seedPresets(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "presets" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS presets (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `;

        console.log(`Created "presets" table`);

        // Insert data into the "presets" table
        const insertedPresets = await Promise.all(
            presets.map(async (preset) => {
                return client.sql`
        INSERT INTO presets (name)
        VALUES (${preset.name});
      `;
            }),
        );

        console.log(`Seeded ${insertedPresets.length} presets`, insertedPresets, createTable);

        return {
            createTable,
            presets: insertedPresets,
        };
    } catch (error) {
        console.error('Error seeding presets:', error);
        throw error;
    }
}

async function seedBrands(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "brands" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS brands (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `;

        console.log(`Created "brands" table`);

        // Insert data into the "brands" table
        const insertedBrands = await Promise.all(
            brands.map(async (brand) => {
                return client.sql`
        INSERT INTO brands (name)
        VALUES (${brand.name});
      `;
            }),
        );

        console.log(`Seeded ${insertedBrands.length} brands`);

        return {
            createTable,
            brands: insertedBrands,
        };
    } catch (error) {
        console.error('Error seeding brands:', error);
        throw error;
    }
}

async function seedCategories(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "categories" table if it doesn't exist
        const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
  );
`;

        console.log(`Created "categories" table`);

        // Insert data into the "categories" table
        const insertedCategories = await Promise.all(
            categories.map(
                (category) => client.sql`
        INSERT INTO categories (name)
        VALUES (${category.name});
      `,
            ),
        );

        console.log(`Seeded ${insertedCategories.length} categories`);

        return {
            createTable,
            categories: insertedCategories,
        };
    } catch (error) {
        console.error('Error seeding categories:', error);
        throw error;
    }
}

async function seedModels(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "models" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS models (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        category_id UUID REFERENCES categories(id),
        brand_id UUID REFERENCES brands(id),
        name VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        actual_width INTEGER,
        stem_x INTEGER,
        stem_y INTEGER,
        has_stem BOOLEAN,
        has_handle_bar BOOLEAN
      );
    `;

        console.log(`Created "models" table`);

        // Insert data into the "models" table
        const insertedModels = await Promise.all(
            models.map(
                (model) => client.sql`
        INSERT INTO models (category_id, brand_id, name, image_url, actual_width, stem_x, stem_y, has_stem, has_handle_bar)
        VALUES (${model.category_id}, ${model.brand_id}, ${model.name}, ${model.image_url}, ${model.actual_width}, ${model.stem_x}, ${model.stem_y}, ${model.has_stem}, ${model.has_handle_bar})
      `,
            ),
        );

        console.log(`Seeded ${insertedModels.length} models`);

        return {
            createTable,
            models: insertedModels,
        };
    } catch (error) {
        console.error('Error seeding models:', error);
        throw error;
    }
}

async function addColumns(client) {
    try {
        const addColumn = await client.sql`
        ALTER TABLE models 
        ADD COLUMN IF NOT EXISTS handle_bar_x INTEGER,
        ADD COLUMN IF NOT EXISTS handle_bar_y INTEGER;
    `

        const modelsTable = await client.sql`SELECT * FROM models;`;

        console.log(`Created columns in models`, modelsTable.rows);

        return {
            addColumn,
            modelsTable
        };
    } catch (error) {
        console.error('Error creating columns', error);
        throw error;
    }
}

async function alterColumns(client) {
    try {
        const alterColumn = await client.sql`
        ALTER TABLE models 
        ALTER COLUMN price TYPE numeric(10, 2);
    `

        console.log(`Adjusted column types`);

        const modelsTable = await client.sql`SELECT * FROM models;`;

        console.log('model data', modelsTable?.rows);

        return {
            alterColumn,
            modelsTable
        };
    } catch (error) {
        console.error('Error creating columns', error);
        throw error;
    }
}

async function alterForeignKeyColumns(client) {
    try {
        const alterForeignKeyColumn = await client.sql`
            DO $$ 
            DECLARE 
            my_uuid UUID;
            BEGIN
            SELECT id INTO my_uuid FROM presets WHERE name = 'None';

            EXECUTE 'ALTER TABLE models ADD COLUMN preset_id UUID DEFAULT ' || quote_literal(my_uuid);

            EXECUTE 'UPDATE models SET preset_id = ' || quote_literal(my_uuid) || ' WHERE preset_id IS NULL';

            EXECUTE 'ALTER TABLE models ADD CONSTRAINT fk_preset FOREIGN KEY (preset_id) REFERENCES presets (id)';
            END $$;
        `

        console.log(`Adjusted column types`, alterForeignKeyColumn);

        const modelsTable = await client.sql`SELECT * FROM models;`;

        console.log('model data', modelsTable?.rows);

        return {
            alterForeignKeyColumn,
            modelsTable
        };
    } catch (error) {
        console.error('Error creating columns', error);
        throw error;
    }
}

async function createManyToManyMappingTable(client) {
    try {
        const createTable = await client.sql`
            CREATE TABLE models_presets (
                model_id UUID NOT NULL,
                preset_id UUID NOT NULL,
                PRIMARY KEY (model_id, preset_id),
                FOREIGN KEY (model_id) REFERENCES models (id),
                FOREIGN KEY (preset_id) REFERENCES presets (id)
            );
        `

        const modelsPresets = await client.sql`SELECT * FROM models_presets;`;

        console.log('models_presets data', modelsPresets);

        console.log('Create table data', createTable);

        return {
            createTable,
            modelsPresets
        };
    } catch (error) {
        console.error('Error creating tables', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    // await seedPresets(client);
    // await seedCategories(client);
    // await seedBrands(client);
    // await seedModels(client);
    // await addColumns(client);
    // await alterColumns(client);
    // await alterForeignKeyColumns(client);
    await createManyToManyMappingTable(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
