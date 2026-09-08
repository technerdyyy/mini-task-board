const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mynewpassword',
    database: 'sys'
})

db.connect((err)=>{
    if(err){
        console.log("connection to database failed");
    } else {
        console.log("connected to database successfully");
    }
})

//for saving tasks to database
app.post('/new-task', (req, res) => {
    console.log(req.body);
    const q = "insert into tasks (title, created_at, status) values (?,?,?)";
    db.query(q, [req.body.task, new Date(), 'Active'], (err, result) => {
        if(err){
            console.log("error inserting task: ", err);
          
        } else {
            console.log("task inserted successfully");
          
            db.query("select * from tasks", (err, result) => {
                if(err){
                    console.log("error reading tasks: ", err);
                    
                } else {
                    console.log("tasks read successfully");
             
                    res.send(result);
                }
            })
 
        }
    })

})

//for rendering tasks on ui
app.get('/read-tasks', (req, res) => {
    const query = "select * from tasks";
    db.query(query, (err, result) => {
        if(err){
            console.log("error reading tasks: ", err);
            
        } else {
            console.log("tasks read successfully");
     
            res.send(result);
        }
    })
})

app.post('/update-task', (req, res) => {
    console.log(req.body);
    const q = "update tasks set title = ? where id = ?"; 
    db.query(q,  [req.body.updatedTask, req.body.updateId], (err, result)=> {
        if(err){
            console.log("error updating task: ", err);
          
        } else {
            console.log("task updated successfully");
           
            db.query("select * from tasks", (err, result) => {
                if(err){
                    console.log("error reading tasks: ", err);
                    
                } else {
                    console.log("tasks read successfully");
             
                    res.send(result);
                }
            })
 
        }
    })
}
)
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});