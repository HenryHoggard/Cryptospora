var request;
//Called when the form is submitted
$("#register").submit(function(event) {
  //Abort current request if there is one
  if (request) {
	  request.abort();
  }
  var $form = $(this);
  //Select and cache the fields, then fill variables with the data
  var $inputs = $form.find("input, select, button");
  
  var utf = "%E2%9C%93";
  var token = getToken();
  var email = $('#user_email').val();
  var username = $('#user_username').val();
  var pass = $('#user_password').val();
  //var passconf = $('#user_password_confirm').val();
  var commit = "Continue";
  
  alert("Variables Assigned");
  
  $inputs.prop("disabled", true);
  
  var data = new FormData();
  data.append('utf8',utf);
  data.append('authenticity_token',token);
  data.append('user[email]',email);
  data.append('user[username]',username);
  data.append('user[password]',pass);
  //data.append('user[password_confirmation]',passconf);
  data.append('commit',commit);
  alert(data);
  //Fire request to registration page
  var request = $.ajax({
	  url: 'https://pod.cscf.me/users/sign_up',
	  type: 'post',
	  data: data,
	  processData:false,
	  contentType: false,
	  async: false
  });

  request.always(function() {
	  $inputs.prop("disabled", false);
  });

  event.preventDefault();
});

function getToken(){
  $.ajax({
	  async: false,
	  type: 'GET',
	  url: 'https://pod.cscf.me/users/sign_up',
	  success: function(data) {
		  var matches = data.match(/<meta content="(.*)" name="csrf-token" \/>/); // regex to extract it,
		  tok = matches[1];
		  result = tok;
		  }
	  });
  return result;
}

//danbutch@hotmail.co.uk
