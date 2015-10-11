var express = require('express');
var app = express();
var mongoose = require('mongoose');
PDFDocument = require ('pdfkit');


mongoose.connect('mongodb://prakhar:prakhar@ds035664.mongolab.com:35664/backend' , { server: { auto_reconnect: true } }, function (err, db) {
console.log("DASDS" + err  + " ");

    /* adventure! */
});
var db = mongoose.connection;
db.on("open" , function(a){console.log(" opened " );

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

});
db.on("error" ,  console.error.bind(console, 'connection error:'));








 
var customerSchema = mongoose.Schema({
    pnum: Number,
    dob: Date,
    caption: String,
    ethnicity: String,
    weight: Number,
    height: Number,
    os_veg: Number,
    drink: Number






});

customerSchema.index({ ethnicity: 1 });
customerSchema.set('collection', 'coll_two');

var Customer = mongoose.model( 'coll_two' , customerSchema);








app.get('/count', function (req, res) {





Customer.count({  }, function (err, count) {

console.log("counter " + count);

if(err)
 res.send(JSON.stringify("0") + " :" + err);

 res.send(JSON.stringify(count));
});



});



app.get('/download', function (req, res) 
{

 res.statusCode = 200;
    res.setHeader('Content-type', 'application/pdf');
    res.setHeader('Access-Control-Allow-Origin', '*');



doc = new PDFDocument();

doc.pipe(res);

doc.text("DSADSAA");
doc.end();


});

app.get('/ethnicity/:group/averages2', function (req, res) {
var group   =  req.params.group;



var stream = Customer.find( {ethnicity: ""+group+""} ).stream();
   stream.on('data', function (doc) {

console.log(JSON.stringify(doc) );
console.log(JSON.stringify(doc) );

        res.write(JSON.stringify(doc));
    });
    stream.on('end', function() {
        res.end();
    });


});






app.get('/search_caption', function (req, res) {

var query = req.query.query;
var page = req.query.page;
if(page)
{
var stream = Customer.find({caption: new RegExp('\.*' + query +'\.*','i')}   ).skip( (page-1) *10 ).limit(10).stream();
   stream.on('data', function (doc) {
        res.write(JSON.stringify(doc));
    });
    stream.on('end', function() {
        res.end();
    });

}
else
{
var stream = Customer.find({caption: new RegExp('\.*' + query +'\.*','i')}   ).stream();
   stream.on('data', function (doc) {
        res.write(JSON.stringify(doc));
    });
    stream.on('end', function() {
        res.end();
    });

}













});



app.get('/ethnicity/:group/averages', function (req, res) {
var group   =  req.params.group;
console.log(group);

      Customer.aggregate(
                [
                    {'$group':{
                     '_id': '1',
                        'average_Height': {'$avg': '$height'},
                        'average_Weight': {'$avg': '$weight'}
                    }}
                ],
                function(err,bourbons){
         if(err)
         {
         	res.send()
         }
res.send(JSON.stringify(bourbons[0]))
                   
                }
            );




});


app.get('/social_habits', function (req, res) {

var vegetarian = req.query.vegetarian;
var drink = req.query.drink;
var page = req.query.page;
if(vegetarian!=null)
{
	if(vegetarian=="yes")
		vegetarian=1;
	else if(vegetarian=="no")
		vegetarian=0;
	else
		res.end("[]");


}
else
{
	vegetarian = 0;
}
if(drink!=null)
{
	if(drink=="yes")
		drink=1;
	else if(drink=="no")
		drink=0;
	else
		res.end("[]");


}
else
{
	drink = 0;
}







if(page)
{
var stream = Customer.find({ is_veg : vegetarian,drink:drink }  ).skip( (page-1) *10 ).limit(10).stream();
   stream.on('data', function (doc) {
        res.write(JSON.stringify(doc));
    });
    stream.on('end', function() {
        res.end();
    });

}
else
{
var stream = Customer.find({ is_veg : vegetarian,drink:drink }  ).stream();
   stream.on('data', function (doc) {
        res.write(JSON.stringify(doc));
    });
    stream.on('end', function() {
        res.end();
    });

}







// APP GET PDF FILES









});





