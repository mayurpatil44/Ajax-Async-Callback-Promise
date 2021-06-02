// using promise as in promise we need not mention the httpstatuscode here , reject and resolve will work
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime()
{
    const date= new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}
//in this we wont need to pass the callback function here
function makePromiseCall(methodType,url,async=true,data=null)
{
    // promise object will have two parameters resolve and reject
    //resolve if state is 4 status in 200 series
    //reject for 400 series
    return new Promise(function(resolve,reject){
        //creating instance of XMLHttpRequest() 
        let xhr= new XMLHttpRequest();
        //here we are using the resolve method so the callingback of function is reduces
        xhr.onreadystatechange= function(){
            //checking if readdstate is 4 and httpstatus is 201 or 201 means succesfull
            //for succesful we go to resolve otherwise reject
            if(xhr.readyState===4)
            {
                if(xhr.status===200||xhr.status===201)
                {
                   resolve(xhr.responseText);
                }
                //if status is greater than 400, there is error in calling request
                else if(xhr.status>=400)
                {
                    reject({
                        status:xhr.status,
                        statusText:xhr.statusText
                    });
                    console.log("Xhr failed");
                }
            }
        }
            xhr.open(methodType,url,async);
            //checking if data is present
            //we need to change the file before insering data 
            if(data)
            {
                //setting header for request
                xhr.setRequestHeader("Content-Type","application/json");
                //sending data by converting into json string object
                xhr.send(JSON.stringify(data));
            }
            else
            {
                xhr.send();
            }
            console.log(methodType+" Request sent to the server at: "+showTime());
    });
}
//url for getting employee 3
const getURL="http://localhost:3000/Employees/3";
//making a promise call ,here we did not mention callback function
//then pushes the sucesss handler
//catch pushes the error handler ie. reject
makePromiseCall("GET",getURL,true)
    .then(responseText=>{
        console.log("Get User data: "+responseText);
    })
    .catch(error=>console.log("Get error status: "+JSON.stringify(error)))

//url for deleting
const deleteURL="http://localhost:3000/employees/2";
//making promise call
//here asunc is false
makePromiseCall("DELETE",deleteURL,false)
    .then(responseText=>console.log("User Deleted: "+responseText))
    .catch(error=>console.log("DELETE Error Status: "+JSON.stringify(error)))

//url for posting the same employee
const postURL= "http://localhost:3000/employees/";
const emplData= {"name":"daisy","salary":"50000"};
//making promise call
makePromiseCall("POST",postURL,true,emplData)
    .then(responseText=>console.log("User added: "+responseText))
    .catch(error=>console.log("POST error status: "+error)) 