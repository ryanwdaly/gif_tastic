//TO DO: 
//  -make gif display look better (add spacing, center)
//  -add css for character input
//  -make ratings look better
//
$(document).ready(function() {
    //Initialize global array and add companion buttons
    charArray = ["goku", "freeza", "piccalo", "krillin", "vegeta", "gohan", "majin buu", "bulma", "cell"];
    charArray.forEach(function(character) {
        addButton(character);
    });

    //Add character button
    $("#add-character").on("click", function() {
        event.preventDefault();
        var input = $("#character-input").val();
        $("#character-input").val("");

        if (!input || isButton(input)) {
            return;
        } else {
            charArray.push(input)
            addButton(input);
            
        }
    });

    //Get gifs based on character button
    $("body").on("click", "button", function () {
       $("#gif-container").empty();
        var dbzChar = $(this).attr("data-character");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            dbzChar + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({
                url: queryURL,
                method: "GET"
        }).then(function (response) {
                var data = response.data;

                for (var i = 0; i < 6; i++) {
                    var charDiv = $("<div>");
                    // charDiv.attr("class", "w3")
                    var p = $("<p>").text("Rated: " + data[i].rating.toUpperCase()).attr("class", "rating");
                    //Set up img tag and its attributes
                        var charImage = $("<img>");
                        charImage.attr("class", "gif w4-col")//adds class = 'gif'
                        charImage.attr("src", data[i].images.fixed_height.url);//srcURL
                        charImage.attr("data-animate", data[i].images.fixed_height.url);//animateURL
                        charImage.attr("data-state", "animate")//set state to animate
                        charImage.attr("data-still", data[i].images.fixed_height_still.url)//stillURL
                    
                    charDiv.append(p);
                    charDiv.append(charImage);
                    $("#gif-container").prepend(charDiv);
                }
        });  
    });

    //Pause gifs on click
    $("body").on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    //Hotkey events
    $(document).keypress(function(event) {
        var key = event.key.toLowerCase();

        if (key === "enter") {
            $("#add-character").click();
        }
    })
});

//Helper Methods
function addButton(character) {
    var newButton = $("<button>").attr("data-character", character);
    newButton.attr("class", "btn btn-primary gif-button");
    newButton.append(character);
    $("#button-container").append(newButton);
    $("body button").click();
}
function isButton(character) {
    if (charArray.includes(character)) {
        return true;
    } else {
        return false;
    }
}
