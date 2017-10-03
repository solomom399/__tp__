// document.addEventListener("deviceready", onDeviceReady, false);

$(".pay").on('submit', function () {
  var name = $(this).find('#name').val()
  var email = $(this).find('#email').val()
  var amount = $(this).find('#amount').val()+'00'

  pay('http://pay.freshhopesystems.com/?name='+name+'&email='+email+'&amount='+amount)
  return false
})

function pay(url) {
  var ref = cordova.InAppBrowser.open(url, '_self', 'location=no');
  ref.executeScript({code: "localSTorage.getItem('ok')", function (data) {
    if (data == '' || data == null) {
      ref.close()
    }
  }});
}

