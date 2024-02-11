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

    ListofPlaces();

    $('.filters button').click(function (event) {
      event.preventDefault();

      $('.places').text('');
      const object = {};
      object.amenities = amenityId;
      ListofPlaces(JSON.stringify(object));
    });
});
function ListofPlaces (amenities = '{}') {
  $.ajax({
    type:'POST',
    url: "http://0.0.0.0:5001/api/v1/places_search",
    dataType: 'json',
    data: JSON.stringify({}),
    contentType: 'application/json; charset=utf-8',
    success: function (places) {
      for (let i = 0; i < places.length; i++) {
        $('section.places').append(
	`<article>
	<div class="title_box">
	<h2>${place[i].name}</h2>
	<div class="price_by_night">$${place[i].price_by_night}</div>
	</div>
	<div class="information">
	<div class="max_guest">${place[i].max_guest} Guest${
	place[i].max_guest !== 1 ? "s" : ""
	}</div>
	<div class="number_rooms">${place[i].number_rooms} Bedroom${
	place[i].number_rooms !== 1 ? "s" : ""
	}</div>
	<div class="number_bathrooms">${place[i].number_bathrooms} Bathroom${
	place[i].number_bathrooms !== 1 ? "s" : ""
	}</div>
	</div> 
	<div class="description">
	${place[i].description}
	</div>
	</article>`
	);
      }
  });
}
