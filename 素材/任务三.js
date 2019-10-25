#!usr/bin/node
const {userList,chapterList}=require('./data'),
      http=require('http'),
      fs=require('fs'),
      url=require('url'),
      qs=require('querystring');
var items={};
var id;
http.createServer(function(req,res){
  let path=url.parse(req.url).pathname;
  // console.log(path);
  if(path=="/login"){
    fs.readFile("login.html",function(error,data){
      if(error){
        console.log(error.message);
      }
      res.writeHead(200,{"Content-Type":"text/html"});
      res.end(data);
    });
  }else if(path=="/addChapter"){
    fs.readFile("addChapter.html",function(error,data){
      if(error){
        console.log(error.message);
      }
      res.writeHead(200,{"Content-Type":"text/html"});
      res.end(data);
    });
  }else if(path=="/list"){
    fs.readFile("chapterList.html",function(error,data){
      if(error){
        console.log(error.message);
      }
      res.writeHead(200,{"Content-Type":"text/html"});
      res.end(data);
    });
  }else if(path=="/a"){
    var ch=JSON.stringify(chapterList);
    res.write(ch);
    res.end();
  }else if(path=="/b"){
    var ch=JSON.stringify(chapterList);
    res.write(ch);
    res.end();
  }else if(path=="/detail"){
    let urlobj=url.parse(req.url);
    let queryobj=qs.parse(urlobj.query);
    // console.log('urlqc',urlobj);
    // console.log('urlq',urlobj.query);
    // console.log('q',queryobj.c);
    // console.log('qu',queryobj.chapterId);
    id=queryobj.chapterId-1;
    // var tt=JSON.stringify(items1);
    // req.setEncoding('utf-8');
    fs.readFile("chapter.html",function(error,data){
      if(error){
        console.log(error.message);
      }
      res.writeHead(200,{"Content-Type":"text/html"});
      res.end(data);
    });
  }else if(path=="/c"){
    // let urlobj=url.parse(req.url);
    // console.log(req.url);
    // console.log(urlobj);
    // let queryobj=qs.parse(urlobj.query);
    // console.log(queryobj)
    res.writeHead(200,{'Content-Type':'text/json'});
    items=chapterList[id];
    var tt=JSON.stringify(items);
    res.end(tt);
  }else if(path=='/add'){
    var items1={};
    req.setEncoding('utf-8');
    req.on('data',function(pos){
       // console.log(123);
      // console.log(qs.parse(pos));
      // var text=qs.parse(pos).title;
      // console.log(text);
      items1.chapterId=chapterList.length+1;
      items1.chapterName=qs.parse(pos).title;
      // console.log(items1.chapterName);
      items1.chapterDes=qs.parse(pos).content;
      items1.chapterContent=qs.parse(pos).content;
      items1.publishTimer= "2019-08-19";
      items1.author="admin";
      items1.views=1022;
      items1.imgPath='./login_bg.jpg';
      chapterList.push(items1);
      console.log("添加成功！");
    });

  }else if(path=="/listmanager"){
    let urlobj=url.parse(req.url);
    let queryobj=qs.parse(urlobj.query);
    if(queryobj.username==userList[0].username&&queryobj.pwd==userList[0].pwd){
      fs.readFile("list.html",function(error,data){
        if(error){
          console.log(error.message);
        }
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(data);
      });
    }else{
      res.statusCode=404;
      res.end('404 Error,resource not found!');
    }
  }
  else if(path!="/"){
    path='.'+path;
    fs.readFile(path,function(error,data){
      if(error){
        console.log(error.message);
      }
      res.writeHead(200,{"Content-Type":"text/css"});
      res.end(data);
    });
  }
}).listen(8083);



