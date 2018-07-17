'use strict';
const mysql = require('mysql');

// First you need to create a connection to the db
const con = mysql.createConnection({
    host: '103.211.39.64',
    port:'6603',
    user: 'anugya',
    password: 'Anu@#123',
    database:'flights_info'
  });
  
  con.connect((err) => {
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      //console.log('Connection established');
    });
  
exports.processRequest=function(req,res)
{
    switch (req.body.queryResult.intent.displayName)
    {
      case "ColMean":
            getColMean(req,res)
            break;
      case "ColMeanC":
            getColMean(req,res)
            break;
      case "ColSum":
            getColSum(req,res)
            break;
      case "ColSumC":
            getColSum(req,res)
            break;
      case "ColCount":
            getColCount(req,res)
            break;
      case "ColCountC":
            getColCount(req,res)
            break;
      case "ColMode":
            getColMode(req,res)
            break;
      case "ColModeC":
            getColMode(req,res)
            break;
      case "ColMedian":
            getColMedian(req,res)
            break;
      case "ColMedianC":
            getColMedian(req,res)
            break;
      case "ColMax":
            getColMax(req, res)
            break;
      case "ColMaxC":
            getColMax(req,res)
            break;
      case "ColMin":
            getColMin(req,res)
            break;
      case "ColMinC":
            getColMin(req,res)
            break;
      case "ColMaxPercentageContri":
            getColMaxPercentageContri(req,res)
            break;
      case "ColMaxPercentageContriC":
            getColMaxPercentageContri(req,res)
            break;
      case "ShowTables":
            getShowTables(req,res)
            break;
      case "ShowColumns":
            getShowColumns(req,res)
            break;
      case "ShowColumnsC":
            getShowColumns(req,res)
            break;
      case "ColContritoTotal":
            getColContritoTotal(req,res)
            break;
      case "ColContritoTotalC":
            getColContritoTotal(req,res)
            break;
    }
    

};

function getColCount(req,res)
{
    var colname=req.body.queryResult.parameters.colname?req.body.queryResult.parameters.colname:'Unknown';
    var coltosearch=colname.toString();
    var tabname=req.body.queryResult.parameters.tablename?req.body.queryResult.parameters.tablename:'Unknown';
    var tabtosearch=tabname.toString();
    con.query('SELECT count('+coltosearch+') FROM '+tabtosearch, (err,rows) => {
        if(err) throw err;
      
        //console.log('Data received from Db:\n');
        //console.log(rows);

        var strrows=JSON.stringify(rows);
        var bdx=strrows.lastIndexOf(":")+1;
        var edx=strrows.indexOf("}");
        
        return res.json({
            fulfillmentText: "The number of entries for "+coltosearch+" in the table "+tabtosearch+" is "+strrows.substring(bdx,edx)+".\nTo find information about another table, column or attribute,please say Ok.",
    
            source: 'count info'
          });   
      
      });
}

function getColMax(req,res)
{
    var colname=req.body.queryResult.parameters.colname?req.body.queryResult.parameters.colname:'Unknown';
    var coltosearch=colname.toString();
    var tabname=req.body.queryResult.parameters.tablename?req.body.queryResult.parameters.tablename:'Unknown';
    var tabtosearch=tabname.toString();
    con.query('SELECT max('+coltosearch+') FROM '+tabtosearch, (err,rows) => {
        if(err) throw err;
      
        //console.log('Data received from Db:\n');
        //console.log(rows);

        var strrows=JSON.stringify(rows);
        var bdx=strrows.lastIndexOf(":")+1;
        var edx=strrows.indexOf("}");
        
        return res.json({
            fulfillmentText: "The maximum value for "+coltosearch+" in the table "+tabtosearch+" is " + strrows.substring(bdx,edx)+".\nTo find information about another table, column or attribute,please say Ok.",
    
            source: 'max info'
          });   
      
      });
}

