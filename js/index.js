// document.addEventListener("deviceready", onDeviceReady, false);

$(".pay").on('submit', function () {
  var name = $(this).find('#name').val()
  var email = $(this).find('#email').val()
  var amount = $(this).find('#amount').val()

  pay('http://pay.freshhopesystems.com/?name='+name+'&email='+email+'&amount'+amount)
  return false
})

function pay(url) {
  var ref = cordova.InAppBrowser.open(url, '_blank', 'location=no');
}


