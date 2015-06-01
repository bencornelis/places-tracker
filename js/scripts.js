$(function() {

  var landMarkCount = 1;
  var noteCount = 1;

  var resetForm = function() {
    $("form#new-place").find("input").each(function() {
      $(this).val('');
    });

    $(".new-landmark-wrapper").slice(1).remove();
    $(".new-note-wrapper").slice(1).remove();

    landMarkCount = 1;
    noteCount = 1;

    $("#first-landmark-label").text("");
    $("#first-note-label").text("");
  };

  $("#extra-landmark").click(function() {
    landMarkCount += 1;

    if (landMarkCount > 1) {
      $("#first-landmark-label").text("1");
    }

    // Insert another section for adding an additional landmark
    $(".new-landmark-wrapper").last().after(

      '<div class="form-group new-landmark-wrapper">' +
        '<label for="new-landmark" class="col-sm-3 ' +                              'control-label">Landmark ' + landMarkCount + '</label>' +
        '<div class="col-sm-9">' +
          '<input type="text" class="new-landmark form-control">' +
        '</div>' +
      '</div>'
    );
  });

  $("#extra-note").click(function() {
    noteCount += 1;

    if (noteCount > 1) {
      $("#first-note-label").text("1");
    }


    $(".new-note-wrapper").last().after(

      '<div class="form-group new-note-wrapper">' +
        '<label for="new-note" class="col-sm-3 ' +                              'control-label">Note ' + noteCount + '</label>' +
        '<div class="col-sm-9">' +
          '<input type="text" class="new-note form-control">' +
        '</div>' +
      '</div>'
    );
  });

  $("#reset").click(function() {
    resetForm();
  });

  $("form#new-place").submit(function(event) {
    event.preventDefault();

    var location = $("#new-location").val();
    var year     = $("#new-time").val();
    var note     = $(".new-note").val();

    var trip = {location: location, year: year, landmarks: [], notes: []};

    $(".new-landmark").each(function() {
      var landmark = $(this).val();
      trip.landmarks.push(landmark);
    });

    $(".new-note").each(function() {
      var note = $(this).val();
      trip.notes.push(note);
    });

    $("#places-list").append("<li class='place linkify'>" + trip.location + "</li>");

    $(".place").last().click(function() {
      $("#place").show();

      $("#location").text(trip.location);
      $("#year").text(trip.year);
      $(".landmarks").empty();
      $(".notes").empty();

      trip.landmarks.forEach(function(landmark) {
        if (landmark) {
          $(".landmarks").append("<li>" + landmark  + "</li>");
        }
      });

      trip.notes.forEach(function(note) {
        if (note) {
          $(".notes").append("<li>" + note + "</li>");
        }
      });
    });

    resetForm();
  });
});
