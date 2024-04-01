// 1. Detecting button press via mouse
var numberOfDrumButtons=document.querySelectorAll(".drum").length; //selecting the buttons with class "drum" and finding number of such buttons

for(var i=0;i<numberOfDrumButtons;i++){

document.querySelectorAll(".drum")[i].addEventListener("click",function(){
  
    var buttonInnerHTML=this.innerHTML; // In an event, this refers to the element that received the event***. This line stores the button(w,a,s etc.) the button on which event takes place.
   
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
});

}
// 2. Detecting keyboard press
document.addEventListener("keypress",function(event){ // adding the eventListener to the entire document and passing a parameter to the function named "event" or 'e'that tells us which event triggered eventListener.
    makeSound(event.key); // Here "event" gives us information about the event that triggered this function/eventListener and it has a property called key that tells us which keyboard key was pressed.
    buttonAnimation(event.key);
});

function makeSound(key){

    switch(key){
        case "f":
            var tom1 = new Audio("sounds/tom-1.mp3"); // "tom1" is an object created using "Audio" which is a constructor function
            tom1.play(); // "play" is an inbuilt method in "Audio" constructor function.
            break;

        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
        
        case "s":
            var tom3= new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
    
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
        
        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
            
        case "k":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;
        
        case "l":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;
        
        default:
            console.log(buttonInnerHTML);
    }

}

function buttonAnimation(currentKey) // currentKey==event.key
{

    var activeButton=document.querySelector("."+currentKey); // to select a particular key i.e. the key that got pressed.
    activeButton.classList.add("pressed"); // applying exisiting CSS style using JS

    setTimeout(function(){
        activeButton.classList.remove("pressed");
    },100);


}

