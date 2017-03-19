$(document).ready(function(){

var config = {
    apiKey: "AIzaSyAVYlb9husYOCAKhJxcZoMyJheXmyYQSh4",
    authDomain: "datamanagement-3f867.firebaseapp.com",
    databaseURL: "https://datamanagement-3f867.firebaseio.com",
    storageBucket: "datamanagement-3f867.appspot.com",
    messagingSenderId: "1021486125062"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $('#add-train').on("click", function(event){
  	event.preventDefault();

  	var trainName = $('#trainName').val().trim();
  	var destination = $('#destination').val().trim();
  	var frequency = $('#frequency').val().trim();
    var firstTrainTime = $('#firstTrainTime').val().trim();
  	




  	database.ref().push({
  		name : trainName,
  		destination : destination ,
  		frequency : frequency,
      firstTrainTime : firstTrainTime
  		
  	}); // push


  }); //on click

     


  	database.ref().on("child_added", function(childSnapshot){
  	var name = childSnapshot.val().name;
  	var place = childSnapshot.val().destination;
  	var frequency = childSnapshot.val().frequency;


     var firstTrainTime = childSnapshot.val().firstTrainTime;
     var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
     var currentTime = moment();
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     var tRemainder = diffTime % frequency;
     var minutesTillTrain = frequency - tRemainder;
     var nextTrain = moment().add(minutesTillTrain, "minutes");
     var nextTrainFormatted = moment(nextTrain).format("hh:mm");
  	


  		$('.table').append('<tr><td>' + name +
  			'</td> <td>' + place +
  			'</td> <td>' + frequency +
  			'</td> <td>' + nextTrainFormatted +
  			'</td> <td>' + minutesTillTrain + 
  			' </td> </tr>');
  	}) // table append


}) // Ready