const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Product.findAll({ include: [{ model: Product }]});
    res.json(tags)
  } catch(err) {
    res.status(500).json('Tags could not be found')
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Product.findByPk(req.params.id, { include: [{ model: Product }]});
    res.json(oneTag)
  } catch(err) {
    res.status(500).json({ message: 'No Tag found with that ID'})
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Product.create(req.body);
    res.json(newTag)
  } catch(err) {
    res.status(500).json({ message: 'New Tag could not be created'})
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Product.update(req.body, { where: {id: req.params.id}});
    res.json(updateTag)
  } catch(err) {
    res.status(500).json({ message: 'Tag could not be updated'})
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Product.destroy({ where: {id: req.params.id }});
    res.json(deleteTag)
  } catch(err) {
    res.status(500).json({ message: 'Tag could not be deleted' })
  }
});

module.exports = router;
