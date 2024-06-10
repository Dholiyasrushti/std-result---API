var express = require('express');
var router = express.Router();

var multer = require('multer');
var user =require('../usercontroller/usercontroller')

router.post('/insert',user.insert);
router.get('/',user.getdata);
router.post('/admin_login',user.login_admin);

router.get('/logout',user.logout);
router.post('/delete/:id',user.delete_data);
router.post('/staff_add',user.staff_add);
router.get('/getstaff',user.getstaff);
router.post('/delete_staff/:id',user.delete_staff);
router.post('/update_staff/:id',user.update_staff);

router.post('/division',user.div);
router.post('/delete_div/:id',user.delete_div);
router.post('/update_div/:id',user.update_div);

router.post('/staff_login',user.staff_login);
router.post('/student',user.student);
router.get('/view',user.viewstudent);
router.post('/delete_student/:id',user.delete_student);
router.post('/update_student/:id',user.update_student);

router.post('/result',user.insertresult);
// router.get('/div_student/:id',user.div_student);
router.get('/top5',user.top5)


// router.post('/std',user.std);






module.exports = router;
