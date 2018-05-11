var forEach = Array.prototype.forEach, $$ = document.querySelectorAll.bind(document);

forEach.call($$(".button"), function(btn) {
  btn.addEventListener("click", function(e) {
    var url = btn.getAttribute("data-url");
    var query = getSearchQuery();
    window.open(url + query, "_self");
  }, false);
});

document.getElementById("search").addEventListener("keydown", function(e) {
  var query = getSearchQuery();
  if (e.key === "Enter") {
    window.location = document.getElementById("ddg").getAttribute("data-url") + query;
  }
});

function getSearchQuery() {
  return document.getElementById("search").value;
}
