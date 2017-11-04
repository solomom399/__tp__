
    var path = 'https://pay.freshhopesystems.com/'
    // var path = 'http://localhost/__pay/'
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
                title : '',
                text : '<div class="preloader-wrapper small active">'+
                        '<div class="spinner-layer spinner-red-only">'+
                          '<div class="circle-clipper left">'+
                            '<div class="circle"></div>'+
                          '</div><div class="gap-patch">'+
                            '<div class="circle"></div>'+
                          '</div><div class="circle-clipper right">'+
                            '<div class="circle"></div>'+
                          '</div>'+
                        '</div>'+
                      '</div> '+text,
                html: true,
                showConfirmButton : false
            })
        }


        self.onBackKeyDown = function (e) {
            e.preventDefault();
            var conf = confirm("Are you sure you want to exit this app")
            if(conf){
                navigator.app.exitApp();
            } else {
                alert('Enjoy yourself!');
            }
        }


        self.offline = function () {
            $(".all-page-box").html("<br><br><h4><center>No internet connection!</center></h3>")
        }

        self.online = function () {
            $("li[my-page=student]").trigger('click')
        }


        self.checkNetwork = function () {
            var networkState = navigator.connection.type;

            if (networkState !== Connection.NONE) {
                $(".all-page-box").html("<br><br><h4><center>No internet connection!</center></h3>")
            }
        }
    }

    var my = new MY()

    document.addEventListener("backbutton", my.onBackKeyDown, false);
    /*document.addEventListener("offline", my.offline, false);
    document.addEventListener("online", my.online, false);
    document.addEventListener("deviceready", my.checkNetwork, false);*/
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


