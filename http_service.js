//function to make promiseajax call
// we need not use async and data parameters here
function makePromiseCall(methodType,url,async=true,data=null)
{
    //creating a promise object which has two parameters resolve and reject
    return new Promise(function(resolve,reject){
    //making object of XMLHttpRequest() which invokes constructor
    let xhr= new XMLHttpRequest();
   //onload function will be used when the connection is set up 
   //when the conn is set up then only it will throw errors
   //but when connection is not set then one error will throw errors
    xhr.onload= function(){
        if(xhr.readyState===4)
        {
            if(xhr.status===200||xhr.status===201)
            {
               resolve(xhr.responseText);
            }
            else if(xhr.status>=400)
            {
                reject({
                    status:xhr.status,
                    statusText:xhr.statusText
                });
                console.log("Xhr failed");
                console.log("Handle 400 client error or 500 server error" )
            }
        }
    }
    //when the connection is not set then it will throw errors
    xhr.onerror= function(){
        reject({
            status:this.status,
            statusText:xhttp.statusText
        });
    }
        xhr.open(methodType,url,async);
        //changes required for inserting data into json file
        if(data)
        {
            //setting header for request
            xhr.setRequestHeader("Content-Type","application/json");
            //sending data
            xhr.send(JSON.stringify(data));
        }
        else
        {
            xhr.send();
        }
    console.log(methodType+" Request sent to the server" );
    });
}