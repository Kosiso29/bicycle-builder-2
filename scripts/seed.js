const { db } = require('@vercel/postgres');
const {
    brands,
    categories,
    models,
    presets,
    users,
    colors,
    accessories,
    accessory_models
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        permission VARCHAR(255) DEFAULT '2'
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (name, email, password, permission)
        VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.permission});
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`, insertedUsers);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

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

async function seedAccessories(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "accessories" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS accessories (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE
        );
        `;

        console.log(`Created "accessories" table`);

        // Insert data into the "accessories" table
        const insertedAccessories = await Promise.all(
            accessories.map((accessory) => client.sql`
                    INSERT INTO accessories (name)
                    VALUES (${accessory.name});
                `,
            ),
        );

        console.log(`Seeded ${insertedAccessories.length} accessories`);

        return {
            createTable,
            accessories: insertedAccessories,
        };
    } catch (error) {
        console.error('Error seeding accessories:', error);
        throw error;
    }
}

async function seedAccessoryModels(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "accessory_models" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS accessory_models (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                accessory_id UUID REFERENCES accessories(id),
                brand_id UUID REFERENCES brands(id),
                name VARCHAR(255) NOT NULL
            );
        `;

        console.log(`Created "accessory_models" table`);

        // Insert data into the "accessory_models" table
        const insertedAccessoryModels = await Promise.all(
            accessory_models.map((accessory_model) => client.sql`
                    INSERT INTO accessory_models (accessory_id, brand_id, name)
                    VALUES (${accessory_model.accessory_id}, ${accessory_model.brand_id}, ${accessory_model.name})
                `,
            ),
        );

        console.log(`Seeded ${insertedAccessoryModels.length} accessory_models`);

        return {
            createTable,
            accessory_models: insertedAccessoryModels,
        };
    } catch (error) {
        console.error('Error seeding accessory_models:', error);
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

async function seedColors(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "colors" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS colors (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                model_id UUID REFERENCES models(id) ON DELETE CASCADE,
                name VARCHAR(255),
                image_url VARCHAR(255),
                price NUMERIC(10, 2)
            );
        `;

        console.log(`Created "colors" table`);

        // Insert data into the "colors" table
        const insertedColors = await Promise.all(
            colors.map(async (color) => {
                return client.sql`
            INSERT INTO colors (model_id, name, image_url)
            VALUES (${color.model_id}, ${color.name}, ${color.image_url});
        `;
        }),
        );

        console.log(`Seeded ${insertedColors} colors`);

        return {
            createTable,
            colors: insertedColors,
        };
    } catch (error) {
        console.error('Error seeding colors:', error);
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
        ADD COLUMN linked_handle_bar UUID,
        ADD CONSTRAINT fk_linked_handle_bar
            FOREIGN KEY (linked_handle_bar) 
            REFERENCES models(id) 
            ON DELETE SET NULL;
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
            DROP TABLE IF EXISTS models_presets;

            CREATE TABLE models_presets (
                model_id UUID NOT NULL,
                preset_id UUID NOT NULL,
                PRIMARY KEY (model_id, preset_id),
                FOREIGN KEY (model_id) REFERENCES models(id) ON DELETE CASCADE,
                FOREIGN KEY (preset_id) REFERENCES presets(id) ON DELETE CASCADE
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

async function getModelsPresets(client) {
    try {

        // const deleteTable = await client.sql`DELETE FROM accessories WHERE name = 'Test';`;

        const modelsTable = await client.sql`SELECT * FROM models;`;
        
        const presetsTable = await client.sql`SELECT * FROM presets;`;

        const colorsTable = await client.sql`SELECT * FROM colors;`;
        
        // const insertData = await client.sql`INSERT INTO models_presets (model_id, preset_id) VALUES ('955fdc80-375b-47e5-88d2-2ce63df85078', '48b90652-65a3-4fb6-9a00-cbd2becb05c3');`;
        
        const modelsPresetsTable = await client.sql`SELECT * FROM models_presets;`;

        console.log('models data', modelsTable?.rows);
        console.log('presets data', presetsTable?.rows);
        console.log('colors data', colorsTable?.rows);
        console.log('modelsPresets data', modelsPresetsTable?.rows);

        return {
            modelsTable,
            presetsTable
        };
    } catch (error) {
        console.error('Error getting models_presets', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    // await seedPresets(client);
    // await seedAccessories(client);
    // await seedAccessoryModels(client);
    // await seedCategories(client);
    // await seedBrands(client);
    // await seedColors(client);
    // await seedModels(client);
    // await addColumns(client);
    // await alterColumns(client);
    // await alterForeignKeyColumns(client);
    // await createManyToManyMappingTable(client);
    await getModelsPresets(client);
    // await seedUsers(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
