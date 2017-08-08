$(".button").on("click", function(e) {
  console.log(e.currentTarget.id);
  var query = $("#search").val();
  window.location = "https://duckduckgo.com/?q=" + query;
});
