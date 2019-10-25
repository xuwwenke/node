#!usr/bin/node
const http=require('http'),
      fs=require('fs'),
      url=require('url'),
      querystring=require('querystring');
http.createServer(function(req,res){
  let filename="";
  let urlobj=url.parse(require.url);
  let pathname=urlobj.pathname;
  console.log(urlobj);
  if(urlobj.pathname=="/"){
    filename="login.html";
  }else{
    if(urlobj.query){
      let queryobj=querystring.parse(urlobj.query);
      if(queryobj.user=="admin"&&queryobj.password=="admin"){
        filename="list.html";
      }else{
        console.log("Error");
      }
    }
  };
  fs.createReadStream(`${filename}`).pipe(res);
}).listen(8083);
