song1="";
song2="";
song1_status="";
song2_status="";
rightwristx=0;
rightwristy=0;
leftwristy=0;
leftwristx=0;
scorerightwrist=0;
scoreleftwrist=0;
function preload(){
    song1=loadSound("music.mp3")
    song2=loadSound("music1.mp3")
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotposes);
}

function modelloaded(){
    console.log("posenetisintialised")
}

function gotposes(results){
if (results.length>0) {
    scorerightwrist=results[0].pose.keypoints[10].score;
    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("scorerightwrist "+scorerightwrist);
    console.log("scoreleftwrist "+scoreleftwrist);
    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    console.log("rightwristx, "+rightwristx);
    console.log("rightwristy, "+rightwristy);
    console.log("leftwristx, "+leftwristx);
    console.log("leftwristy, "+leftwristy);

}
}

function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("#ff0000");
    stroke("#ff0000");
    if (scorerightwrist>.2) {
        circle(rightwristx,rightwristy,20);
        song2.stop();
        if (song1_status==false) {
           song1.play();
           document.getElementById("songname").innerHTML="playing Harry Potter";
        }
      
    }

    if (scoreleftwrist>.2) {
        circle(leftwristx,leftwristy,20);
        song1.stop();
        if (song2_status==false) {
           song2.play();
           document.getElementById("songname").innerHTML="playing Believer";
        }
      
    }

  
}

