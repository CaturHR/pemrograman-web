const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET: Menampilkan semua produk
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    res.render('products', { 
      title: 'List Products', 
      products: response.data.products 
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Error fetching products');
  }
});

// GET: Menampilkan detail produk berdasarkan ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    res.render('product-detail', { 
      title: 'Product Detail', 
      product: response.data 
    });
  } catch (error) {
    console.error(`Error fetching product ID ${id}:`, error.message);
    res.status(500).send('Error fetching product detail');
  }
});

// PUT: Update produk berdasarkan ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // data yang dikirim dari Postman

  try {
    const response = await axios.put(`https://dummyjson.com/products/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json({
      message: `Product ID ${id} updated successfully`,
      updatedProduct: response.data
    });
  } catch (error) {
    console.error(`Error updating product ID ${id}:`, error.message);
    res.status(500).send('Error updating product');
  }
});


module.exports = router;