var topics = ["Mario", "Luigi", "Princess Peach", "Bowser", "Wario", "Yoshi"];

function createButtons() {
  for (i = 0; i < topics.length; i++) {
    makeButton(topics[i]);
    var music = new Audio("assets/music/smb.mp3");
    music.play();
  }
  bindingClicks();
}
function makeButton(topic) {
  $(".buttons").append(
    '<button type="button" class="gifButton mr-4 btn btn-secondary">' +
      topic +
      "</button>"
  );
}
createButtons();

function bindingClicks() {
  $(".gifButton").on("click", function() {
    var buttonText = $(this).text();
    addButtons(buttonText);
  });
}

$(".submitNewCharacter").on("click", function() {
  var newCharacter = $(".newCharacterInput")
    .val()
    .trim();
  if (newCharacter.length > 0 && topics.indexOf(newCharacter) === -1) {
    topics.push(newCharacter);
    console.log(newCharacter);
    addButtons(newCharacter);
    makeButton(newCharacter);
  }
});

function addButtons(buttonText) {
  $("#gifs").html("");
  // var buttonText = $(this).text();
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    buttonText +
    "&api_key=LbIPqI3zJMp8TzCVfMA9i9oqqHq7nYo3&limit=10&rating";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var character = $(this).attr("data-character");
    var result = response.data;
    console.log(result);
    //     for (var k = 0; k < result.length; k++) {
    //       var rating = result[k].rating;
    //       var p = $("<p>").text("Rating: " + rating);
    //       var characterImage = $("<img>");
    //       characterImage.attr("src", result[k].images.fixed_height.url);
    //       $("#gifs").append(p);
    //       $("#gifs").append(characterImage);
    //     }
    //   });
    // }

    //trialed this solution - didn't work (gifs only show 6 for button 1, 5 for button 2, 4 for button 3, etc. and gifs stay in still image)

    for (var k = 0; k < result.length; k++) {
      var rating = result[k].rating;
      var p = $("<p>").text("Rating: " + rating);
      var characterImage = $("<img>");
      $("#gifs").append(p);
      $("#gifs").append(characterImage);
      characterImage.attr("src", result[k].images.fixed_height_still.url);
      characterImage.attr("data-state", "still");
      characterImage.addClass("gifImage");
      characterImage.attr("data-animate", result[k].images.fixed_height.url);
      characterImage.attr(
        "data-still",
        result[k].images.fixed_height_still.url
      );
    }
  });
}

$(document).on("click", ".gifImage", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