function payWithPaystack(name, email, amount, form_object){
            
    var handler = PaystackPop.setup({
	    key: 'pk_test_627b3212869ed34b3c5dee07082de6ece430cd6a',
	    email: email,
	    amount: amount,
	    ref: 'TP'+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
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

            /*formData.append('school_key', school_key)
            formData.append('ref_code', response.reference)*/
            $.ajax({
                url: path+'user/payment.html',
                type: "POST",
                data: $("body").find('.pay').serialize()+'&school_key='+school_key+'&ref_code='+response.reference,
                cache: false,
                dataType: "JSON",
                success: function(resp) {
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
                error: function(a, b, c){
                    swal({
                        title: "",
                        text: 'Something went wrong',
                        html: true,
                        type: 'warning',
                        confirmButtonClass : 'btn btn-danger'
                    })
                }
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


function list_payment () {
    my.load('Processing...')
    var formData = new FormData()
    formData.append('school_key', school_key)

    my.makeUse('user/list-payment.html', formData, function (resp) {
        var output = ''
        if (resp.status != 'error') {
            console.log(resp)
            for (var i in resp.text) {
                var hook = resp.text[i]
                var amount = hook.amount
                output += '<tr>'+
                    '<td>'+amount+'</td>'+
                    '<td>'+hook.date_added+'</td>'+
                    '<td>'+hook.ref_code+'</td>'+
                '</tr>'
            }

            $(".payment_list_table").html(output)
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
}


function news () {
    my.load('Processing...')
    var formData = new FormData()
    formData.append('school_key', school_key)

    my.makeUse('user/news.html', formData, function (resp) {
        var output = ''
        if (resp.status != 'error') {
            var output = ''
            for (var i in resp.text) {
                var hook = resp.text[i]
                output += '<div class="card">'+
                    '<h5 class="card-title">'+hook.news_title+'</h5>'+
                    '<p class="justify">'+hook.news_post+'</p>'+
                    '<p class="clearfix"><span class="pull-right">'+hook.date_added+'</span></p>'+
                '</div>'
            }
            $("body").find(".news").html(output)
            swal.close()
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
}

news()

add_student()

function my_account () {
    var user_details = JSON.parse(localStorage.getItem('user_details'))
    
    $("body").find('.firstname').html('<i class="ti-user"></i> Firstname: '+user_details.firstname)
    $("body").find('.lastname').html('<i class="ti-user"></i> Lastname: '+user_details.lastname)
    $("body").find('.email').html('<i class="ti-inbox"></i> '+user_details.email)
}



$("body").on('click', '.rl', function () {
    
    $(".all-page-box").html('<div class="col-md-12"><div class="preloader-wrapper small active">'+
    '<div class="spinner-layer spinner-red-only">'+
      '<div class="circle-clipper left">'+
        '<div class="circle"></div>'+
      '</div><div class="gap-patch">'+
        '<div class="circle"></div>'+
      '</div><div class="circle-clipper right">'+
        '<div class="circle"></div>'+
      '</div>'+
    '</div>'+
  '</div></div>')
    if (localStorage.getItem('user_details') != null) {

        var user_details = JSON.parse(localStorage.getItem('user_details'))
    }

	var page = $(this).attr('my-page')
	var class_name = $(this).attr('my-class')
    var student_name = $(this).attr('my-fullname')
	$(".all-page-box").load(page+'.html', function () {
        
		$(".rl").sideNav('hide')
        if (page === 'home') {
            news()
            $(".navbar-brand").html('Home')
        } else if (page === 'class') {
            $(".navbar-brand").html('Payment')
			$.post(path+'user/get_s_class.html', {school_key: school_key, class_name: class_name}, function (resp, status, a) {
				
				var output = '<tr><th>Type</th><th>Amount</th></tr>'
				var arr = new Array('School fee', 'PTA', 'Graduation Fee', 'School Event', 'Day Care', 'After School', 'Sportswear - Wednesday', 'Friday')
				var t =0
				$(".class_name").html('Class name: '+resp.class_name)
                $(".student_name").html('Student: '+student_name)
                
                $("input[name=name]").val(user_details.firstname+' '+user_details.lastname)
                
                $("input[name=email]").val(user_details.email)
                $("input[name=parent_id]").val(user_details.id)
                $("input[name=class_name]").val(class_name)
                $("input[name=student_name]").val(student_name)

				for (var i in resp) {
					if (t < arr.length) {
						if (i != 'id' || i != 'class_name') {
							output += '<tr><th>'+arr[t]+'</th><td>'+resp[i]+'</td><td><input type="checkbox" class="fee_type" data-v="'+resp[i]+'" name="'+i+'" value="'+resp[i]+'"></td></tr>'
                            var ac = 0
						}
                        
						t++
					}
				}
                output += '<tr><th>Application charges</th><td class="appc">N0.00</td></tr>'
				$(".getclassinfo").html(output)
                $("body").on('submit', '.pay', function () {
                    //$(".pay_load").html('Loading payment form...')
                    my.load('Loading payment form...')
                    var name = $(this).find('#name').val()
                    var email = $(this).find('#email').val()
                    var amount = parseInt($(this).find('#amount').val())+parseInt($(this).find('#app_charges').val())
                    var formData = new FormData($(this))
                    payWithPaystack(name, email, amount+'00', formData)
                    return false  
                })
			}, 'json')

		} else if (page === 'account') {
            my_account()
            $(".navbar-brand").html('Account')
        } else if (page === 'student') {
            list_student()
            $(".navbar-brand").html('Students')
        } else if (page === 'add-student') {
            $(".parent-input").val(user_details.id)
            add_student(false)
            $(".navbar-brand").html('Add Students')
        } else if (page === 'payment-history') {
            list_payment()
            $(".navbar-brand").html('All Payment')
        } else {
            news()
            $(".navbar-brand").html('Home')
        }

        swal.close()
	})
})


$("body").on('click', 'input[class=fee_type]', function () {
    var pay = 0.00
    var ac = 0.00
	if ($(this).is(':checked')) {
		$('input[class=fee_type]:checked').each(function () {
			pay += parseInt($(this).attr('data-v'))
            ac += (1/100) * parseInt($(this).attr('data-v'))
		})
	} else {
        $('input[class=fee_type]:checked').each(function () {
            pay += parseInt($(this).attr('data-v'))
            ac += (1/100) * parseInt($(this).attr('data-v'))
        })
    }

    if ($('input[class=fee_type]:checked').length === $('input[class=fee_type]').length) {
        $("input[name=check_all]").val('1')
    } else {
        $("input[name=check_all]").val('0')
    }

    $(".total_to_pay").html('N'+(pay+ac).formatMoney(2, '.', ','))
    $(".appc").html('N'+ac.formatMoney(2, '.', ','))
    $("input[name=app_charges]").val(ac)
    $("input[name=amount]").val(pay)
})


var gClass


function lc (obj) {
	var output
	for (var i in obj.text) {
    	var hook = obj.text[i]
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
        my.load('Loading students...')
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
                swal.close()
            } else {
                var output = '<br><br><center><h4>No student !</h4>'+
                '<p><button my-page="add-student" class="rl btn btn-wine">Add students</button></p></center><br><br>'
            }
            
            $("body").find(".list-student").html(output)
        }, 'json')
    }
}


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




