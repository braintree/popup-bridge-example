$('a').on('click', function (event) {
   var color = $(this).data('color');
   var anchor = event.currentTarget.hash.substring(1);

   if (location.search.lastIndexOf('isAppLink') !== -1 && location.search.split('isAppLink=')[1] == "true") {
     prefix = "https://mobile-sdk-demo-site-838cead5d3ab.herokuapp.com"
     location.href = prefix + '?color=' + color;
   } else if (location.search.indexOf('popupBridgeReturnUrlPrefix') !== -1) {
     var prefix = location.search.split('popupBridgeReturnUrlPrefix=')[1];
     if (anchor === 'cancel') {
       prefix += 'cancel';
     }
     location.href = prefix + '?color=' + color;
   } else {
     window.opener.postMessage(JSON.stringify({ color: color }), '*');
   }
});

function parseParams() {
  var splitQuery = window.location.search.replace('?','').split('&');
  var params = {};

  splitQuery.forEach(function (query) {
    var property = query.split('=');
    params[property[0]] = property[1];
  });

  return params;
}

var params = parseParams();
