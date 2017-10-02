/*document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use device APIs
    window.PaystackPlugin.chargeCard(
      function(resp) {
        // charge successful, grab transaction reference - do your thang!
        console.log('charge successful: '+JSON.stringify(resp));
      },
      function(resp) {
        // Something went wrong, oops - perhaps an invalid card.
        console.log('charge failed: '+JSON.stringify(resp));
      },
      {
        cardNumber: '4084084084084081', 
        expiryMonth: '01', 
        expiryYear: '20', 
        cvc: '408',
        email: 'sobanjosodi@gmail.com',
        amountInKobo: 150000
    });
}
*/
document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
  var ref = cordova.InAppBrowser.open('https://eattutorial.com', '_blank', 'location=yes');

}
