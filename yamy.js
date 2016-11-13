function recalculate() {
	var a = 0;
	var b = 0;
	var r = 0;
	var bonus = false

	$('td.selected').each(function(){
		var value = parseInt($(this).text());
		a += value;
		r += 1;
	});
	$('tr.disabled').each(function(){
		r += 1;
	});

	if (a > 52) 
		bonus = true;

	$('.button.selected').each(function(){
		var value = parseInt($(this).find('.points').first().text());
		b += value;
		r += 1;
	});
	$('.button.disabled').each(function(){
		r += 1;
	});

	var textA = (bonus) ? (a + ' + 40') : a;
	var textB = b;
	var textSum = (bonus) ? (a + b + 40) : (a + b);

	$('#result-round').text(r + '/12');
	$('#result-a').text(textA);
	$('#result-b').text(textB);
	$('#result-sum').text(textSum);
};

function loadState() {
	var state = $.cookie('state');
	if (state) {
		$.each(state.selected, function( index, value ){
			$('#' + value).addClass('selected');
		});
		$.each(state.disabled, function( index, value ){
			$('#' + value).addClass('disabled');
		});
	}
}

function saveState() {
	var state = { 
		selected: $('.selected').map(function(index) { return this.id; }),
		disabled: $('.disabled').map(function(index) { return this.id; }) 
	}
	$.cookie('state', state);
}

function resetState() {
	$('.selected').removeClass('selected');
	$('.disabled').removeClass('disabled');
	saveState();
	recalculate();
}

$(function() {
	$.cookie.json = true;

	$('#reset-button').on('click', function() {
		resetState();
	});

	$('.button').on('click', function() {
		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			$(this).addClass('disabled');
		} 
		else if ($(this).hasClass('disabled')) {
			$(this).removeClass('disabled');
		}
		else {
			$(this).addClass('selected');
		}

		saveState();
		recalculate();
	});
	
	$('#left tr:not(:first-child) td:first-child').on('click', function() {
		if ($(this).parent().hasClass('disabled')) {
			$(this).parent().removeClass('disabled');
		} 
		else {
			$(this).parent().addClass('disabled');
			$(this).siblings().removeClass('selected');
		}

		saveState();
		recalculate();
	});

	$('#left tr:not(:first-child) td:not(:first-child)').on('click', function() {
		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
		} 
		else {
			$(this).parent().removeClass('disabled');
			$(this).addClass('selected');
			$(this).siblings().removeClass('selected');
		}

		saveState();
		recalculate();
	});

	loadState();
	recalculate();
});