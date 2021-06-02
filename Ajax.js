//npm package that requires to be installed
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//function that shows timer
function showTime()
{
    const date= new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}
//we will call this Ajax function
//we are defining async as true and data as null
//these async and data parameters can also be chanegd acc to requirement
function MakeAJAXCall(methodType,url,callback,async=true,data=null)
{
    //creating instance for XMLhttpRequest
    let xhr= new XMLHttpRequest();
    //onreadystatecahnge function is the event listener 
    //this function will keeps being called as soon as the state changes
    //readystate 1 defines connection is not established
    //readystate 2 connection open
    //readystate 3 data tranfer has started 
    //readystate 4 conn closed and completed
    xhr.onreadystatechange= function()
    {
        //checking if readdstate is 4 and httpstatus is 201 or 201 means succesfull
        //then the callback function is called
        //otherwise error is printed for printed for status greater than 400
        if(xhr.readyState===4)
        {
            if(xhr.status===200||xhr.status===201)
            {
                //callback function being called
                callback(xhr.responseText);
            }
            else if(xhr.status>=400)
            {
                console.log("Handle 400 client error or 500 server error at: "+showTime())
            }
        }
    }
    xhr.open(methodType,url,async);
        //checking if data is present
        //we need to change the file before insering data 
        if(data)
        {
            //setting header for request
            //the type of content required is json file
            xhr.setRequestHeader("Content-Type","application/json");
            //sending data by converting into javastring object string
            xhr.send(JSON.stringify(data));
        }
        else
        {
            xhr.send();
        }
    console.log(methodType+" Request sent to the server at: "+showTime());
}

//callback func for get
function getUserDetails(data)
{
    console.log("Get User Data at"+showTime()+" Values "+data);
}
//url in makeajaxcall func for getting employees
const getURL=   "http://localhost:3000/Employees/";
//calling ajax func with methodtype-get,url,func for callback,async=true, no data is there
MakeAJAXCall("GET",getURL,getUserDetails,true);
console.log("Made GET AJAX call to server at: "+showTime());

//deleting element 4 
const deleteURL="http://localhost:3000/Employees/4";
//callback function
function userDeleted(data)
{
    console.log("User Deleted: "+data);
}
//calling ajax func for delete
//we are declaring async as false so that first user is deleted then only added
MakeAJAXCall("DELETE",deleteURL,userDeleted,false);
console.log("Made DELETE AJAX call to server at: "+showTime());

//adding data using post
const postURL= "http://localhost:3000/Employees";
//id is directly added by the server, id always increases, if element is delete and then added, then also id will be forward incremented
//deleted id will not be added
const emplData= {"name":"Denny","salary":"9874566"};
function userAdded(data)
{
    console.log("User Added: "+data);
}
MakeAJAXCall("POST",postURL,userAdded,true,emplData);
console.log("Made Post Ajax call to server at: "+showTime());