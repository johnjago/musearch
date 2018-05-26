function observable(value) {
  var listeners = [];

  function notify(newValue) {
    listeners.forEach(function(listener){ listener(newValue); });
  }

  function accessor(newValue) {
    if (arguments.length && newValue !== value) {
      value = newValue;
      notify(newValue);
    }
    return value;
  }

  accessor.subscribe = function(listener) { listeners.push(listener); };

  return accessor;
}

function computed(calculation, dependencies) {
  // start with the initial value
  var value = observable(calculation());

  // register a listener for each dependency, that updates the value
  function listener() { value(calculation()); }
  dependencies.forEach(function(dependency) {
    dependency.subscribe(listener);
  });

  // now, wrap the value so that users of computed() can't manually update the value
  function getter() { return value(); }
  getter.subscribe = value.subscribe;

  return getter;
}

function bindValue(input, observable) {
  input.value = observable();
  observable.subscribe(function(){ input.value = observable(); });

  input.addEventListener('input', function() {
    observable(input.value);
  });
}

function bindLink(link, observable) {
  link.href = observable();
  observable.subscribe(function(){ link.href = observable(); });
}

var searchValue = observable('');

var ddgHref = computed(function(url){ return "https://duckduckgo.com/?q=" + searchValue(); }, [searchValue]);
var googleHref = computed(function(url){ return "https://www.google.com/search?q=" + searchValue(); }, [searchValue]);
var yandexHref = computed(function(url){ return "https://www.yandex.com/search/?text=" + searchValue(); }, [searchValue]);
var sogouHref = computed(function(url){ return "https://www.sogou.com/web?query=" + searchValue(); }, [searchValue]);
var searxHref = computed(function(url){ return "https://www.searx.me/?q=" + searchValue(); }, [searchValue]);
var yahooHref = computed(function(url){ return "https://search.yahoo.com/search?p=" + searchValue(); }, [searchValue]);
var baiduHref = computed(function(url){ return "http://www.baidu.com/s?wd=" + searchValue(); }, [searchValue]);
var qwantHref = computed(function(url){ return "https://www.qwant.com/?q=" + searchValue(); }, [searchValue]);
var startpageHref = computed(function(url){ return "https://www.startpage.com/do/search?&query=" + searchValue(); }, [searchValue]);
var bingHref = computed(function(url){ return "https://www.bing.com/search?q=" + searchValue(); }, [searchValue]);
var dogpileHref = computed(function(url){ return "http://www.dogpile.com/search/web?q=" + searchValue(); }, [searchValue]);
var gigablastHref = computed(function(url){ return "https://www.gigablast.com/search?q=" + searchValue(); }, [searchValue]);

var search = document.getElementById('search');
bindValue(search, searchValue);

var ddg = document.getElementById('ddg');
var google = document.getElementById('google');
var yandex = document.getElementById('yandex');
var sogou = document.getElementById('sogou');
var searx = document.getElementById('searx');
var yahoo = document.getElementById('yahoo');
var baidu = document.getElementById('baidu');
var qwant = document.getElementById('qwant');
var startpage = document.getElementById('startpage');
var bing = document.getElementById('bing');
var dogpile = document.getElementById('dogpile');
var gigablast = document.getElementById('gigablast');

bindLink(ddg, ddgHref);
bindLink(google, googleHref);
bindLink(yandex, yandexHref);
bindLink(sogou, sogouHref);
bindLink(searx, searxHref);
bindLink(yahoo, yahooHref);
bindLink(baidu, baiduHref);
bindLink(qwant, qwantHref);
bindLink(startpage, startpageHref);
bindLink(bing, bingHref);
bindLink(dogpile, dogpileHref);
bindLink(gigablast, gigablastHref);
