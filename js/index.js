
    // var path = 'https://pay.freshhopesystems.com/'
    var path = 'http://localhost/__pay/'
    var school_key = 'timest_'

    var MY = function () {
        var self = this


        self.makeUse = function (path_url, formData, callback, errorCallback = null) {
            $.ajax({
                url: path+path_url,
                type: "POST",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                dataType: "JSON",
                success: function(r) {
                    callback(r)
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    errorCallback(XMLHttpRequest, textStatus, errorThrown)
                }
            })
        }


        self.load = function (text = null) {
            swal({
                title : "",
                text : text,
                imageUrl : "img/load.gif",
                showConfirmButton : false
            })
        }



    }

    var my = new MY()

$("body").on('submit', '.pay', function () {
    $(".pay_load").html('Loading payment form...')
    var name = $(this).find('#name').val()
    var email = $(this).find('#email').val()
    var amount = $(this).find('#amount').val()+'00'

    payWithPaystack(name, email, amount, $(this))
    return false  
})


/*
var my = function () {
  	this.useit;

  	this.pay = function (name, email, amount) {
	    ref = cordova.InAppBrowser.open('', '_self', 'location=no');
	    ref.addEventListener('loadstop', function() {
	        ref.executeScript({code: ""}, payWithPaystack(name, email, amount));
	    });
  	}
}
*/

var my = new MY();

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
            var formData = new FormData(form_object)
            formData.append('school_key', school_key)
            formData.append('ref_code', response.reference)
            my.makeUse('user/payment.html', formData, function (resp) {
                console.log(resp)
                if (resp.status != 'error') {
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
                } else {
                    swal({
                        title: "",
                        text: '<h5>'+resp.text+'</h5>',
                        html: true,
                        type: 'warning',
                        confirmButtonClass : 'btn btn-danger'
                    })
                }
            },
            function (a, b, c) {
                swal({
                    title: "",
                    text: 'Something went wrong',
                    html: true,
                    type: 'warning',
                    confirmButtonClass : 'btn btn-danger'
                })
            })
	    	
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





$(".register-form").validate({
    
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
        my.load('Processing...')
        var formData = new FormData(form)
        formData.append('school_key', school_key)
        my.makeUse('user/register.html', formData, function (resp) {
        	if (resp.status != 'error') {
        		swal({
	                title: '<h4>'+resp.text+'</h4>',
	                text: "",
	                html: true,
	                type: 'success',
	                confirmButtonClass : 'btn btn-success'
	            })
	            $(".parent-input").val(resp.iid)
	            $(".register-form").trigger('reset')
	            $(".pick-second").trigger('click')

	            localStorage.setItem('logg', true)
	            localStorage.setItem('user_details', JSON.stringify(resp.user_details))

        	} else {
        		swal({
	                title: "",
	                text: '<h5>'+resp.text+'</h5>',
	                html: true,
	                type: 'warning',
	                confirmButtonClass : 'btn btn-danger'
	            })
        	}
        },function (a, b, c) {
        	console.log(a)
        	swal({
                title: "",
                text: 'Something went wrong',
                html: true,
                type: 'warning',
                confirmButtonClass : 'btn btn-danger'
            })
        })
	  	return false
    }
})


$(".login-form").validate({
    
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
        my.load('Processing...')
        var formData = new FormData(form)
        formData.append('school_key', school_key)
        my.makeUse('user/login.html', formData, function (resp) {
        	if (resp.status != 'error') {

	            localStorage.setItem('logg', true)
	            localStorage.setItem('user_details', JSON.stringify(resp.text))
	            window.location = 'data/index.html'

        	} else {
        		swal({
	                title: "",
	                text: '<h5>'+resp.text+'</h5>',
	                html: true,
	                type: 'warning',
	                confirmButtonClass : 'btn btn-danger'
	            })
        	}
        },function (a, b, c) {
        	console.log(a)
        	swal({
                title: "",
                text: 'Something went wrong',
                html: true,
                type: 'warning',
                confirmButtonClass : 'btn btn-danger'
            })
        })
	  	return false
    }
})

function add_student (al = true) {
    $("body").find(".student-form").validate({
    
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
            my.load('Processing...')
            var formData = new FormData(form)
            formData.append('school_key', school_key)

            my.makeUse('user/add-student.html', formData, function (resp) {
                if (resp.status != 'error') {
                    swal({
                        title: "",
                        text: '<h5>'+resp.text+'</h5>',
                        html: true,
                        type: 'success',
                        confirmButtonClass : 'btn btn-success'
                    }, function () {
                        $(".student-form").trigger('reset')
                        if (al == true) {
                            window.location = 'data/index.html'
                        }
                        
                    })
                    
                } else {
                    swal({
                        title: "",
                        text: '<h5>'+resp.text+'</h5>',
                        html: true,
                        type: 'warning',
                        confirmButtonClass : 'btn btn-danger'
                    })
                }
            },function (a, b, c) {
                swal({
                    title: "",
                    text: 'Something went wrong',
                    html: true,
                    type: 'warning',
                    confirmButtonClass : 'btn btn-danger'
                })
            })
            return false
        }
    })
    
}


add_student()

