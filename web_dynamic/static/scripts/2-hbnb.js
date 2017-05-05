$(document).ready(function () {
  console.log('document loaded');

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    }
  }).fail(function (d, textStatus, err) {
    $('DIV#api_status').removeClass('available');
  });

  const amenityStorage = {};

  $('li :checkbox').change(function () {
    let amenityId = $(this).attr('data-id');
    let amenityName = $(this).attr('data-name');

    if (this.checked) {
      amenityStorage[amenityId] = amenityName;
    } else {
      delete amenityStorage[amenityId];
    }

    $('div.amenities h4').empty();

    let newText = $.map(amenityStorage, function (v) {
      return v;
    }).join(', ');

    $('div.amenities h4').text(newText);
  });
});
