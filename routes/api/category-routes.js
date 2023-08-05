const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({ include: [{ model: Product }]});
    res.json(category);
  } catch(err) {
    res.status(500).json({ message: 'No Category Found' })
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findByPk(req.params.id, { include: [{ model: Product }]});
    res.json(oneCategory);
  } catch(err) {
    res.status(500).json({ messge: 'No Category found with that ID'});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory)
  } catch(err) {
    res.status(500).json({ message: 'Category could not be created.'})
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, { where: {id: req.params.id}});
    res.json(updateCategory)
  } catch(err) {
    res.status(500).json({ message: 'Category could not be updated.'})
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({ where: {id: req.params.id}});
    res.json(deleteCategory);
  } catch(err) {
    res.status(500).json({ message: 'Category could not be deleted.'})
  }
});

module.exports = router;
