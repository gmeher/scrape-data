// function to return image_urls obj final.....................
function createImageUrlsFromCloudinaryUrl(url) {
    return {
        mini: createImageUrlFromCloudinaryUrl(url, 12, 12),
        small: createImageUrlFromCloudinaryUrl(url, 25, 25),
        dashboard: createImageUrlFromCloudinaryUrl(url, 60, 60),
        medium: createImageUrlFromCloudinaryUrl(url, 100, 100),
        large: createImageUrlFromCloudinaryUrl(url, 150, 150),
        x_large: createImageUrlFromCloudinaryUrl(url, 300, 300),
        x2_large: createImageUrlFromCloudinaryUrl(url, 500, 500)
    }
}

// functions toattach filters on each image urls....................
function createImageUrlFromCloudinaryUrl(url, width, height) {
    const cloudinary_url = url;
    const cloudinary_url_array = cloudinary_url.split('/');
    cloudinary_url_array.splice(6, 0, `c_pad,f_auto,q_auto,h_${height},w_${width},b_white`);
    const image_url = cloudinary_url_array.join('/');
    return image_url;
}


module.exports = createImageUrlsFromCloudinaryUrl;