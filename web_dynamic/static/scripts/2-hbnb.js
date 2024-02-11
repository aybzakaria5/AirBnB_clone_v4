$(document).ready(function () {
  const amenityId = {};
  $('li input[type=checkbox]').change(function (event) {
    if (this.checked) {
      amenityId[this.dataset.name] = this.dataset.id;
    } else {
      delete amenityId[this.dataset.name];
    }
    const names = Object.keys(amenityId);
    $('.amenities h4').text(names.sort().join(', '));

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
