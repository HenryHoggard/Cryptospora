$(function() {
	$('#goLogin').click(function() { // press Login
	  var username = document.getElementsByName('username');
	  var password = document.getElementsByName('password');
	  
	   if (username == "") {
		$('#loginError').fadeOut();
		$('#loginError').empty();
		$('#loginError').append('<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert">&times;</button>Please enter an email address!</div>');
		$('#loginError').fadeIn();
	   }
	   else if (password == "") {
		$('#loginError').fadeOut();
		$('#loginError').empty();
		$('#loginError').append('<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert">&times;</button>Please enter a password</div>');
		$('#loginError').fadeIn();
	   }
	   // if all data is present...
	   else{
	  //post the login details
		$.ajax
		({
			type: "POST",
			//the url where you want to sent the userName and password to
			url: 'https://joindiaspora.com/users/sign_in',
			dataType: 'json',
			async: false,
			//json object to sent to the authentication url
			data: '{"userName": "' + username + '", "password" : "' + password + '"}',
			success: function () {
				alert('We did it bruv!');
			},
			error: function(){
				$('#loginError').fadeOut();
				$('#loginError').empty();
				$('#loginError').append('<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert">&times;</button>We could not log you in. Check that your details are correct.</div>');
				$('#loginError').fadeIn();
			}
			
			
		});
		}
		
	  return false;
	});
});