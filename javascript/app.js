var topics = ["Mario", "Luigi", "Princess Peach", "Bowser", "Wario", "Yoshi"];

for (i = 0; i < topics.length; i++) {
  $(".buttons").append("<button>" + topics[i] + "</button>");
}

$(".buttons").on("click", function() {
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topics[i] +
    "&api_key=LbIPqI3zJMp8TzCVfMA9i9oqqHq7nYo3&limit=10&rating";
  console.log("made it");

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var character = $(this).attr("data-character");
    console.log("Made a character variable");
    var result = response.data;
    for (var k = 0; k < result.length; k++) {
      console.log("started a for loop");
      var rating = result[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var characterImage = $("<img>");
      characterImage.attr("src", result[i].images.fixed_height.url);
      $("#gifs").append(p);
      $("#gifs").append(characterImage);
    }
  });
});
