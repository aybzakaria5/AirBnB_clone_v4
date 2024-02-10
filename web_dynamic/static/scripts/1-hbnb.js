$(function () {
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
});
