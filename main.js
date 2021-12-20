status = "";
var objects = [];
number = "";
det = "";
found = "";
let obj = document.getElementById("name");
var synth = window.speechSynthesis;
var utterThis;

function setup(){
    canvas = createCanvas(380, 295);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 295);
    video.hide();
}

function draw(){
    image(video, 0, 0, 380 , 295);
    if(status != "" && det == true){
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        for(i = 0; i < number; i++){
            if(objects[i].label == obj.value){
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("objectFound").innerHTML = "Specified Object Found";
            found = true;
            utterThis = new SpeechSynthesisUtterance("Specified Object Found");
            synth.speak(utterThis);
            video.stop();
            synth.speak("");
            }
        }
        if(found != true){
            document.getElementById("objectFound").innerHTML = "Specified Object Not Found";
            utterThis = new SpeechSynthesisUtterance("Specified Object Not Found");
            synth.speak(utterThis); 
            synth.speak("");
        }
    }
}

function search(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectDetector.detect(video, gotResult);
}

function reload(){
    window.location = "index.html";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
    number = objects.length;
    det = true;
}