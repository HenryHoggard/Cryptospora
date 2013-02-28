$(function() {
	$('#commit').click(function() { // press Login
	  var username = $('#username').val();
	  var password = $('#password').val();   	  
	 //var username = document.getElementsByName('username');
	 //var password = document.getElementsByName('password');
	 //var username = JSON.stringify(username);
	 //var password = JSON.stringify(password);
	  //alert(username);
	 // alert(password);
	  //var username = "Sam";
	  //var password = "worth22";
	  //var authenticity_token = "taMUOrX1Q4Cx9wBXQ+6bRo9Ssw+scxxWD+HrScXArR0=";
	  //var utf8 = "E29C93";
	  
	  
	  
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
			alert(dataToSend2);
					//var dataToSend = 'utf8=E29C93&authenticity_token=Wpy61blxjdZx3K8tB9aArqUZOaBwfl5eCBNNM235j34=&user[username]=sam&user[password]=worth22&commit=Sign+in';
					//alert (dataToSend);
					 $.ajax({                
					   url: "https://pod.cscf.me/users/sign_in", 
					   type: "POST",
					   data: dataToSend,     
					   cache: false,
					   
					   /*success: function (phpOutput) {
							//$('#testDummy').append('login works');
							jQuery('#testDummy').append('<h2>Test Phase Complete.</h2><h2>Please Wait...</h2><img src="loader.gif" title="Working..."/>');
						},*/
						success: function(php_output) {
					   $("#testDummy").html(php_output);
				   },
						
					error: function(){
						$('#loginError').fadeOut();
						$('#loginError').empty();
						$('#loginError').append('<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert">&times;</button>We could not log you in. Check that your details are correct.</div>');
						$('#loginError').fadeIn();
				
					}
			
					}); 
		
		
        
		/*$.ajax
		({
			type: "POST",
			//the url where you want to sent the userName and password to
			url: 'http://pod.cscf.me/users/sign_in',
			dataType: 'json',
			async: false,
			//json object to sent to the authentication url
			data: '{"user[username]": "' + username + '", "user[password]" : "' + password + '", "authenticity_token" :"' + authenticity_token + '", "commit" : Sign In"' +'"}',
			success: function () {
				$('#testDummy').append('login works');
			},
			error: function(){
				
				$('#loginError').fadeOut();
				$('#loginError').empty();
				$('#loginError').append('<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert">&times;</button>We could not log you in. Check that your details are correct.</div>');
				$('#loginError').fadeIn();
				
			}
			

			
		});*/
		}
		
	  return false;
	});
});
