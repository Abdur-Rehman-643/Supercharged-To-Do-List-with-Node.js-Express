const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
app.set('view engine','ejs');

const listitems = [];

function formatDate(date) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const day = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const dateNumber = date.getDate();
  
    const formattedDate = `${day}, ${month} ${dateNumber}`;
    return formattedDate;
}
  
const date = new Date();
const formattedDate = formatDate(date);

app.get("/",function(req,res){
    res.render('main',{todayDate : formattedDate,items : listitems})
})

app.post("/",function(req,res){
    listitems.push(req.body.item);
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})