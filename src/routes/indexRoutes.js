const express = require('express');

const router = express.Router();

const { renderHome, renderSecter } = require('../controllers/indexControllers');
const { checkAbob } = require('../middlewares/common')

router.get('/', renderHome);
router.get('/secret', checkAbob, renderSecter);


module.exports = router;
