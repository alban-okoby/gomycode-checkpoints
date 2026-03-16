const catchAsync = require("../middleware/catchAsync");

exports.createTask = catchAsync(async(req,res,next)=>{

  const task = await Task.create({
    title:req.body.title,
    owner:req.user.id
  });

  res.status(201).json({
    status:"success",
    task
  });

});

// Get user tasks
exports.getTasks = catchAsync(async(req,res,next)=>{

  const tasks = await Task.find({ owner:req.user.id });

  res.json({
    status:"success",
    results:tasks.length,
    tasks
  });

});

// Delete user task 
exports.deleteTask = catchAsync(async(req,res,next)=>{

  const task = await Task.findOneAndDelete({
    _id:req.params.id,
    owner:req.user.id
  });

  if(!task){
    return next(new AppError("Task not found",404));
  }

  res.status(204).json({
    status:"success"
  });

});