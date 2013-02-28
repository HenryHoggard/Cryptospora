$(function() {
	$('#commit').click(function() { // press Login
	  var username = document.getElementsByName('username');
	  var password = document.getElementsByName('password');
	  var authenticity_token = "JDlyQt7+1jREHTcv5woaimR/84kPupJmklYVbUg6dAA=";
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
		  
		  
		/*$.getJSON("https://pod.cscf.me/users/sign_in.json", function(json) {
        $.each(json, function(username,password) {
				console.log("username: ", username, "password: ", password,);
				content +="<div class=\"accordion-group\"><div class=\"accordion-heading\"><a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion2\" href=\"#" + arrayID + "\">";
                content += Contact.name + "</a></div>";
				content += "<div id=" + "\"" + arrayID + "\"" + " class=\"accordion-body collapse\"><div class=\"accordion-inner\">";
				content += "<form><fieldset><a class=\"btn pull-right\" id=\"" + Contact.handle + "\">Message</a><br />Groups:<div class=\"alert alert-success\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>Work</div><div class=\"alert alert-success\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>Uni</div>Add to Group: <input type=\"text\" class=\"span9\"></fieldset></form><a class=\"btn btn-danger\">Delete Contact</a>";
				content += "</div></div></div>";
			

        });*/
        
        
		$.ajax
		({
			type: "POST",
			//the url where you want to sent the userName and password to
			url: 'https://pod.cscf.me/users/sign_in',
			dataType: 'json',
			async: false,
			//json object to sent to the authentication url
			data: '{"authenticity_token" :"' + authenticity_token + '"user[username]": "' + username + '", "user[password]" : "' + password + '", "authenticity_token" :"' + authenticity_token + '", "commit" : Sign In"' +'"}',
			success: function () {
				$('#testDummy').append('login works');
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
