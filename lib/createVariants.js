const createImageUrlsFromCloudinaryUrl = require('./create-images');
const createPictureUrlsFromCloudinaryUrl = require('./create-pictures');
const uploadToCloudinary = require('./cloudinary-upload');

// function to create Variants Obj Array of Products....................
async function createVariants(variants_array, trimmed_cloudinary_url, image_tags) {
    return Promise.all(variants_array.map(async(variant, i) => {
        let cloudinary_url;
        if (i === 0) {
            cloudinary_url = trimmed_cloudinary_url;
        } else {
            cloudinary_url = await uploadToCloudinary(variant.image_url, 2, { tags: [...image_tags, variant.property.title], folder: 'image' });
        }
        return {
            id: variant.id,
            name: variant.name,
            is_available: variant.is_available,
            is_master: variant.is_master,
            property: variant.property,
            image_url: cloudinary_url,
            image_urls: createImageUrlsFromCloudinaryUrl(cloudinary_url),
            core_attribute: variant.core_attribute,
            box_description: variant.box_description,
            delivery_estimates: variant.delivery_estimates,
            pictures: await create_pictures_object_array(variant.pictures, [...image_tags, variant.property.title], i)
        };
    }));
}

//function to create picture Objects array from picture_array
async function create_pictures_object_array(pictures_array, image_tags, i) {
    return Promise.all(pictures_array.map(async(picture, index) => {
        const cloudinary_raw_url = await uploadToCloudinary(picture.image_urls.x_large, 1, { tags: [...image_tags], folder: 'picture' });
        console.log(`%%%%%% $${index} pictures of $${i}  %%%%%% `, cloudinary_raw_url);
        return {
            picture_urls: createPictureUrlsFromCloudinaryUrl(cloudinary_raw_url),
            main: picture.main
        };
    }));
}



exports.createVariants = createVariants;