function getColMean(req,res)
{
    var colname=req.body.queryResult.parameters.colname?req.body.queryResult.parameters.colname:'Unknown';
    var cols=colname.toString();
    var coltosearch=cols.toLowerCase();
    var fltrname=req.body.queryResult.parameters.fltr?req.body.queryResult.parameters.fltr:'Unknown';
    var fltrs=fltrname.toString();
    var fltrstr=fltrs.toLowerCase();
    var locname=req.body.queryResult.parameters.locn?req.body.queryResult.parameters.locn:'Unknown';
    var locst=locname.toString();
    var locstr=locst.toLowerCase();
    var tabname=req.body.queryResult.parameters.tablename?req.body.queryResult.parameters.tablename:'Unknown';
    var tabtosearch=tabname.toString();
    if(fltrstr!="no")
    {
    

    

       
           con.query('SELECT avg('+coltosearch+') FROM '+tabtosearch+' where '+fltrstr+' = "'+locstr+'"', (err,rows) => {
               if(err) throw err;
             
               //console.log('Data received from Db:\n');
               //console.log(rows);
       
               var strrows=JSON.stringify(rows);
               var bdx=strrows.lastIndexOf(":")+1;
               var edx=strrows.indexOf("}");
               
               return res.json({
                   fulfillmentText:"The mean value for "+coltosearch+",using values that have "+fltrstr+" = "+locstr+",is " + strrows.substring(bdx,edx)+".\nTo find information about another table, column or attribute,please say Ok.",
           
                   source: 'avg info'
                 });   
             
             });
       

    
}

else if (fltrstr=="no")
{
    con.query('SELECT avg('+coltosearch+') FROM '+tabtosearch, (err,rows) => {
        if(err) throw err;
      
        //console.log('Data received from Db:\n');
        //console.log(rows);

        var strrows=JSON.stringify(rows);
        var bdx=strrows.lastIndexOf(":")+1;
        var edx=strrows.indexOf("}");
        
        return res.json({
            fulfillmentText:"The mean value for "+coltosearch+" is " + strrows.substring(bdx,edx)+".\nTo find information about another table, column or attribute,please say Ok",
    
            source: 'avg info'
          });   
      
      });
}
   
}

function getColMin(req,res)
{
    var colname=req.body.queryResult.parameters.colname?req.body.queryResult.parameters.colname:'Unknown';
    var coltosearch=colname.toString();
    var tabname=req.body.queryResult.parameters.tablename?req.body.queryResult.parameters.tablename:'Unknown';
    var tabtosearch=tabname.toString();
    con.query('SELECT min('+coltosearch+') FROM '+tabtosearch, (err,rows) => {
        if(err) throw err;
      
        //console.log('Data received from Db:\n');
        //console.log(rows);

        var strrows=JSON.stringify(rows);
        var bdx=strrows.lastIndexOf(":")+1;
        var edx=strrows.indexOf("}");
        
        return res.json({
            fulfillmentText: "The minimum value for "+coltosearch+" in the table "+tabtosearch+" is " +strrows.substring(bdx,edx)+".\nTo find information about another table, column or attribute,please say Ok.",
    
            source: 'min info'
          });   
      
      });
}

function getColSum(req,res)
{
    var colname=req.body.queryResult.parameters.colname?req.body.queryResult.parameters.colname:'Unknown';
    var coltosearch=colname.toString();
    var tabname=req.body.queryResult.parameters.tablename?req.body.queryResult.parameters.tablename:'Unknown';
    var tabtosearch=tabname.toString();
    con.query('SELECT sum('+coltosearch+') FROM '+tabtosearch, (err,rows) => {
        if(err) throw err;
      
        //console.log('Data received from Db:\n');
        //console.log(rows);

        var strrows=JSON.stringify(rows);
        var bdx=strrows.lastIndexOf(":")+1;
        var edx=strrows.indexOf("}");
        
        return res.json({
            fulfillmentText: "The sum of all the values for "+coltosearch+" in the table "+tabtosearch+" is "+strrows.substring(bdx,edx)+".\nTo find information about another table, column or attribute,please say Ok.",
    
            source: 'sum info'
          });   
      
      });
}

function getColMaxContri(req,res)
{
 
    var colname=req.body.queryResult.parameters.colname?req.body.queryResult.parameters.colname:'Unknown';
    var coltosearch=colname.toString();
    con.query('SELECT id FROM employees having max(salary)<salary', (err,rows) => {
        if(err) throw err;
      
        //console.log('Data received from Db:\n');
        console.log(rows);
        //var strrows=JSON.stringify(rows);
        //var bdx=strrows.lastIndexOf(":")+1;
        //var edx=strrows.indexOf("}");
   
       
       
        
        return res.json({
            fulfillmentText: "The maximum contribution is/are by "+".\nTo find information about another column/attribute,input Ok.",
    
            source: 'maxcontri info'
          });   
      
      });


}

