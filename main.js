objects=[];
status="";

function preload() {
    
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    canvas.position(300,300)
    video = createCapture(VIDEO);
	video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";

}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
   
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length; i++){
            document.getElementById('status').innerHTML = "Status: Objects Detected";
            document.getElementById('item').innerHTML = "Number of Objects are " + objects.length;
            fill('#FF0000')
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent + "%",objects[i].x + 15,objects[i].y +15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
        
    }
}
