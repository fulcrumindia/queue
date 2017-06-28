const express = require('express');
const router = express();

const Queue = require('../model/Queue');

//get
router.get('/queue',(req,res)=>{
    Queue.getQueue((err, queues) =>{
        if(err){
            res.json({success:false, message:"Error while getting queue "+err});
        } else {
            res.json({success:true, data: queues});   
        }
    });
});

//get by id
router.get('/queue/:_id',(req,res)=>{
    var id = req.params._id;
    Queue.getQueueById(id, (err, queue) =>{
        if(err){
            res.json({success:false, message:"Error while getting queue "+err});
        } else {
            res.json({success:true, data: queue});   
        }
    });
});

//add
router.post('/queue',(req,res)=>{
    var newQueue = req.body;
    Queue.addQueue(newQueue, (err, queues) =>{
        if(err){
            res.json({success:false, message:"Error while adding queue "+err});
        } else {
            res.json({success:true, data: queues});   
        }
    });
});

//update
router.post('/queue/:_id',(req,res)=>{
    var _id = req.params._id;
    var newQueue = req.body;
    Queue.updateQueue(_id, newQueue, {}, (err, queues) =>{
        if(err){
            res.json({success:false, message:"Error while updating queue "+err});
        } else {
            res.json({success:true, data: queues});   
        }
    });
});

//delete
router.delete('/queue/:_id',(req,res)=>{
    var _id = req.params._id;
    Queue.deleteQueue(_id, (err, queues) =>{
        if(err){
            res.json({success:false, message:"Error while deleting queue "+err});
        } else {
            res.json({success:true, data: queues});   
        }
    });
});

module.exports = router;