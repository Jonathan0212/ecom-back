const router = require('express').Router();
const res = require('express/lib/response');
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: [
      'id',
      'category_name',
    ]
  }) .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this ID'});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((Category) => {
      if (req.body.CategoryIds.length) {
        const categoryTagIdArr = req.bodyCategoryIds.map((tag_id) => {
          return {
            category_id: category.id,
            category_name,
          };
        });
        return categoryTag.bulkCreate(categoryTagIdArr);''
      }
      res.status(200).json(category);
    })
    ,then((categoryTagIds) => res.status(200).json(categoryTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((CategoryIds) => {
    const categoryTagIds =  categoryTags.map(({ tag_id }) => tag_id);
    const newCategoryTags = req.body.categoryTagIds
    .fitler((tag_id) => {
      return {
        category_id: req.params.id,
        tag_id,
      };
});
  const categoryTagsToRemove = categoryTags
  .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
  .map(({ id }) => id);

  return Promise.all([
    CategoryTag.destroy({ where : {id: categoryTagsToRemove} }),
    CategoryTag.bulkCreate(newCategoryTags),
  ]);
})
.then((updatedCategoryTags) => res.json(updatedCategoryTags))
.catch((err) => {
  res.status(400).json(err);
});
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json ({ message: 'Category deleted'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



module.exports = router;
