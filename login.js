$(function() {

	$('#commit').click(function() { // press Login

	  var username = $('#username').val();
	  var password = $('#password').val();   	  
	
	  
	  // get an authenticity token
	  function getToken() 
		{ 
		$.ajax
		({
		async: false,
		type: 'GET',
		url: 'https://pod.cscf.me/users/sign_in',
		success: function(data) 
		{
		var matches = data.match(/<meta content="(.*)" name="csrf-token" \/>/); // regex to extract it,
		// if there are no matches, it must be a self message 
		tok = matches[1];
		result = tok;
		}
		});	
		return result;
		}
		
	    var authenticity_token = getToken();
		//alert(authenticity_token);
		//alert(username);
		//alert(password);
	 // utf8=%E2%9C%93&authenticity_token=JVMo0sD9Qww93i58KCe98vrrZpuHKqYQ4CPO8RMFXAc%3D&user%5Busername%5D=sam&user%5Bpassword%5D=worth22&commit=Sign+in
	  
	  
	  //var pod = document.getElementsByName('podName');
	  
	   if (username.value == "") {
			$('#loginError').fadeOut();
			$('#loginError').empty();
			$('#loginError').append('<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert">&times;</button>Please enter an email address!</div>');
			$('#loginError').fadeIn();
	   }
	   else if (password.value == "") {
			$('#loginError').fadeOut();
			$('#loginError').empty();
			$('#loginError').append('<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert">&times;</button>Please enter a password</div>');
			$('#loginError').fadeIn();
	   }
	   // if all data is present...
	   else{
		   
			 //post the login details
			var dataToSend = 'authenticity_token=' + authenticity_token +'&user[username]=' + username +'&user[password]='+ password + '&commit=Sign+in';
			 var dataToSend2 = JSON.stringify(dataToSend);
			//alert(dataToSend2);
					//var dataToSend = 'utf8=E29C93&authenticity_token=Wpy61blxjdZx3K8tB9aArqUZOaBwfl5eCBNNM235j34=&user[username]=sam&user[password]=worth22&commit=Sign+in';
					//alert (dataToSend);
					 $.ajax({                
					   url: "https://pod.cscf.me/users/sign_in", 
					   type: "POST",
					   data: dataToSend,     
					   cache: false,
					   
						success: function(php_output) {
							 //$("#testDummy").html(php_output);
							// check if login was successfull
							var loginMsg = php_output.match(/Invalid email or password./);
							var outputErrorMsg="Invalid email or password.";
							if(loginMsg == outputErrorMsg){
								$('#loginError').fadeOut();
								$('#loginError').empty();
								$('#loginError').append('<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert">&times;</button>Invalid username or password!</div>');
								$('#loginError').fadeIn();
							}

							var SuccessfullloginMsg = php_output.match(/Signed in successfully./);
							var goodLoginMsg="Signed in successfully.";
							if(SuccessfullloginMsg == goodLoginMsg){
								// go to inbox page
								window.location.replace("inbox.html");
							}
							
				   },
						
					error: function(){
						$('#loginError').fadeOut();
						$('#loginError').empty();
						$('#loginError').append('<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert">&times;</button>Connection Error. Contact Support or restart extention.</div>');
						$('#loginError').fadeIn();
				
					}
			
					}); 
        
	
		}
		
	  return false;
	});
	
});
