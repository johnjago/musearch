var hrefs = {
  ddg: "https://duckduckgo.com/?q=",
  google: "https://www.google.com/search?q=",
  yandex: "https://www.yandex.com/search/?text=",
  sogou: "https://www.sogou.com/web?query=",
  searx: "https://www.searx.me/?q=",
  yahoo: "https://search.yahoo.com/search?p=",
  baidu: "http://www.baidu.com/s?wd=",
  qwant: "https://www.qwant.com/?q=",
  startpage: "https://www.startpage.com/do/search?&query=",
  bing: "https://www.bing.com/search?q=",
  dogpile: "http://www.dogpile.com/search/web?q=",
  gigablast: "https://www.gigablast.com/search?q="
}

var searchEngineLinks = [];

Object.keys(hrefs).forEach(function (key) {
  var element = document.getElementById(key);
  searchEngineLinks.push(element);
});

var searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function () {
  Object.keys(hrefs).forEach(function(key, i) {
    searchEngineLinks[i].href = hrefs[key] + searchInput.value;
  });
});

var searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  window.location = hrefs.ddg + searchInput.value;
});

var newTab = document.getElementById('newTab');

newTab.addEventListener('change', function () {
  Object.keys(hrefs).forEach(function(key, i) {
    searchEngineLinks[i].target = newTab.checked ? '_blank' : '_self';
  });
});
