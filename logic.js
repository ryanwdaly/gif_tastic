$(document).ready(function() {

    //Get gifs based on character button
    $("button").on("click", function (getGifs) {
        var dbzChar = $(this).attr("data-character");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            dbzChar + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({
                url: queryURL,
                method: "GET"
        }).then(function (response) {
                var data = response.data;
                for (var i = 0; i < data.length; i++) {
                    var charDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + data[i].rating);
                    //Set up img tag and its attributes
                        var charImage = $("<img>");
                        charImage.attr("class", "gif")//adds class = 'gif'
                        charImage.attr("src", data[i].images.fixed_height.url);//animateULR
                        charImage.attr("data-state", "animate")//set state to animate
                        charImage.attr("data-still", data[i].images.original_still.url)//stillURL
                    charDiv.append(p);
                    charDiv.append(charImage);
                    $("#gifs-appear-here").prepend(charDiv);
                }
        });
             
    });

    //Pause gifs on click
    $(".gif").on("click", function (pauseGif) {
        alert(".gif clicked");
        
        // state = $(this).attr("data-state");
        // console.log("data-state: " + state);
        // if (state === "still") {
        //     $(this).attr("src", $(this).attr("data-animate"));
        //     $(this).attr("data-state", "animate");
        // } else {
        //     $(this).attr("src", $(this).attr("data-still"));
        //     $(this).attr("data-state", "still");
        // }
    });

});
