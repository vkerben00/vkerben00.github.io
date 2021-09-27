function check(){

	var question1 = document.quiz.question1.value;
	var question2 = document.quiz.question2.value;
	var question3 = document.quiz.question3.value;
	var question4 = document.quiz.question4.value;
	var question5 = document.quiz.question5.value;
	var question6 = document.quiz.question6.value;
	var question7 = document.quiz.question7.value;
	var question8 = document.quiz.question8.value;
	var question9 = document.quiz.question9.value;
	var question10 = document.quiz.question10.value;
	var correct = 0;


	if (question1 == "Infant") {
		correct++;
   }
	if (question2 == "Spiderling") {
		correct++;
   }	
	if (question3 == "Hatchling") {
		correct++;
	}
	if (question4 == "Pup") {
		correct++;
	}
	if (question5 == "Fawn") {
		correct++;
	}
	if (question6 == "Calf") {
		correct++;
	}
	if (question7 == "Joey") {
		correct++;
	}
	if (question8 == "Owlet") {
		correct++;
	}
	if (question9 == "Kid") {
		correct++;
	}
	if (question10 == "Foal") {
		correct++;
	}
	var pictures = ["penguin.gif", "husky.gif", "corgy.gif","otter.gif" ];
	var messages = ["You know your Baby Names!", "Pretty good!", "Maybe better next time!"];
	var score;

	if (correct == 0 && correct <5) {
		score = 2;
	}

	if (correct > 0 && correct < 9) {
		score = 1;
	}

	if (correct == 10) {
		score = 0;
	}

	document.getElementById("after_submit").style.visibility = "visible";

	document.getElementById("message").innerHTML = messages[score];
	document.getElementById("number_correct").innerHTML = "You got " + correct + " correct.";
	document.getElementById("picture").src = pictures[score];