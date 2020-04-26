// function to return image_urls obj final.....................
function createPictureUrlsFromCloudinaryUrl(url) {
    return {
        mini: createPictureUrlFromCloudinaryUrl(url, 320, 320),
        small: createPictureUrlFromCloudinaryUrl(url, 640, 640),
        dashboard: createPictureUrlFromCloudinaryUrl(url, 960, 960),
        medium: createPictureUrlFromCloudinaryUrl(url, 1280, 1280),
        large: createPictureUrlFromCloudinaryUrl(url, 150, 1600, 1600),
        x_large: createPictureUrlFromCloudinaryUrl(url, 1920, 1920),
        x2_large: createPictureUrlFromCloudinaryUrl(url, 2240, 2240)
    }
}

// functions toattach filters on each image urls....................
function createPictureUrlFromCloudinaryUrl(url, width, height) {
    const cloudinary_url = url;
    const cloudinary_url_array = cloudinary_url.split('/');
    cloudinary_url_array.splice(6, 0, `c_pad,f_auto,q_auto,h_${height},w_${width},b_white`);
    const image_url = cloudinary_url_array.join('/');
    return image_url;
}


module.exports = createPictureUrlsFromCloudinaryUrl;