var admin = require('../model/admin');
var staff = require('../model/staff');
const storage = require('node-persist');
storage.init( /* options... */)
const bcrypt= require('bcrypt');
const division = require('../model/division');
const student = require('../model/student');

const standard = require('../model/standard');
const result = require('../model/result');
// ============================ add admin=======================

exports.insert = async (req,res) =>{
    var b_pass = await bcrypt.hash(req.body.admin_pass,10);
    req.body.admin_pass=b_pass;
    var data = await admin.create(req.body);
    res.status(200).json({
        status:"Admin Insert",
        data
    })
}

exports.getdata = async (req,res) =>{
    var data = await admin.find();
    res.status(200).json({
        data
    })
}
//  =================================== admin login================================================
exports.login_admin = async (req,res) =>{
    var  admin_status = await storage.getItem('login_admin');
    // 3
    if(admin_status == undefined){
        var data = await admin.find({"admin_name":req.body.admin_name});
        console.log(data.length);
        if(data){
            bcrypt.compare(req.body.admin_pass,data[0].admin_pass,async function(err,result){
                console.log(result);
                if(result == true){
                    await storage.setItem('login_admin',data[0].id);
                    res.status(200).json({
                        status:"Login Success"
                    })
                }else{
                    res.status(200).json({
                        status:"Check Your admin name and password"
                    })
                }
            })  
        }else{
            res.status(200).json({
                status:"Check Your admin name and password"
            })
        }
    }else {
        res.status(200).json({
            status:"Admin is already login"
        })
    }
}
exports.delete_data = async (req,res)=>{
    var id = req.params.id;
    var data = await admin.findByIdAndDelete(id,req.body);
    res.status(200).json({
        status:"data delete",
    })
}
exports.logout = async(req,res)=>{
    await storage.clear();
    res.status(200).json({
        status:" logout "
    })
}

// exports.std= async(req,res) =>{
//     var data = await standard.create(req.body);
//     res.status(200).json({
//         status:"std Insert",
//         data
//     })
// }

// ========================================== division =====================================
exports.div= async(req,res) =>{
    var admin_id = await storage.getItem('login_admin');
    if(admin_id){
        var data = await division.create(req.body);
        res.status(200).json({
            status:"division Insert",
            data
        })
    }else{
        res.status(200).json({
            status:"Only admin can add division "
        })  
    }

    
}

exports.update_div = async (req,res) =>{
    var admin_id = await storage.getItem('login_admin');
    if(admin_id){
        var id = req.params.id;
        var data = await division.findByIdAndUpdate(id,req.body);
        res.status(200).json({
            data
        })
    }else{
        res.status(200).json({
            status:"Only admin can update division "
        })        
    }

}

exports.delete_div = async (req,res)=>{
    var admin_id = await storage.getItem('login_admin');

    if(admin_id){
        var id = req.params.id;
        var data = await division.findByIdAndDelete(id,req.body);
        res.status(200).json({
            status:"data delete",
        })
    }else{
        res.status(200).json({
            status:"Only admin can delete division "
        })
    }
}




// =======================================staff ================================================

exports.staff_add =async (req,res)=>{
        var admin_id = await storage.getItem('login_admin');

    // console.log(admin_id);
        if(admin_id){
            var b_pass = await bcrypt.hash(req.body.staff_pass,10);
            req.body.staff_pass=b_pass;
            var data = await staff.create(req.body);
            res.status(200).json({
                status:"staff Insert",
                data
            })
        }else{
            res.status(200).json({
                status:"Only admin can add staff."
            })
        }
        
    }
exports.getstaff = async (req,res) =>{
    var admin_id = await storage.getItem('login_admin');

    if(admin_id){
        var total_recode = await task.find().count();
        var page_no =req.query.page_no;
        if(page_no == undefined){
            page_no = 1
        }
        var limit = 2;
        var total_page=Math.ceil(total_recode/limit);
        var start =(page_no-1)*limit;
        var data = await staff.find().skip(start).limit(limit);
        res.status(200).json({
            data,
            page_no,
            total_page
        })
    }else{
        res.status(200).json({
            status:"Only admin can view staff."
        })
    }
}

exports.delete_staff = async (req,res)=>{
    var admin_id = await storage.getItem('login_admin');

    if(admin_id){
        var id = req.params.id;
        var data = await staff.findByIdAndDelete(id,req.body);
        res.status(200).json({
            status:"data delete",
        })
    }else{
        res.status(200).json({
            status:"Only admin can delete staff "
        })
    }
}

exports.update_staff = async (req,res) =>{
    var admin_id = await storage.getItem('login_admin');
    if(admin_id){
        var id = req.params.id;
        var b_pass = await bcrypt.hash(req.body.staff_pass,10);
         req.body.staff_pass=b_pass;
        var data = await staff.findByIdAndUpdate(id,req.body);
        res.status(200).json({
            data
        })
    }else{
        res.status(200).json({
            status:"Only admin can update staff "
        })
    }
}
// ===================================staff login ==========================================
exports.staff_login = async (req,res) =>{
    var  staff_status = await storage.getItem('login_staff');
    if(staff_status == undefined){
        var data = await staff.find({"staff_username":req.body.staff_username});
        console.log(data.length);
        if(data.length === 1){
            bcrypt.compare(req.body.staff_pass,data[0].staff_pass,async function(err,result){
             console.log(result);
                if(result == true){
                    await storage.setItem('login_staff',data[0].id);
                    res.status(200).json({
                        status:"Login Success"
                    })
                }else{
                    res.status(200).json({
                        status:"Check Your staff name and password"
                    })
                }
            })  
        }else{
            res.status(200).json({
                status:"Check Your staff name and password"
            })
        }
    }else {
        res.status(200).json({
            status:"staff is  already login"
        })
    }
}