function getColMaxPercentageContri(req,res)
{
 
    var colname=req.body.queryResult.parameters.colname?req.body.queryResult.parameters.colname:'Unknown';
    var coltosearch=colname.toString();
    var tabname=req.body.queryResult.parameters.tablename?req.body.queryResult.parameters.tablename:'Unknown';
    var tabtosearch=tabname.toString();
    
    con.query('SELECT sum('+coltosearch+') FROM '+tabtosearch, (err,rows) => {
        if(err) throw err;
      
        //console.log('Data received from Db:\n');
        //console.log(rows);

        var strrows=JSON.stringify(rows);
        var bdx=strrows.lastIndexOf(":")+1;
        var edx=strrows.indexOf("}");
        var sm=Number(strrows.substring(bdx,edx));
        
       
        con.query('SELECT max('+coltosearch+') FROM '+tabtosearch, (err1,rows1) => {
            if(err1) throw err1;
          
            //console.log('Data received from Db:\n');
            //console.log(rows);
    
            var strrows1=JSON.stringify(rows1);
            var bdx1=strrows1.lastIndexOf(":")+1;
            var edx1=strrows1.indexOf("}");
            var maxstr=strrows1.substring(bdx1,edx1);
            var mx=Number(maxstr);
            //console.log(mx);
            var prcontri=(mx/sm)*100;
            //console.log(prcontri);
            var prst=Math.round(prcontri);
            var prstr=prst.toString();


            return res.json({
                fulfillmentText: "The percentage contribution by the maximum value to the total of the "+coltosearch+" column in the table "+tabtosearch+" is "+prstr+".\nTo find information about another table, column or attribute,please say Ok.",
        
                source: 'mode info'
              });   
          

            
             
          
          });
        
         
      
      });
    
     
      

     




}

function getColMedian(req,res)
{

      var colname=req.body.queryResult.parameters.colname?req.body.queryResult.parameters.colname:'Unknown';
      var coltosearch=colname.toString();
      var tabname=req.body.queryResult.parameters.tablename?req.body.queryResult.parameters.tablename:'Unknown';
      var tabtosearch=tabname.toString();

      con.query('SELECT count('+coltosearch+') FROM '+tabtosearch, (err,rows) => {
        if(err) throw err;
      
        //console.log('Data received from Db:\n');
        //console.log(rows);

        var strrows=JSON.stringify(rows);
        var bdx=strrows.lastIndexOf(":")+1;
        var edx=strrows.indexOf("}");
        var c=Number(strrows.substring(bdx,edx));
        var c1=c/2;
        var ch=Math.floor(c1);
        var chs=ch.toString();
        console.log(chs);
        
        
    

        con.query('SELECT '+coltosearch+' FROM '+tabtosearch+' ORDER BY '+coltosearch+' ASC LIMIT 1 OFFSET '+chs+' ;', (err,rows1) => {
            if(err) throw err;
          
            //console.log('Data received from Db:\n');
            //console.log(rows);
            //console.log(`${rows.salary}`);
            var strrows1=JSON.stringify(rows1);
            var bdx1=strrows1.lastIndexOf(":")+1;
            var edx1=strrows1.indexOf("}");
    
            //console.log(strrows.substring(bdx,edx));
    
       
           
           
            
            return res.json({
                fulfillmentText: "The median entry for the "+coltosearch+" column is "+strrows1.substring(bdx1,edx1)+".\nTo find information about another table, column or attribute,please say Ok.",
        
                source: 'mode info'
              });   
          
          });
});
        
      

       
      
       










}

function getColMode(req,res)
{
    var colname=req.body.queryResult.parameters.colname?req.body.queryResult.parameters.colname:'Unknown';
    var coltosearch=colname.toString();
    var tabname=req.body.queryResult.parameters.tablename?req.body.queryResult.parameters.tablename:'Unknown';
    var tabtosearch=tabname.toString();

    con.query('SELECT '+coltosearch+',COUNT('+coltosearch+') AS val_occurence FROM '+tabtosearch+' GROUP BY '+coltosearch+' ORDER BY val_occurence DESC LIMIT 1;', (err,rows) => {
        if(err) throw err;
      
        //console.log('Data received from Db:\n');
        //console.log(rows);
        //console.log(`${rows.salary}`);
        var strrows=JSON.stringify(rows);
        var bdx=strrows.indexOf(":")+1;
        var edx=strrows.indexOf(",");
        var bdx1=strrows.lastIndexOf(":")+1;
        var edx1=strrows.indexOf("}");

        //console.log(strrows.substring(bdx,edx));

   
       
       
        
        return res.json({
            fulfillmentText: "The most frequent entry (i.e.mode) for the "+coltosearch+" column is "+strrows.substring(bdx,edx)+".It occurs "+strrows.substring(bdx1,edx1)+" times."+"\nTo find information about another table, column or attribute,please say Ok.",
    
            source: 'mode info'
          });   
      
      });




}

