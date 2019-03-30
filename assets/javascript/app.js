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
  $.each(topics, function () {
    var newButton = $("<button>").text(this)
    newButton.attr("type", "button")
    newButton.addClass("buttons btn-default btn-primary")
    $("#buttons-div").append(newButton)
  })
}

$(document.body).on("click", ".buttons", function () {

  var topicquery = $(this).text()


  $.ajax({
    url: "http://api.giphy.com/v1/gifs/search?q=" + topicquery + "s&api_key=jSen6BwZSc0sDdHUgWPLxzXznD853orJ&limit=10",
    method: "GET"
  }).then(function (response) {
    if ($("#remove-button").is(":checked")) {
      $("#images-div").empty()
    }

    for (var i = 0; i <= 9; i++) {
      var imageURL = response.data[i].images.fixed_height_still.url
      var animateURL = response.data[i].images.fixed_height.url
      var rating = response.data[i].rating.toUpperCase();
      var altText = response.data[i].title
      var card = $("<div>").addClass("card").attr("id", "img-" + i)

      $(card).html(`
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imageURL}" alt="${altText}" data-still="${imageURL}" data-animate="${animateURL}" data-state="still">
        <div class="card-body">
        <p class="card-text">Rating: ${rating}</p>
        </div>
        </div>
     ` )

      $("#images-div").prepend(card)

    }
  })
})

$("#topic-input-button").on("click", function () {
  event.preventDefault();

  var newTopic = $("#topic-input").val();

  if (newTopic != "") {

    topics.push(newTopic)
    $("#topic-input").val("")
    createButtons();

  } else {

    alert("Please enter a valid topic!")

  }

})

$(document.body).on("click", ".card-img-top", function () {

  if ((this).getAttribute("data-state") == "still") {

    $(this).attr("src", (this).getAttribute("data-animate"))
    $(this).attr("data-state", "animated")

  } else {

    $(this).attr("src", (this).getAttribute("data-still"))
    $(this).attr("data-state", "still")

  }
})

createButtons();
