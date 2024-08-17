const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@email.com',
        password: '123456',
        permission: '2'
    },
    {
        id: 'a1c544b2-4001-4271-9855-fec4b6a6442a',
        name: 'Admin',
        email: 'admin@email.com',
        password: 'shreyas&bike',
        permission: '1'
    },
];

const categories = [
    {
        id: 'f559ade9-effd-4463-bf0e-892b52c07826',
        name: 'Frame Set'
    },
    {
        id: '4e4d2dc9-0c27-48c8-8ea8-63f0d9eea603',
        name: 'Front Wheel Set'
    },
    {
        id: '7f66e21b-a23b-4267-a749-bafecf84e715',
        name: 'Back Wheel Set'
    },
    {
        id: '9569d23f-c977-4c85-b67d-71d2529fa63e',
        name: 'Stem'
    },
    {
        id: '37ffef15-c253-49bd-b29c-692071e9fd44',
        name: 'Handle Bar'
    },
    {
        id: 'd3d8ae41-7fe2-456f-b91f-53d470b17350',
        name: 'Saddle'
    },
    {
        id: '6141097c-1632-4460-96bc-4e8775ccb30c',
        name: 'Tyre'
    },
]

const brands = [
    {
        id: 'dbbfdd5a-ae37-4c7b-9bb6-7c82056e93e6',
        name: 'Cervelo'
    },
    {
        id: 'a9b8f6a3-8f48-480c-83e9-4c5c58cb598b',
        name: 'Giant'
    },
    {
        id: 'd9e15290-ef96-43aa-9477-c64efced7122',
        name: 'Specialized'
    },
    {
        id: 'd71d95bd-0e20-494a-91b0-e04b78bcfa45',
        name: 'Roval'
    },
    {
        id: 'c4a1feb7-710f-4828-a544-66e6124ff0c7',
        name: 'Cadex'
    },
    {
        id: 'ec0888ec-584f-4834-ab17-489ae983d608',
        name: 'ENVE'
    },
];

const presets = [
    {
        id: 'cbbfda5a-ae37-4c7b-9bb6-7c82756e93e6',
        name: 'None'
    },
    {
        id: '3bbfdd5a-ae37-4c7b-9bb6-7c82756e93e6',
        name: 'Aerodynamics'
    },
    {
        id: 'e9b8f6a3-8f48-480c-83e9-4c5c38cb598b',
        name: 'Lightweight'
    },
]

const colors = [
    {
        model_id: 'db38f486-7fdf-41c3-a5ea-1e49351d42d8',
        name: 'blue',
        image_url: 'https://i.postimg.cc/bNms33kg/specialized-allez-sprint.png'
    }
]

const models = [
    {
        category_id: categories[0].id,
        brand_id: brands[0].id,
        name: 'S5',
        image_url: '/Cervelo-R5.png',
        actual_width: 990,
        stem_x: 0,
        stem_y: 0,
        has_stem: true,
        has_handle_bar: true
    },
    {
        category_id: categories[0].id,
        brand_id: brands[0].id,
        name: 'Soloist',
        image_url: '/Cervelo-Soloist.png',
        actual_width: 990,
        stem_x: 600,
        stem_y: 152,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[0].id,
        brand_id: brands[1].id,
        name: 'Propel Advanced SL',
        image_url: '/Giant_Propel_Advanced_SL_Black_720x513.png',
        actual_width: 990,
        stem_x: 592,
        stem_y: 162,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[0].id,
        brand_id: brands[2].id,
        name: 'S-Works Tarmac SL8',
        image_url: '/S-Works_Tarmac_SL8_720x513.png',
        actual_width: 990,
        stem_x: 600,
        stem_y: 157,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[1].id,
        brand_id: brands[3].id,
        name: 'Rapide C 38',
        image_url: '/front-wheel.png',
        actual_width: 622,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[1].id,
        brand_id: brands[3].id,
        name: 'Rapide CLX II',
        image_url: '/Roval_Rapide_CLX_II_F-modified.png',
        actual_width: 622,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[1].id,
        brand_id: brands[4].id,
        name: '50 Ultra Disc',
        image_url: '/Cadex_50_Disc_Ultra_F-modified.png',
        actual_width: 622,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[2].id,
        brand_id: brands[3].id,
        name: 'Rapide C 38',
        image_url: '/back-wheel.png',
        actual_width: 622,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[2].id,
        brand_id: brands[3].id,
        name: 'Rapide CLX II',
        image_url: '/Roval_Rapide_CLX_II_R-modified.png',
        actual_width: 622,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[2].id,
        brand_id: brands[4].id,
        name: '50 Ultra Disc',
        image_url: '/Cadex_50_Ultra_Disc_R-modified.png',
        actual_width: 622,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[3].id,
        brand_id: brands[4].id,
        name: 'Race',
        image_url: '/Cadex-Race-modified.png',
        actual_width: 150,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[3].id,
        brand_id: brands[5].id,
        name: 'In-Route Aero Road',
        image_url: '/ENVE-IN-ROUTE_AERO_ROAD_STEM-modified.png',
        actual_width: 150,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[4].id,
        brand_id: brands[4].id,
        name: 'Race',
        image_url: '/Cadex-Handlebar.png',
        actual_width: 150,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[4].id,
        brand_id: brands[5].id,
        name: 'SES AR',
        image_url: '/ENVE-SES_AR_Road-modified.png',
        actual_width: 150,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[5].id,
        brand_id: brands[4].id,
        name: 'AMP',
        image_url: '/Cadex-AMP-modified.png',
        actual_width: 248,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[5].id,
        brand_id: brands[5].id,
        name: 'Selle Italia Boost SLR',
        image_url: '/ENVE-Selle_Italia_Boost_SLR-modified.png',
        actual_width: 248,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[6].id,
        brand_id: brands[4].id,
        name: 'Aero Tubeless',
        image_url: '/Cadex-Tire.png',
        actual_width: 662,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
    {
        category_id: categories[6].id,
        brand_id: brands[5].id,
        name: 'SES Road',
        image_url: '/Tan_SES31_FullWheel-modified.png',
        actual_width: 662,
        stem_x: 0,
        stem_y: 0,
        has_stem: false,
        has_handle_bar: false
    },
];


module.exports = {
    brands,
    models,
    categories,
    presets,
    users,
    colors
};
