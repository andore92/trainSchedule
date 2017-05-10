  
// firebase authentication stored in variable "config"
  var config = {
    apiKey: "AIzaSyAObfc9WyHrHS-SS5htVUZ59YotpIhCQtY",
    authDomain: "trainhw-7ada4.firebaseapp.com",
    databaseURL: "https://trainhw-7ada4.firebaseio.com",
    projectId: "trainhw-7ada4",
    storageBucket: "trainhw-7ada4.appspot.com",
    messagingSenderId: "497280788155"
  };
  // initialize firebase 
  firebase.initializeApp(config);

  //set up global variables
 	var database = firebase.database();

	var trainName = ""
	var trainDest = ""
	var trainTime = ""
	var trainFreq = ""

	// submit button function or grabbing values of input fields
	$("#submitTrain").on("click", function(event){
	// prevent page from refreshing 
	event.preventDefault();
	
	// storing values from input fields as variables
	trainName = $("#trainName").val().trim()
		
	trainDest = $("#trainDest").val().trim()
		
	trainTime = $("#trainTime").val().trim()
		
	trainFreq = $("#trainFreq").val().trim()
		

	// push values and store them in firebase
	database.ref().push({
		
		trainName: trainName,
		trainDest: trainDest,
		trainTime: trainTime,
		trainFreq: trainFreq
		// timeAdded: firebase.database.ServerValue.TIMESTAMP
		});
		// clear all fields with class of "input" at end of function
		$(".input").val("")
		return false
	});

	// function that runs when child is added to firebase database
	database.ref().on("child_added", function(childSnapshot){

		// stores the snapshot of trainName from the database
		// and stores it in a variable
		var trainName = childSnapshot.val().trainName
			
		// stores the snapshot of trainDest from the database
		// and stores it in a variable
		var trainDest = childSnapshot.val().trainDest
			
		// stores the snapshot of trainTime from the database
		// and stores it in a variable
		var trainTime = childSnapshot.val().trainTime
			
		// stores the snapshot of trainFreq from the database
		// and stores it in a variable
		var trainFreq = childSnapshot.val().trainFreq
			

		// grabs the current time via moment.js and 
		// stores it in a variable
		var currentTime = moment();
			
		// parses the string in the trainFreq variable and 
		// retuns it as an integer, and then stores it in
		// a variable
		var freqInt = parseInt(trainFreq)	

		// grabs the trainTime variable, pushes it back 
		// 1 year to insure it comes becore currentTime
		var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
			
		
		// caculates difference between the time stored in trainTimeConverted
		// and the current time and stores it in a variable
		var diffTime = moment().diff(moment(trainTimeConverted), 'minutes');
			
		// calculates remainder between diffTime and the freqInt
		// variable, which stores the frequency of train arivals in minutes
		var tRemainder = diffTime % freqInt;
			
		// calculates the difference beyween tRemainder and the frequency
		// train arivals
		var minsAway = freqInt - tRemainder;
			
		// stores the minsAway variable and formats it to HH:mm 
		// to receive it as an actual time on the clock 
		var nextTrain = moment().add(minsAway, 'minutes');
			

		// appends the variables to the table with the id of "trainContainer"
		$("#trainContainer").append(
			"<tr><td>" + trainName +
			"</td><td>" + trainDest +
			"</td><td>" + trainFreq +
			"</td><td>" + moment(nextTrain).format("HH:mm") +
			"</td><td>" + minsAway  + 
			"</td></tr>");
 },

		function(errorObject){
		    console.log("Read failed: " + errorObject.code)
		});

			
