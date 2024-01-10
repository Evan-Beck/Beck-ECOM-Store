const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products and include associated tags.
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one product by ID. 
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Creates a new product.
router.post('/', async (req, res) => {
  console.log("Received data:", req.body);
  try {
    const productData = await Product.create(req.body);
    console.log(req.body);
  if (req.body.tagIds && req.body.tagIds.length) {
    const productTagIdArr = req.body.tagIds.map(tag_id => {
      return {
        product_id: productData.id,
        tag_id,
      };
    });
    await ProductTag.bulkCreate(productTagIdArr);
  }
  const newProductData = await Product.findByPk(productData.id, {
    include: [{model: Tag, through: ProductTag }],
  });
    res.status(200).json(newProductData);
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json(err);
  }
});



// Updates the product by ID.
router.put('/:id', async (req, res) => {
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (req.body.tagIds) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });

      const currentTagIds = productTags.map(tag => tag.tag_id);
      const newTags = req.body.tagIds
        .filter(tag_id => !currentTagIds.includes(tag_id))
        .map(tag_id => ({
          product_id: req.params.id,
          tag_id,
        }));
      const tagsToRemove = productTags
        .filter(tag => !req.body.tagIds.includes(tag.tag_id))
        .map(tag => tag.id);

        await Promise.all([
          ProductTag.destroy({ where: { id: tagsToRemove } }),
          ProductTag.bulkCreate(newTags),
        ]);
      }
      const updatedProductData = await Product.findByPk(req.params.id, {
        include: [{ model: Tag, through: ProductTag }],
      });

    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Deletes the product by ID. 
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
