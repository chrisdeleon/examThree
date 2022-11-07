/* 
Chris de Leon
CIS 131
Exam 3
11/6/2022
 */

var idArray = []; // array used to dynamically store actor id
var buttonArray = [ // parallel array that retrieves the actors information and loads it into the popup
	"button0",
	"button1",
	"button2",
	"button3",
	"button4"
];


$(document).ready(() => {
	$.ajax({ // this function pulls the People - Get Popular listings
		url: "https://api.themoviedb.org/3/person/popular?api_key=eb5fafc9ff4aaca27543575afba0e08a&language=en-US&page=1",
		success: function(result) {
			for (var i = 0; i < 5; i++) {
				idArray.push(result.results[i].id); // pushes actor id into the idArray
				$('#name' + i).text(result.results[i].name); // changes the card name to reflect the corresponding actor
				loadImages(idArray[i], i);
				/* the two parameters passed into this function are
				 the id needed for the ajax url, 
				 and the loop iteration */
			}
		}
	});
});

var newImage;

/* this function receives two parameters, one for the ajax url, and one for the image id to target */
function loadImages(id, i) {
	$.ajax({ // this function pulls the People - Get Popular listings
		url: "https://api.themoviedb.org/3/person/" + id + "/images?api_key=eb5fafc9ff4aaca27543575afba0e08a",
		success: function(result) {
			newImage = "https://image.tmdb.org/t/p/w200" + result.profiles[0].file_path; // merges the basic url and the file path
			$('#img' + i).attr("src", newImage); // uploads the image according to the img id
		}
	});
}


for (var i = 0; i < 5; i++) { // adds event listener to each button
	$('#button' + i).click(function(e) {
		popup();
		clicked(this.id); // calls a function that uses the id of the item clicked as the parameter

	});
}

var arrayIndex;
var popupID;

function clicked(clicked_id) { // function uses a parallel array to obtain new information in the popup
	arrayIndex = buttonArray.indexOf(clicked_id); // grabs the id of the item clicked and checks was array index it is in
	popupID = idArray[arrayIndex]; // using the array index from above, the parallel array is then parsed
	popupInformation(clicked_id, popupID); // function that does the loading of new information with two parameters from above
}

var popupImage;

function popupInformation(clicked_id, popupID) { // this function dynamically loads the information of the box that was selected
	$.ajax({
		url: "https://api.themoviedb.org/3/person/" + popupID + "?api_key=eb5fafc9ff4aaca27543575afba0e08a&language=en-US",
		success: function(result) {
			popupImage = "https://image.tmdb.org/t/p/w200" + result.profile_path; // merges the basic url and the file path
			$("#popupImg").attr("src", popupImage); // loads the image
			$("#popupName").text(result.name); // loads name
			$('#popupBirth').text("Born: " + result.birthday); // loads DOB
			$('#popupBirthPlace').text("Born in " + result.place_of_birth); // loads location of birth
			$('#popupBio').text(result.biography); // loads bio
		}
	});
}

function popup() { // makes popup box with actor information appear and hides everything else
	$('#popup').css("display", "block");
	$('html').css("background", "url('popupbackground.svg') no-repeat center center fixed");
	$('html').css("background-size", "cover");
	$('#container').css("display", "none");
	$('.title').css("display", "none");
	$('.subtitle').css("display", "none");
}

$('#closeButton').click(popupClose); // adds event listener that closes popup box on click

function popupClose() { // closes popup box and displays original page again
	$('#popup').css("display", "none");
	$('#container').css("display", "flex");
	$('.title').css("display", "block");
	$('.subtitle').css("display", "block");
	$('html').css("background", "url('background.svg') no-repeat center center fixed");
	$('html').css("background-size", "cover");
}