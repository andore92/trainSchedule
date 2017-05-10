  var config = {
    apiKey: "AIzaSyAObfc9WyHrHS-SS5htVUZ59YotpIhCQtY",
    authDomain: "trainhw-7ada4.firebaseapp.com",
    databaseURL: "https://trainhw-7ada4.firebaseio.com",
    projectId: "trainhw-7ada4",
    storageBucket: "trainhw-7ada4.appspot.com",
    messagingSenderId: "497280788155"
  };
  firebase.initializeApp(config);

 	var database = firebase.database();

	var trainName = ""
	var trainDest = ""
	var trainTime = ""
	var trainFreq = ""

	$("#submitTrain").on("click", function(event){
	event.preventDefault();
	console.log("submit clicked!")

	trainName = $("#trainName").val().trim()
		console.log("Train Name: " + trainName)
	trainDest = $("#trainDest").val().trim()
		console.log("Train Destination :" + trainDest)
	trainTime = $("#trainTime").val().trim()
		console.log("Train Time : " + trainTime)
	trainFreq = $("#trainFreq").val().trim()
		console.log("Train Frequency : " + trainFreq)


	database.ref().set({
		
		trainName: trainName,
		trainDest: trainDest,
		trainTime: trainTime,
		trainFreq: trainFreq

		});
	})