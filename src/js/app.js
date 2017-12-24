var forEach = Array.prototype.forEach,
  $$ = document.querySelectorAll.bind(document);
forEach.call($$('.button'), function(v) {
  v.addEventListener('click', function(e) {
    var query = document.getElementById("search").value;
    switch (v.id) {
      case "ddg":
        window.location = "https://duckduckgo.com/?q=" + query;
        break;
      case "searx":
        window.location = "https://www.searx.me/?q=" + query;
        break;
    }
  }, false);
});
