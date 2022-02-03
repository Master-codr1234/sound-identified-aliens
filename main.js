var classifier;
var stop = false;

function start_classification() {
    navigator.mediaDevices.getUserMedia({ audio: true });
    stop = false;
    classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/q25nbjajO/model.json", model_ready)
}

function stop_classification() {
    stop = true;
}

function model_ready() {
    classifier.classify(got_reasult);
}

function got_reasult(error, result) {
    if (error) {
        console.error(error);
        alert("An error occured");
    } else {
        var img_1 = document.getElementById("alien_1");
        var img_2 = document.getElementById("alien_2");
        var img_3 = document.getElementById("alien_3");
        var img_4 = document.getElementById("alien_4");
        if (stop == false) {
            console.log(result);
            var random_number_r = Math.floor(Math.random() * 255) + 1;
            var random_number_g = Math.floor(Math.random() * 255) + 1;
            var random_number_b = Math.floor(Math.random() * 255) + 1;

            document.getElementById("result_lbl").innerHTML = "I can hear: " + result[0].label;
            document.getElementById("reasult_accuracy").innerHTML = "Accuracy: " + (result[0].confidence * 100).toFixed(2) + "%";

            document.getElementById("result_lbl").style.color = "rgb(" + random_number_r + ", " + random_number_g + ", " + random_number_b + ")";
            document.getElementById("reasult_accuracy").style.color = "rgb(" + random_number_r + ", " + random_number_g + ", " + random_number_b + ")";

            if (result[0].label == "Bell") {
                img_1.src = "aliens-01.gif";
                img_2.src = "aliens-02.png";
                img_3.src = "aliens-03.png";
                img_4.src = "aliens-04.png";
            }
            else if (result[0].label == "Piano") {
                img_1.src = "aliens-01.png";
                img_2.src = "aliens-02.gif";
                img_3.src = "aliens-03.png";
                img_4.src = "aliens-04.png";
            }
            else if (result[0].label == "Clap") {
                img_1.src = "aliens-01.png";
                img_2.src = "aliens-02.png";
                img_3.src = "aliens-03.gif";
                img_4.src = "aliens-04.png";
            }
            else {
                img_1.src = "aliens-01.png";
                img_2.src = "aliens-02.png";
                img_3.src = "aliens-03.png";
                img_4.src = "aliens-04.gif";
            }
        }
        else {
            img_1.src = "aliens-01.png";
            img_2.src = "aliens-02.png";
            img_3.src = "aliens-03.png";
            img_4.src = "aliens-04.png";

            document.getElementById("result_lbl").innerHTML = "I can hear: ";
            document.getElementById("reasult_accuracy").innerHTML = "Accuracy: ";
            document.getElementById("result_lbl").style.color = "black";
            document.getElementById("reasult_accuracy").style.color = "black";
        }
    }
}