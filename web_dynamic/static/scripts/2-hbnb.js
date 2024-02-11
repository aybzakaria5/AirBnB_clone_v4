$(document).ready(function () {
  const amenityId = {};
  $('.amenities .popever li input').change(function (event) {
    if (this.checked) {
      amenityId[this.dataset.id] = this.dataset.name;
    } else {
      delete amenityId[this.dataset.id];
    }
    const names = Object.values(amenityId);
    $('.amenities h4').text(names.join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
      console.log(data.status);
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
