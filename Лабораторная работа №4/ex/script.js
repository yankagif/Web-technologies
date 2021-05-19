$(function(){
		$( "#accordion" ).accordion({
		collapsible: true
		}); 
	});

$(function(){
		var availableTags = [
		"Java",
		"JavaScript",
		"PHP",
		"C++",
		"C#",
		"Perl",
		"Python",
		"Ruby",
		"COBOL",
		"Basic"
		];

		$( "#search" ).autocomplete({
		source: availableTags
		}); 
	});

$(function(){
		$( "#date" ).datepicker({
	dateFormat: "dd.mm.yy"
	});
	});

$(function(){
$('#dialog').dialog({
	autoOpen: false,
	show: {effect: "slideDown", duration: 800},
	hide: {effect: "slideUp", duration: 800},
});
$('#open').click(function(){
$('#dialog').dialog('open');
});
}); 

$(function(){
$("#select").selectmenu();
});

$(function(){
$('#menu').menu();
}); 

$(function(){
$('#slider').slider({
	range: true,
	min: 0,
	max: 1000,
	step: 10,
	values: [50, 500],
	slide: function(event, ui){
		$('#start').val(ui.values[0]);
		$('#end').val(ui.values[1]);
	}
});
$('#start').val($('#slider').slider('values', 0));
$('#end').val($('#slider').slider('values', 1));
});

$(function(){
$("td.td_top a").tooltip();
$('#tabs').tabs({ 
	show: { effect: "fade",duration: 300 }, 
	hide: { effect: "fade",duration: 300 },
});
}); 

$(function(){
$('#sort').sortable(); 
});

$(function(){
$('.draggable').draggable({
axis: "x"
});
}); 
