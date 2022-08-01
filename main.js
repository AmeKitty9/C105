// Webcam.set - is a function of webcam.js to see the properties for the live view of the webcam.
//  ○ width - set the width you want for the webcam view, you can give any value as per your choice.
//  Here we have given 350 (means 350px).
//  ○ height - set the height you want for the webcam view, you can give any value as per your choice.
//  Here we have given 300 (means 300px). ○ image_format - We have given png.
//  ○ png_quality - means the quality of the live view of a webcam.
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

// Webcam.snap() is a predefined function of webcam.js used to take images from a webcam, this function contains data_uri that can be used to show preview of the image which generates after taking a snapshot.

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/7XZs2224i/model.json',modelLoaded);
// imageClassifier is a predefined function of ml5.js that is used to trigger the ml5.js image classification function.

//  ■ model is the model which we created in the teachable machine.
//  ■ json - JavaScript Object Notation is an open standard file format that is used to hold data in an object format.
//  Do you remember while doing API classes like the weather app we had viewed the JSON file in Json Viewer.
//  ■ So we are adding this at the end of the link because we just want to access the model created in a teachable machine and nothing else from the model which has been created.

function modelLoaded() {
    console.log('Model Loaded!');
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

// classify is a predefined function of ml5.js that is used to compare the captured image with the model, and get the results.

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById('result_object_name').innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3)*100;
    }
}