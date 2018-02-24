var topics = ["Mario", "Luigi", "Princess Peach", "Bowser", "Wario", "Yoshi"];

function createButtons() {
  for (i = 0; i < topics.length; i++) {
    makeButton(topics[i]);
  }
}
function makeButton(topic) {
  $(".buttons").append(
    '<button type="button" class="gifButton btn btn-outline-info">' +
      topic +
      "</button>"
  );
  bindingClicks();
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
  console.log(newCharacter);
  addButtons(newCharacter);
  makeButton(newCharacter);
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
    for (var k = 0; k < result.length; k++) {
      var rating = result[k].rating;
      var p = $("<p>").text("Rating: " + rating);
      var characterImage = $("<img>");
      characterImage.attr("src", result[k].images.fixed_height.url);
      $("#gifs").append(p);
      $("#gifs").append(characterImage);
    }
  });
}
