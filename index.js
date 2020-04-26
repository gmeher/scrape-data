const { build_data_obj } = require("./lib/build_data_obj");
require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')
const neatCsv = require('neat-csv');




async function scrape_web_and_get_product_data(url) {


    const window = {};
    const scrapped = await axios.get(url);
    const $ = await cheerio.load(scrapped.data, { xmlMode: true });
    let data = $('body > script')[0].children[0].data;

    eval(data);
    const products_data = window.__INITIAL_STATE__.product.productById.data
    const ProductsArray = Object.keys(products_data).map(key => products_data[key])

    console.log("*****html parsed******", ProductsArray[0].frontname)

    const product_obj_data = await build_data_obj(ProductsArray[0]);

    const returned_data = await axios.post('http://localhost:8000/product', {
        product_data: product_obj_data
    })
    console.log("*******success*******", returned_data.data.frontname);


}




fs.readFile('./product-lists/phones-and-tablets/smartphones.csv', async (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    const d = await neatCsv(data)
    url_array = d.map(data => `https://www.grover.com/de-en/products/${data.slug}`)
    await Promise.all(url_array.map(async (url, i) => {
        if (i < 2)
            return scrape_web_and_get_product_data(url)
    }))
    console.log("done");
})





