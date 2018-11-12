$(document).ready(function() {

    var dank = [
      "reactions", "LOL", "beer", "memes", "funny sports", "bird noises",
      "deadpool", "waffles", "the office", "wtf", "skittles",
      "cat", "dog", "veganism", "black dynamite", "tacos",
      "venom"
    ];
  
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".dank-button", function() {
    $("#dank").empty();
    $(".dank-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var dankDiv = $("<div class=\"dank-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var dankImage = $("<img>");
          dankImage.attr("src", still);
          dankImage.attr("data-still", still);
          dankImage.attr("data-animate", animated);
          dankImage.attr("data-state", "still");
          dankImage.addClass("dank-image");

          dankDiv.append(p);
          dankDiv.append(dankImage);

          $("#dank").append(dankDiv);
        }
      });
  });

  $(document).on("click", ".dank-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-dank").on("click", function(event) {
    event.preventDefault();
    var newGif = $("input").eq(0).val();

    if (newGif.length > 2) {
      dank.push(newGif);
    }

    populateButtons(dank, "dank-button", "#dank-button");

  });

  populateButtons(dank, "dank-button", "#dank-button");
});
