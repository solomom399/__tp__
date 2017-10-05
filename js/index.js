
var ref;

$(".pay").validate({
    
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if(element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function (form) {
        $(".pay_load").html('Loading payment form...')
	  	var name = $(".pay").find('#name').val()
	  	var email = $(".pay").find('#email').val()
	  	var amount = $(".pay").find('#amount').val()+'00'

	  	payWithPaystack(name, email, amount, $(".pay"))
	  	return false
    }
})



var my = function () {
  	this.useit;

  	this.pay = function (name, email, amount) {
	    ref = cordova.InAppBrowser.open('', '_self', 'location=no');
	    ref.addEventListener('loadstop', function() {
	        ref.executeScript({code: ""}, payWithPaystack(name, email, amount));
	    });
  	}
}


var my = new my();

function payWithPaystack(name, email, amount, form_object){
            
    var handler = PaystackPop.setup({
	    key: 'pk_test_627b3212869ed34b3c5dee07082de6ece430cd6a',
	    email: email,
	    amount: amount,
	    ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
	    metadata: {
	        custom_fields: [
	            {
	                display_name: "Fullname",
	                variable_name: 'name',
	                value: name
	            }
	        ]
	    },
	    callback: function(response){
	    	swal({
                title: "Successful",
                text: '<b>You reference code is '+response.reference+'</b>',
                html: true,
                type: 'success',
                confirmButtonClass : 'btn btn-wine'
            },
            function () {
            	window.location = ''
            })
	    	// form_object.trigger('reset')
	    	// $(".pay_load").html('<span style="color: green;"><b>You reference code:</b> '++'</span>')
	    },
	    onClose: function(){
	    	$(".pay_load").html('')
	    }
    });
    handler.openIframe();
}

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

$('.button-collapse').sideNav({
	edge: 'left', // Choose the horizontal origin
	closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
	draggable: true
});


$(".no_prce").on('click', function () {
	var price = $(this).attr('price')
	$(".total").html('Total = '+(parseInt(price)+22500).formatMoney(2, '.', ','))
	$("#amount").val(parseInt(price)+22500)
})




