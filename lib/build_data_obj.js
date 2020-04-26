const { createVariants } = require("./createVariants");
const createImageUrlsFromCloudinaryUrl = require('./create-images');
const uploadToCloudinary = require('./cloudinary-upload');
const { createRentalPlans } = require("./createRentalPlans");
async function build_data_obj(p) {
    const image_tags = [p.id, p.brand, p.category_name, p.slug, p.frontname];
    const trimmed_cloudinary_url = await uploadToCloudinary(p.variants[0].image_url, 2, { tags: image_tags, folder: 'image' });
    console.log();
    var d = {
        id: p.id,
        slug: p.slug,
        name: p.name,
        description: p.contentful_record.description,
        short_description: p.contentful_record.short_description,
        core_attribute: p.core_attribute,
        image_urls: createImageUrlsFromCloudinaryUrl(trimmed_cloudinary_url),
        frontname: p.frontname,
        isnew: p.is_new,
        sku: p.sku,
        brand: p.brand,
        category_name: p.category_name,
        sub_category_name: p.sub_category_name,
        specifications: p.specifications,
        accessories: p.accessories,
        market_price_int: p.market_price_cents * 80 / 100,
        market_price_string: Intl.NumberFormat('en-IN').format(p.market_price_cents * 80 / 100),
        rental_plans: createRentalPlans(p.rental_plans),
        core_attribute: p.core_attribute,
        variants: await createVariants(p.variants, trimmed_cloudinary_url, image_tags),
        category: p.category,
        parent_category: p.parent_category,
    };
    return d;
}
exports.build_data_obj = build_data_obj;
