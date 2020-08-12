let i = 22;
let a =1;
let id5 = 10;
let id1 = "0"+10;
let b = '{ "hello":"world"'+'}'
var myobj = JSON.parse(b);
var qstr1 = "{ \"data.XYZ\": {\"$lt\":15} }";
var myobj2 = JSON.parse('{ \"data.XYZ\": {\"$lt\":1} }');
let queryId1 = "admin.news.hoctap." + i + ".id";
var query4 = JSON.parse('{' + '"' + queryId1 + '"' + ':' + '"' + id1+'"' + '}');
let queryId2 = "admin.news.hoctap." + i + ".id";
let id2 = 013;
let id3 = id2.toString();
let password ="123"
let fullname ="123"
let id ="123"
let classs ="123"
//==============
let id4 = "01";
let queryId = "admin.news.hoctap";
///////
let queryPassword = "admin.student." + i + ".password";
let queryFullname = "admin.student." + i + ".fullname";
let queryid = "admin.student." + i + ".id";
let queryclasss = "admin.student." + i + ".classs";

// let query = JSON.parse('{' + '"' + queryId + '"' + ':' + '{' + '"'+'id'+'"' + ':' + '"' + id4 + '"' + '}' + '}');
// let query = JSON.parse('{' + '"' + queryId + '"' + ':' + '{' + + 'id' + ':' + '"' + id4 + '"' + '}' + '}');
let query = JSON.parse('{' + '"' + queryPassword + '"' + ':' + '"' + password + '"' + ',' + '"' + queryFullname + '"' + ':' + '"' + fullname + '"' + ',' +'"' + queryid + '"' + ':' + '"' + id + '"' + ',' + '"' + queryclasss + '"' + ':' + '"' + classs + '"' + '}');
//==============
// console.log(id3); // 
// console.log(myobj2); // 
// console.log(JSON.parse('{"admin.news.hoctap.id":"a"}')); // 
console.log((query)); // 