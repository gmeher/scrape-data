// const neatCsv = require('neat-csv');

// const fs = require('fs')

// fs.readFile('./product-lists/phones-and-tablets/smartphones.csv', async (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     const d = await neatCsv(data)
//     d.map(data => console.log(data.slug))
//     // console.log(d);
// })

const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.grover.com/de-en/products/smartphone-samsung-galaxy-s20-128gb';

async function scrape_web_and_get_product_data() {
    const window = {};
    const scrapped = await axios.get(url);
    const $ = await cheerio.load(scrapped.data, { xmlMode: true });
    let data = $('body > script')[0].children[0].data;

    eval(data);
    const products_data = window.__INITIAL_STATE__.product.productById.data
}

scrape_web_and_get_product_data();