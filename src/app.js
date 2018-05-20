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
var googleHref = computed(function(url){ return "https://duckduckgo.com/?q=" + searchValue(); }, [searchValue]);
var yandexHref = computed(function(url){ return "https://www.yandex.com/search/?text=" + searchValue(); }, [searchValue]);
var sogouHref = computed(function(url){ return "https://www.sogou.com/web?query=" + searchValue(); }, [searchValue]);

var search = document.getElementById('search');
bindValue(search, searchValue);

var ddg = document.getElementById('ddg');
var google = document.getElementById('google');
var yandex = document.getElementById('yandex');
var sogou = document.getElementById('sogou');

bindLink(ddg, ddgHref);
bindLink(google, gooogleHref);
bindLink(yandex, yandexHref);
bindLink(sogou, sogouHref);
