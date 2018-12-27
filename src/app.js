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
var searchInput = document.getElementById('searchInput');
var searchForm = document.getElementById('searchForm');
var openAllButton = document.getElementById('all');
var newTabOption = document.getElementById('newTab');

function initLinkElements() {
  Object.keys(hrefs).forEach(function (key) {
    var element = document.getElementById(key);
    searchEngineLinks.push(element);
  });
}

function buildLinks() {
  Object.keys(hrefs).forEach(function (key, i) {
    searchEngineLinks[i].href = hrefs[key] + searchInput.value;
  });
}

function openDefault(e) {
  e.preventDefault();
  window.location = hrefs.ddg + searchInput.value;
}

function openAll() {
  if (!newTabOption.checked) {
    Object.keys(hrefs).forEach(function (key, i) {
      searchEngineLinks[i].target = '_blank';
    });
  }

  searchEngineLinks.forEach(function (link) {
    link.click();
  });

  if (!newTabOption.checked) {
    Object.keys(hrefs).forEach(function (key, i) {
      searchEngineLinks[i].target = '_self';
    });
  }
}

function toggleLinkTarget() {
  var newTarget = newTabOption.checked ? '_blank' : '_self';
  Object.keys(hrefs).forEach(function (key, i) {
    searchEngineLinks[i].target = newTarget;
  });
}

initLinkElements();
window.onload = buildLinks;
searchInput.addEventListener('input', buildLinks);
searchForm.addEventListener('submit', openDefault);
openAllButton.addEventListener('click', openAll);
newTabOption.addEventListener('change', toggleLinkTarget);
