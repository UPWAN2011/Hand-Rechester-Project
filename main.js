Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>'; 
});    
}

console.log('ml5 version',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oxdj0Psnp/model.json',modelLoaded);
function modelLoaded(){
    console.log('Model Loaded !');
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data_1 = Prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        Prediction_1 = "";
        if(results[0].label == 'Beautiful'){
            Prediction_1="This Is Beautiful";
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
         else if(results[0].label == 'Cheese'){
            Prediction_1="Cheese";
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }else if(results[0].label == 'Best'){
            Prediction_1="Best";
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        speak();
    }  
}
