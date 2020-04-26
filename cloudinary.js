require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// cloudinary.uploader.upload('https://res-3.cloudinary.com/grover/image/upload/e_trim/v1581434649/v83126ljqblkizxeqjy0.png', { tags: 'basic_sample', folder: 'trim' })
//     .then(function(image) {
//         console.log();
//         console.log("** File Upload (Promise)");
//         console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
//         console.log("* " + image.public_id);
//         console.log("* " + image.url);
//     })
//     .catch(function(err) {
//         console.log();
//         console.log("** File Upload (Promise)");
//         if (err) { console.warn(err); }
//     });


async function uploadToCloudinary(url, filter_no, options) {

    try {

        const grover_image_url_array = url.split('/');
        grover_image_url_array.splice(7, filter_no);
        grover_image_url = grover_image_url_array.join('/');
        const image = await cloudinary.uploader.upload(grover_image_url, options);
        console.log();
        console.log("** File Upload (Promise)");
        console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
        console.log("* " + image.public_id);
        console.log("* " + image.secure_url);
        return image.secure_url;
    } catch (error) {
        console.error(error)
    }


}


async function run() {
    const url = "https://res-3.cloudinary.com/grover/image/upload/e_trim/c_fit,h_100,w_133/c_lpad,f_auto,fl_png8.lossy,h_200,q_auto,w_266/v1570781185/oicflvq6gfq5ttx4p1pn.png";
    const img_url = await uploadToCloudinary(url, 2, { folder: 'trim', public_id: "my_folder/my_sub_folder/my_dog" });
    console.log(img_url);
}

run();