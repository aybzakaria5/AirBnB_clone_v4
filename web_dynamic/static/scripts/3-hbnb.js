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
    $.post({
		url: "http://0.0.0.0:5001/api/v1/places_search",
		data: JSON.stringify({}),
		headers: {
			"Content-Type": "application/json",
		},
		success: (data) => {
			data.forEach((place) =>
				$("section.places").append(
					`<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? "s" : ""
					}</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? "s" : ""
					}</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? "s" : ""
					}</div>
			</div> 
			<div class="description">
			${place.description}
			</div>
				</article>`
				)
			);
		},
		dataType: "json",
	});
});
  