function my_account () {
    var user_details = JSON.parse(localStorage.getItem('user_details'))
    
    $("body").find('.firstname').html('<i class="ti-user"></i> Firstname: '+user_details.firstname)
    $("body").find('.lastname').html('<i class="ti-user"></i> Lastname: '+user_details.lastname)
    $("body").find('.email').html('<i class="ti-inbox"></i> '+user_details.email)
}



$("body").on('click', '.rl', function () {
    my.load('Loading...')
    if (localStorage.getItem('user_details') != null) {

        var user_details = JSON.parse(localStorage.getItem('user_details'))
    }

	var page = $(this).attr('my-page')
	var class_name = $(this).attr('my-class')
    var student_name = $(this).attr('my-fullname')
	$(".all-page-box").load(page+'.html', function () {
        swal.close()
		$(".rl").sideNav('hide')
		if (page === 'class') {
			$.post(path+'user/get_s_class.html', {school_key: school_key, class_name: class_name}, function (resp, status, a) {
				
				var output = '<tr><th>Type</th><th>Amount</th></tr>'
				var arr = new Array('Class fee', 'PTA', 'Graduation Fee', 'School Event', 'Day Care', 'After School', 'Sportswear - Wednesday', 'Friday')
				var t =0
				$(".class_name").html('Class name: '+resp.class_name)
                $(".student_name").html('Student: '+student_name)
                $(".parent_name").html('Your name: '+user_details.firstname+' '+user_details.lastname)
                $("input[name=name]").val(user_details.firstname+' '+user_details.lastname)
                $(".email").html('Your name: '+user_details.email)
                $("input[name=email]").val(user_details.email)
                $("input[name=parent_id]").val(user_details.id)
                $("input[name=class_name]").val(class_name)
				for (var i in resp) {
					if (t < arr.length) {
						if (i != 'id' || i != 'class_name') {
							output += '<tr><th>'+arr[t]+'</th><td>'+resp[i]+'</td><td><input type="checkbox" class="fee_type" data-v="'+resp[i]+'" name="'+i+'" value="'+arr[t]+'"></td></tr>'
						}
						t++
					}
				}
				$(".getclassinfo").html(output)
			}, 'json')

		} else if (page === 'account') {
            my_account()
        } else if (page === 'student') {
            list_student()
        } else if (page === 'add-student') {
            $(".parent-input").val(user_details.id)
            add_student(false)
        }
	})
})


$("body").on('click', 'input[class=fee_type]', function () {
    var pay = 0
	if ($(this).is(':checked')) {
		$('input[class=fee_type]:checked').each(function () {
			pay += parseInt($(this).attr('data-v'))
		})
	} else {
        $('input[class=fee_type]:checked').each(function () {
            pay += parseInt($(this).attr('data-v'))
        })
    }
    $(".total_to_pay").html('N'+pay)
    $("input[name=amount]").val(pay)
})


var gClass


function lc (obj) {
	var output
	for (var i in obj) {
    	var hook = obj[i]
    	output += '<option value="'+hook.class_name+'">'+hook.class_name+'</option>'
    }

    return output
}



$.post(path+'user/list-class.html', {school_key: school_key}, function (resp, status, a) {
	gClass = resp
	/*var output = '<li>'+
            '<div class="user-view">'+
                '<div class="background">'+
                    '<img src="../img/office.jpg">'+
                '</div>'+
            '</div>'+
        '</li>'
    for (var i in resp) {
    	var hook = resp[i]
    	output += '<li class="rl no_prce" my-id="'+hook.id+'" my-page="class"><span class="waves-effect"><i class="ti-angle-double-right"></i> '+hook.class_name+'</span></li>'
    }

    $('.load-side-nav').html(output)*/
}, 'json')


function list_student () {
    if (localStorage.getItem('user_details') != null) {

        var user_details = JSON.parse(localStorage.getItem('user_details'))

        $.post(path+'user/get-student.html', {school_key: school_key, id: user_details.id}, function (resp, status, a) {
            if (resp != '') {
                $("body").find(".short-note").html('You have '+resp.length+' students')
                var output = '<p class="my-panel-heading"> All students </p>'
                for (var i in resp) {
                    var hook = resp[i]
                    output += '<p my-fullname="'+hook.fullname+'" my-class="'+hook.class+'" my-page="class" class="rl waves-effect my-panel-body list-group-item">'+
                        '<span><b>Full name: '+hook.fullname+'</b></span><br>'+
                        '<span>Class: '+hook.class+'</span>'+
                    '</p>'
                }
            } else {
                var output = '<br><br><center><h4>No student !</h4>'+
                '<p><button my-page="add-student" class="rl btn btn-wine">Add students</button></p></center><br><br>'
            }
            
            $("body").find(".list-student").html(output)
        }, 'json')
    }
}


list_student()



$("body").on('change', '.student-number', function () {
	var n = $(this).val()
	var output = ''
	for (var i = 0; i < n; i++) {
		output += '<p>Student '+(i+1)+'</p><div class="form-group">'+
                '<input type="text" name="fullname[]" class="form-control" placeholder="Student full name" required="required">'+
            '</div>'+

            '<div class="form-group">'+
                '<select name="class[]" class="form-control" required="required"><option value="">Select class</option>'+lc(gClass)+'</select>'+
            '</div>'
	}
	$(".students-form-fields").html(output)
})



$(".logout").on('click', function () {
	localStorage.removeItem('logg')
	localStorage.removeItem('user_details')
	window.location = '../index.html'
})




