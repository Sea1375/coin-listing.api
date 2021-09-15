var express = require('express');
var router = express.Router();
var HomeController = require('./../controllers/HomeController');
var EntryController = require('./../controllers/EntryController');
var EmailController = require('./../controllers/EmailController');

/* GET users listing. */
router.get('/coin_listings', HomeController.loadCoinListings);
router.post('/add_entry', EntryController.addEntry);
router.post('/remove_entry', EntryController.removeEntry);
router.get('/get_entries', EntryController.getEntries);
router.post('/set_setting', EntryController.setSetting);
router.post('/get_setting', EntryController.getSetting);
router.post('/send_email', EmailController.sendPercentageEmail);
router.post('/column_visible_change', HomeController.columnVisibleChange);
router.get('/get_column_visibles', HomeController.getColumnVisibles);





module.exports = router;
