var idArray = [] // array used to dynamically store actor id

console.log(idArray);

$(document).ready(() => {
	$.ajax({ // this function pulls the People - Get Popular listings
		url: "https://api.themoviedb.org/3/person/popular?api_key=eb5fafc9ff4aaca27543575afba0e08a&language=en-US&page=1", 
		success: function(result) {
            console.log(result.results); // loads all the objects

            for (var i = 0; i < 5; i++){
                var newImage;
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



/* this function receives two parameters, one for the ajax url, and one for the image id to target*/
function loadImages(id, i) {
    $.ajax({ // this function pulls the People - Get Popular listings
		url: "https://api.themoviedb.org/3/person/" + id + "/images?api_key=eb5fafc9ff4aaca27543575afba0e08a", 
		success: function(result) {
            newImage = "https://image.tmdb.org/t/p/w200" + result.profiles[0].file_path; // merges the basic url and the file path
            $('#img' + i).attr("src", newImage); // uploads the image according to the img id
		}
	});
}





for (var i = 0; i < 5; i++){ // adds event listener to each button
    $('#button' + i).click(function(e){
        popup();

    });
}



function popup(){ // makes popup box with actor information appear and hides everything else
    $('#popup').css("display", "block");
    $('html').css("background", "url('popupbackground.svg') no-repeat center center fixed");
    $('html').css("background-size", "cover");
    $('#container').css("display", "none");
    $('.title').css("display", "none");
    $('.subtitle').css("display", "none")

}


$('#closeButton').click(popupClose);


function popupClose(){ // closes popup box and displays everything again
    $('#popup').css("display", "none");
    $('#container').css("display", "flex");
    $('.title').css("display", "block");
    $('.subtitle').css("display", "block");
    $('html').css("background", "url('background.svg') no-repeat center center fixed");
    $('html').css("background-size", "cover");
}


/* WHERE I LEFT OFF...
I need to figure out a way to get the information to dynamically load in the popup box
the functionality so far is straightforward */



// path for images https://image.tmdb.org/t/p/w200 plus whatever the id returns
// path for details https://api.themoviedb.org/3/person/{person_id}?api_key=eb5fafc9ff4aaca27543575afba0e08a&language=en-US
// sample id 1907997