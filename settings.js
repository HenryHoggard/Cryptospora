
$(function () {
$('#mytabs a').tab('show');
});


//$('#gentab a').click(function (e) {
//e.preventDefault();
//$(this).tab('show');
//})

//$('#advtab a:last').click(function (e) {
//  e.preventDefault();
//  $(this).tab('show');
//})

window.onload = function() {
	document.getElementById('saveset').onclick = function () {
		restyle();
	}
	
	document.getElementById('clearcache').onclick = function () {
		clearcache();
	}
	
	document.getElementById('renkey').onclick = function () {
		renewkey();
	}
};

function restyle() {
    
    var elm = $('p.intro, p.ending');  
     
	var s1 = document.getElementById('fontsize');
	var size = s1.options[s1.selectedIndex].value;
	
	var s2 = document.getElementById('fontstyle');
	var style = s2.options[s2.selectedIndex].value;
	
	alert("Set font style to " + style + " and font size to " +size);

    elm.css({'fontSize' : size});

	elm.css({'font-family' : style});

	//location.reload(true);
    
	$('body').css("fontSize", size);
	$('body').css("font-family", style);
};

function clearcache() {
	
	$.ajax({
		url:'delete.php',
		data:'cache.txt',
		method:'GET',
		success:function(response){
			if (response === 'deleted'){
				alert('Deleted !!');
			}
		}
    });
};
