  navigator.geolocation.getCurrentPosition(function(location){
    // console.log(location);
    $('#latitude').val(location.coords.latitude);
    $('#longitude').val(location.coords.longitude);
  });
$(document).ready(function() {
  $('.delete-btn').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var well = $(this).parent();
    $.ajax({
      url: url,
      method: 'DELETE'
    }).done(function(data) {
      console.log(data);
      if (data.msg === 'success') {
        well.fadeOut(2000, function() {
          well.remove();
        });
      }
    })
  });

  $('.favorite-form').submit(function(event) {

    event.preventDefault();

    //console.log(event.target[0].value);

    var data = {
      name: event.target[0].value,
      url: event.target[1].value,
      imgUrl: event.target[2].value,
      ratingImgUrl: event.target[3].value
    }

    $.ajax({
      url: '/favorites',
      method: 'POST',
      data: data,
      success: function() {
        console.log('Success');
      },
      error: function() {}
    });

  });

});