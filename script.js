$(document).ready (() => {
    $.ajax ({
        url: "https://api.themoviedb.org/3/person/popular?api_key=eb5fafc9ff4aaca27543575afba0e08a&language=en-US&page=1",
        sucess: function(result){

            // code goes here
        }
    });
})