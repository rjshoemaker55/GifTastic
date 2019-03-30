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
      var image = $("<img>").attr("id", "img-" + i)
      image.attr("src", imageURL)



      var card = $("<div>").addClass("card")
      $(card).html(
     " <img class=&quot;card-img-top&quot; src=&quot;" + imageURL + "alt=&quot;Card image cap&quot;>"
     " <div class=&quot;card-body&quot;>"
       " <p class=&quot;card-text&quot;>Some quick example text to build on the card title and make up the bulk of the card's content.</p>"
     " </div>"
      )

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
