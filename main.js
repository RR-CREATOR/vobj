status = "";

function setup(){
    canvas = createCanvas(380, 295);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 295);
    video.hide();
}

function draw(){
    image(video, 0, 0, 380 , 295);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}