function getShowTables(req,res)
{
    con.query('SHOW TABLES', (err,rows) => 
{

    if(err) throw err;
    var i=1;
    var txtt=""
        rows.forEach( (row) => {
             
             txtt=txtt+i.toString()+")"+row.Tables_in_anugya+" ";
             i=i+1;
          });
        
    //console.log(rows);

    return res.json({
        fulfillmentText:"The tables in this database are: "+txtt,

        source: 'tab info'
      });   


});
}

function getShowColumns(req,res)
{
    var tabname=req.body.queryResult.parameters.tablename?req.body.queryResult.parameters.tablename:'Unknown';
    var tabtosearch=tabname.toString();
    con.query('DESCRIBE '+tabtosearch, (err,rows) => {
        if(err) throw err;
      
        //console.log('Data received from Db:\n');
        //console.log(rows);
        var i=1;
        var txtt=""
        rows.forEach( (row) => {

             txtt=txtt+i.toString()+")"+row.Field+" ";
             i=i+1;
          });
        
        var strrows=JSON.stringify(rows);
        var bdx=strrows.lastIndexOf(":")+1;
        var edx=strrows.indexOf("}");
        
        return res.json({
            fulfillmentText:"The columns in the table are "+txtt+".Please say Ok now.",
    
            source: 'col info'
          });   
      
      });
}


function getColContritoTotal(req,res)
{
    var colname=req.body.queryResult.parameters.colname?req.body.queryResult.parameters.colname:'Unknown';
    var cols=colname.toString();
    var coltosearch=cols.toLowerCase();
    var fltrname=req.body.queryResult.parameters.fltr?req.body.queryResult.parameters.fltr:'Unknown';
    var fltrs=fltrname.toString();
    var fltrstr=fltrs.toLowerCase();
    var locname=req.body.queryResult.parameters.locn?req.body.queryResult.parameters.locn:'Unknown';
    var locst=locname.toString();
    var locstr=locst.toLowerCase();
    var tabname=req.body.queryResult.parameters.tablename?req.body.queryResult.parameters.tablename:'Unknown';
    var tabtosearch=tabname.toString();
    if(fltrstr!="no")
    {
    

    

     
    con.query('SELECT sum('+coltosearch+') FROM '+tabtosearch, (err,rows) => {
        if(err) throw err;
      
        //console.log('Data received from Db:\n');
        //console.log(rows);

        var strrows=JSON.stringify(rows);
        var bdx=strrows.lastIndexOf(":")+1;
        var edx=strrows.indexOf("}");
        var sm=Number(strrows.substring(bdx,edx));
        
       
        con.query('SELECT sum('+coltosearch+') FROM '+tabtosearch+' where '+fltrstr+' = "'+locstr+'"', (err1,rows1) => {
            if(err1) throw err1;
          
            //console.log('Data received from Db:\n');
            //console.log(rows);
    
            var strrows1=JSON.stringify(rows1);
            var bdx1=strrows1.lastIndexOf(":")+1;
            var edx1=strrows1.indexOf("}");
            var maxstr=strrows1.substring(bdx1,edx1);
            var mx=Number(maxstr);
            //console.log(mx);
            var prcontri=(mx/sm)*100;
            //console.log(prcontri);
            var prst=Math.round(prcontri);
            var prstr=prst.toString();


            return res.json({
                fulfillmentText: "The percentage contribution by those values which have "+fltrstr+" = "+locstr+",to the total of the "+coltosearch+" column in the table "+tabtosearch+" is "+prstr+".\nTo find information about another table, column or attribute,please say Ok.",
        
                source: 'contri info'
              });   
          

            
             
          
          });
        
         
      
      });
       

    
}

else if (fltrstr=="no")
{
   return res.json({
       
    fulfillmentText:"A filter has to be used here!",

    source:'contri info'

   });
}
   
}









