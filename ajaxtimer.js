//function to display the time
function showTime()
{
    const date= new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}
//Activity B, which prints expired time
//due to async nature, child thread will come here.
function showSessionExpire()
{
    console.log("Activity-B Your session expired at"+showTime());
}
//programs starts from this part 
//this program is the main thread and the functions called inside are child thread
//the main thread will continue its execution even if child thread has not completely executed
//this is called asynchronous way of executing for javascript
console.log("Acitivity A: Triggering Activity B at "+showTime());
//this is function being called after 5 milisec
//program wont wait it will execute the next command
setTimeout(showSessionExpire,5000);
//this will get executed before the showsessionexpire func 
console.log("Activity-A:Triggered Activity-B at "+showTime()+ "will execute after 5 seconds");