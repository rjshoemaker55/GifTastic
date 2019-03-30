var topics = [
  "music",
  "camping",
  "sports",
  "movies",
  "technology",
  "art",
  "animals",
  "food",
  "outdoors",
  "video games"
]

function createButtons() {
  $("#buttons-div").empty();
$.each(topics, function() {
  var newButton = $("<button>").text(this)
  newButton.attr("type", "button")
  newButton.addClass("buttons btn-default btn-primary")
  $("#buttons-div").append(newButton)
})
}

$(document.body).on("click", ".buttons", function() {
  console.log("clicked")
  var topicquery = $(this).text()

  console.log(topicquery)
  $.ajax({
    url: "http://api.giphy.com/v1/gifs/search?q=" + topicquery + "s&api_key=jSen6BwZSc0sDdHUgWPLxzXznD853orJ&limit=10",
    method: "GET"
  }).then(function(response) {
    $("#images-div").empty()
    for (var i = 0; i <= 9; i++) {
      console.log(response.data[i].embed_url)
      var imageURL = (response.data[i].images.fixed_height_still.url)
      var rating = response.data[i].rating.toUpperCase();



      var card = $("<div>").addClass("card").attr("id", "img-" + i)

      $(card).html(`
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imageURL}" alt="Card image cap">
        <div class="card-body">
        <p class="card-text">Rating: ${rating}</p>
        </div>
        </div>
     ` )

      $("#images-div").append(card)

    }
  })
})

$("#topic-input-button").on("click", function() {
  event.preventDefault();

  var newTopic = $("#topic-input").val();

  topics.push(newTopic)

  $("#topic-input").val("")

  createButtons();

})


createButtons();