// ========================================= student =================================================

exports.student= async(req,res) =>{
    var staff_id = await storage.getItem('login_staff');
    if(staff_id){   
    var data = await student.create(req.body);
    res.status(200).json({
        status:"student Insert",
        data
    })
    }else{
        res.status(200).json({
            status:"Only staff can add student "
        })
    }
}
exports.delete_student = async (req,res)=>{
    var staff_id = await storage.getItem('login_staff');
    if(staff_id){
       var id =req.params.id;
       var data = await student.findByIdAndDelete(id,req.body);
       res.status(200).json({
        status:'delete student',
       }) 
    }else{
        res.status(200).json({
            status:"Only staff can delete student "
        })
    }
}
exports.update_student = async (req,res) =>{
    var staff_id = await storage.getItem('login_admin');
    if(staff_id){
        var id = req.params.id;
        var data = await student.findByIdAndUpdate(id,req.body);
        res.status(200).json({
            data
        })
    }else{
        res.status(200).json({
            status:"Only staff can update student "
        })
    }
}
exports.viewstudent= async(req,res) =>{
    var staff_id = await storage.getItem('login_admin');
    if(staff_id){
        var total_recode = await task.find().count();
        var page_no =req.query.page_no;
        if(page_no == undefined){
            page_no = 1
        }
        var limit = 2;
        var total_page=Math.ceil(total_recode/limit);
        var start =(page_no-1)*limit;
        var data = await student.find().populate({path:'div',populate:[{path:'std'},{path:'staff_id'}]}).skip(start).limit(limit);
        res.status(200).json({
            status:"view student",
            data,
            page_no,
            total_page
        })  
    }else{
        res.status(200).json({
            status:"Only staff can update student "
        })
    }
}

exports.div_student = async(req,res) =>{
    var id=req.params.id;
    var data = await student.find(division.populate(id));
    res.status(200).json({
        data
    })
}


exports.insertresult = async (req, res) => {
    const sub1 = parseInt(req.body.sub1);
    const sub2 = parseInt(req.body.sub2);
    const sub3 = parseInt(req.body.sub3);
    const sub4 = parseInt(req.body.sub4);
    const sub5 = parseInt(req.body.sub5);

    const totalMarks = sub1 + sub2 + sub3 + sub4 + sub5;
    const percentage = (totalMarks / 500) * 100;

    var max=0;
    var min=0;
    if(sub1> sub2 && sub1>sub3 && sub1>sub4 && sub1>sub5){
        max=sub1;
    }else if(sub2>sub3 && sub2>sub4 && sub2>sub5){
        max=sub2;
    }else if(sub3>sub4 && sub4>sub5){
        max=sub3;
    }else if(sub4>sub5){
        max=sub4;
    }else{
        max=sub5;
    }
    if(sub1< sub2 && sub1<sub3 && sub1<sub4 && sub1<sub5){
        min=sub1;
    }else if(sub2<sub3 && sub2<sub4 && sub2<sub5){
        min=sub2;
    }else if(sub3>sub4 && sub4>sub5){
        min=sub3;
    }else if(sub4>sub5){
        min=sub4;
    }else{
        min=sub5;
    }
    
    var data = await result.create({
        student_id: req.body.student_id,
        sub1: req.body.sub1,
        sub2: req.body.sub2,
        sub3: req.body.sub3,
        sub4: req.body.sub4,
        sub5: req.body.sub5,
        total: totalMarks,
        percentage: percentage,
        max:max,
        min:min

    });
  
  res.status(200).json({
    status: "std insert....",
    data,
});
};

exports.top5 = async (req, res) => {
  
    const top = await result.find().sort({ percentage: -1 }).limit(5);
    res.status(200).json({
      data: top,
      status: "Top 5 results retrieved successfully",
    });
  
};

exports.deleteresult = async (req,res) => {
    var staff_id = await storage.getItem('login_staff');
    if(staff_id) {
      var id = req.params.id;
    var data = await result.findByIdAndDelete(id, req.body);
    res.status(200).json({
      data,
      status: "data-deleted....",
    });
    }else{
      res.status(200).json({
      
        status: "data error....",
      });
    }
  };


  exports.studentlogin = async (req,res) => {
    var user_status = await storage.getItem('login_student');
    if (user_status == undefined) {
      var data = await student.find({"name": req.body.name});
      if (data.length == 1) {
        bcrypt.compare(req.body.password, data[0].password, async function (err, result) {
          if (result == true) {
            await storage.setItem('login_student', data[0].id);
            res.status(200).json({
              status: "login success"
            });
          } else {
            res.status(200).json({
              status: "Check Your Password"
            });
          }
        });
      } else {
        res.status(200).json({
          status: "Check Your name "
        });
      }
    } else {
      res.status(200).json({
        status: "student is already login"
      });
    }
  }