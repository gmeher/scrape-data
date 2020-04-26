const startTime = Date.now();

const timeFromBeginning = () => {
  return (Date.now() - startTime)
}

console.log("1", timeFromBeginning());
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const axios = require('axios');

const csvWriter = createCsvWriter({
  path: 'tv.csv',
  header: [
    { id: 'id', title: 'id' },
    { id: 'slug', title: 'slug' },
    { id: 'category', title: 'category' },
    { id: 'permalink', title: 'permalink' },
  ]
});

async function getData(category, price_min, price_max, total_pages) {



  async function getMetaData(pageNumber) {
    const res = await axios({
      method: 'get',
      url: 'https://api.getgrover.com/api/v1/products',
      params: {
        filter: {
          category: category,
          in_stock: true,
          price_max: toString(price_max),
          price_min: toString(price_min)
        },
        page: pageNumber
      },
    })

    // total_pages = res.data.pagination.total_pages;


    const products = res.data.products;

    const products_meta_data = products.map(product => {
      return {
        id: product.id,
        slug: product.slug,
        category: product.category.title,
        permalink: product.category.permalink,
      }
    })


    return products_meta_data;



  }

  const arr = [];

  for (let i = 1; i < total_pages + 1; i++) {
    arr.push(getMetaData(i))
  }



  let Arr = await Promise.all(arr)

  console.log(Arr)

  const merged_Arr = [].concat.apply([], Arr);

  console.log(merged_Arr, timeFromBeginning());

  return merged_Arr;



}


async function update_csv(category, price_min, price_max, total_pages) {
  const Data = await getData(category, price_min, price_max, total_pages);
  csvWriter
    .writeRecords(Data)
    .then(() => console.log('The CSV file was written successfully', timeFromBeginning()));

}



try {
  update_csv('home-entertainment/tv', 2090, 6890, 2)
} catch (err) {
  console.log(err)
}


console.log("2", timeFromBeginning());



























const data = [
  {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M'
  }, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: 'F',
  }, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: 'F'
  }
];

// csvWriter
//   .writeRecords(data)
//   .then(() => console.log('The CSV file was written successfully'));