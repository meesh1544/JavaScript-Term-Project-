//Declare Variables
var content = document.getElementsByClassName("game");
var box = document.getElementById("tableInfo");
var p = document.getElementById("info");
var windowWidth;
var windowHeight;
var boxWidth = 600;
var boxHeight = 200;
var XPos;
var YPos;

//Foreach hoverable element that displays Game Info
Array.prototype.forEach.call(content, function(el) {

//Add an event listener to each element
el.addEventListener("click", function(){

    //Calculate where to position box
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    YPos = (windowHeight/2) - (boxHeight);
    XPos = (windowWidth/2) - (boxWidth/2);

    //Display the Box and position it
    box.style.display = "inline-block";
    box.style.width = boxWidth;
    box.style.height = boxHeight;
    box.style.left = XPos;
    box.style.top = YPos;
});
});
window.onclick = function(event) {
    if (event.target == p) {
        box.style.display = "none";
    }
    }
    
    window.onresize = function(event){
    if((windowWidth != window.innerWidth || windowHeight != window.innerHeight) && box.style.display == "inline-block"){
        
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    
        console.log("box: " + boxWidth);
        console.log("window: " + windowWidth);
    
        //Check if the modal is wider than the window
        if(boxWidth >= windowWidth - 50){
            boxWidth -= 100;
        }
        else if(boxWidth + 100 <= windowWidth - 50 && !(boxWidth >= 800)){
            boxWidth += 100;
        }
    
        YPos = (windowHeight/2) - (boxHeight);
        XPos = (windowWidth/2) - (boxWidth/2);
    
        //Position the box
        box.style.width = boxWidth;
        box.style.height = boxHeight;
        box.style.left = XPos;
        box.style.top = YPos;
    }
    }
