var config = {
    apiKey: "AIzaSyCTAqu2qfqESXXFXOe9iecOPEIFdMb2WDM",
    authDomain: "train-scheduler-3369e.firebaseapp.com",
    databaseURL: "https://train-scheduler-3369e.firebaseio.com",
    projectId: "train-scheduler-3369e",
    storageBucket: "train-scheduler-3369e.appspot.com",
    messagingSenderId: "279836362844"
  };
  firebase.initializeApp(config);

	var database = firebase.database();

	// console.log(moment().hours());
	// console.log(moment().subtract(7, 'days'));

	// var randomdate = "02/23/1999";
	// convertedDate = moment(randomdate).format("MM/DD/YYYY");

	// console.log(moment().startOf('day').add(2,'h').diff(moment(),"minutes"));

	database.ref().on("child_added",function(childSnapshot,prevChildkey){
		console.log(childSnapshot.val());

		var trainName = childSnapshot.val().trainName;
		var firstTime = childSnapshot.val().firstTime;
		var destination = childSnapshot.val().destination;
		var frequency = childSnapshot.val().frequency;
		
		var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		var trainRemainder = diffTime % frequency;
		var minutesTillTrain = frequency - trainRemainder;
		var arrival = moment().add(minutesTillTrain, "minutes");
		arrivalFormat = moment(arrival).format("hh:mm");
		$("table").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  		frequency + "</td><td>" + arrivalFormat + "</td><td>" + minutesTillTrain + "</td></tr>");
	});


 
$("#submit-button").on("click",function(event){

event.preventDefault();

var	trainName = $("#train-name").val().trim();
	console.log(trainName);
var	destination = $("#destination").val().trim();
	console.log(destination);
var	firstTime = $("#first-time").val().trim();
	console.log(firstTime);
var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
var	frequency = $("#frequency").val().trim();
	console.log(frequency);
// var diff = moment(firstTime).diff(moment());
// console.log(diff);
// var duration = moment.duration(diff);
// var min = duration.asMinutes();
// console.log(min);
	
	var trainInfo = {
		 trainName:trainName,
		 destination: destination,
		 firstTime: firstTime,
		 frequency:frequency
	};
	
	database.ref().push(trainInfo);

	console.log(trainInfo);

   $("#train-name").val("");
   $("#destination").val("");
   $("#first-time").val("");
   $("#frequency").val("");


});



