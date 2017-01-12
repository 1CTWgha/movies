// alert("Hello Alert");
//Delete
$('.delete-link').on('click', function(e) {
  e.preventDefault();
  var element = $(this);
  var url = element.attr('href');

  $.ajax({
    method: 'DELETE',
    url: url
  }).done(function(data) {
    // get data returned from the DELETE route
    console.log(data);
    // or, you can redirect to another page
    window.location = '/watchlist';
  });
});
