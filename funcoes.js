var start_time, pause_time, loop, running;

jQuery(document).ready(function(){
	jQuery(document).bind('keyup', { 'combi':'Space', 'disableInInput':true } , function(evt) {
		if (running)
			unstart();
		else
			startCounting();
		return false;
	});

	jQuery(document).bind('keyup', { 'combi':'ESC', 'disableInInput':true } , function(evt) {
		clear();
		return false;
	});
});

function startCounting() {
	running = true;
	start_time = typeof(pause_time) == 'undefined' ? new Date() : new Date(new Date() - pause_time);

	jQuery('#start_button').hide();
	jQuery('#stop_button').show();

	loop = window.setInterval("update()", 1);
}

function update() {
	printTime(format_seconds(getTime()));
}

function printTime(time){
	jQuery('#difference').text(time);
}

function getTime(){
	return (new Date() - start_time);
}

function format_seconds(seconds) {
	if(isNaN(seconds))
		seconds = 0;

	var diff = new Date(seconds);
	var minutes = diff.getMinutes();
	var seconds = diff.getSeconds();
	var milliseconds = diff.getMilliseconds();

	if (minutes < 10)
		minutes = "0" + minutes;
	if (seconds < 10)
		seconds = "0" + seconds;

	if (milliseconds < 10)
		milliseconds = "00" + milliseconds;
	else if (milliseconds < 100)
		milliseconds = "0" + milliseconds;

	document.title = minutes + ":" + seconds + ":" + milliseconds + " - Cron&ocirc;metro Online";
	return minutes + ":" + seconds + ":" + milliseconds;
}

function unstart() {
  pause_time = getTime();
	clearInterval(loop);
  running = false;

	jQuery('#start_button').show();
	jQuery('#stop_button').hide();
}

function clear() {
	unstart();
	pause_time = undefined;
	jQuery('#difference').text(format_seconds(0));
}