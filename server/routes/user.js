const { Router } = require('express');
const express=require('express');
const { append } = require('express/lib/response');
const router=express.Router();
const userController=require('../controllers/userController');




//create,find,update,delete
 
 
router.get('/',userController.test);
router.get('/login',userController.login);

//router.get('/',userController.loginf);


router.get('/admin',userController.access);

router.get('/IIT',userController.iit);
router.get('/CSE',userController.cse);
router.get('/IBA',userController.iba);

router.get('/Batch',userController.batch);
router.get('/Batch1',userController.batch1);
router.get('/Batch2',userController.batch2);

router.get('/index',userController.logout);


router.get('/home',userController.view);
router.post('/home',userController.find);

router.get('/tracking',userController.trackaccess);

router.get('/newActivity',userController.enter);
router.post('/tracking',userController.check);
router.post('/newActivity',userController.insert);

router.get('/add-user',userController.form);
router.post('/add-user',userController.create);


router.get('/edit-user/:id',userController.edit);
router.post('/edit-user/:id',userController.update);
router.get('/:id',userController.delete);
router.get('/view-user/:id',userController.viewall);


router.get('/activity-from-home/:id',userController.entr);
router.post('/activity-from-home',userController.entract);







module.exports=router;