// A personality quiz

// This is an array of objects that stores the personality trait that is prompted to the user and the weight for each prompt.
// If a personality trait is considered no anxiety, it will have a negative weight.
// If a personlity trait is considered sevre anxiety, it will have a positive weight.

var prompts = [
{
	prompt: 'Pounding heart',
	weight: -1,
	class: 'group0'
},
{
	prompt: 'Sweating',
	weight: -1,
	class: 'group1'
},
{
	prompt: 'Trembling or shaking',
	weight: -1,
	class: 'group2'
},
{
	prompt: 'Shortness of breath',
	weight: -1,
	class: 'group3'
},
{
	prompt: 'I choose my friends carefully',
	weight: -1,
	class: 'group4'
},
{
	prompt: 'Afraid or scared',
	weight: -1,
	class: 'group5'
},
{
	prompt: 'Chest pain or discomfort',
	weight: 1,
	class: 'group6'
},
{
	prompt: 'Feeling dizy or unsteady',
	weight: 1,
	class: 'group7'
},
{
	prompt: 'Fear of losing control',
	weight: 1,
	class: 'group8'
},
{
	prompt: 'Fear of dying',
	weight: 1,
	class: 'group9'
},
{
	prompt: 'Feeling lightheaded or faint',
	weight: 1,
	class: 'group10'
},
{
	prompt: 'Irritable or difficulty sleeping',
	weight: 1,
	class: 'group11'
}


]

// This array stores all of the possible values and the weight associated with the value.
var prompt_values = [
{
	value: 'Usually',
	class: 'btn-default btn-usually',
	weight: 5
},
{
	value: 'Often',
	class: 'btn-default btn-often',
	weight: 3,
},
{
	value: 'Sometimes',
	class: 'btn-default',
	weight: 0
},
{
	value: 'Rarely',
	class: 'btn-default btn-rarely',
	weight: -3
},
{
	value: 'Never',
	class: 'btn-default btn-strongly-never',
	weight: -5
}
]

// For each prompt, create a list item to be inserted in the list group
function createPromptItems() {

	for (var i = 0; i < prompts.length; i++) {
		var prompt_li = document.createElement('li');
		var prompt_p = document.createElement('p');
		var prompt_text = document.createTextNode(prompts[i].prompt);

		prompt_li.setAttribute('class', 'list-group-item prompt');
		prompt_p.appendChild(prompt_text);
		prompt_li.appendChild(prompt_p);

		document.getElementById('quiz').appendChild(prompt_li);
	}
}

// For each possible value, create a button for each to be inserted into each li of the quiz
// function createValueButtons() {

// 	for (var li_index = 0; li_index < prompts.length; li_index++) {
// 		for (var i = 0; i < prompt_values.length; i++) {
// 			var val_button = document.createElement('button');
// 			var val_text = document.createTextNode(prompt_values[i].value);

// 			val_button.setAttribute('class', 'value-btn btn ' + prompt_values[i].class);
// 			val_button.appendChild(val_text);

// 			document.getElementsByClassName('prompt')[li_index].appendChild(val_button);
// 		}
// 	}
// }
function createValueButtons() {
	for (var li_index = 0; li_index < prompts.length; li_index++) {
		var group = document.createElement('div');
		group.className = 'btn-group btn-group-justified';

		for (var i = 0; i < prompt_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'btn-group';

			var button = document.createElement('button');
			var button_text = document.createTextNode(prompt_values[i].value);
			button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
			button.appendChild(button_text);

			btn_group.appendChild(button);
			group.appendChild(btn_group);

			document.getElementsByClassName('prompt')[li_index].appendChild(group);
		}
	}
}

createPromptItems();
createValueButtons();

// Keep a running total of the values they have selected. If the total is negative, the user have no anxiety. If positive, user have severe anxiety
// Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
var total = 0;

// Get the weight associated to group number
function findPromptWeight(prompts, group) {
	var weight = 0;

	for (var i = 0; i < prompts.length; i++) {
		if (prompts[i].class === group) {
			weight = prompts[i].weight;
		}
	}

	return weight;
}

// Get the weight associated to the value
function findValueWeight(values, value) {
	var weight = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}

	return weight;
}

// When user clicks a value to usuall/never with the prompt, display to the user what they selected
$('.value-btn').mousedown(function () {
	var classList = $(this).attr('class');
	// console.log(classList);
	var classArr = classList.split(" ");
	// console.log(classArr);
	var this_group = classArr[0];
	// console.log(this_group);

	// If button is already selected, de-select it when clicked and subtract any previously added values to the total
	// Otherwise, de-select any selected buttons in group and select the one just clicked
	// And subtract deselected weighted value and add the newly selected weighted value to the total
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	} else {
		// $('[class='thisgroup).prop('checked', false);
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
		// console.log($('.'+this_group+'.active').text());
		$('.'+this_group).removeClass('active');

		// console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
		// $(this).prop('checked', true);
		$(this).addClass('active');
		total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	}

	console.log(total);
})



$('#submit-btn').click(function () {
	// After clicking submit, add up the totals from answers
	// For each group, find the value that is active
	$('.results').removeClass('hide');
	$('.results').addClass('show');

	if(total < 0) {
		document.getElementById('results').innerHTML = '<b>You have moderate anxiety</b><br>You need treatment by specialists. Be patient, you can get well.';
	} else if(total > 0) {
		document.getElementById('results').innerHTML = 	'<b>You have severe anxiety.</b><br>Please get help by referring to any specialists. You need someone to help and listen to.I belived you can do it!!';

	} else {
		document.getElementById('results').innerHTML = 	'<b>You have no anxiety</b>';
	}

	// Hide the quiz after they submit their results
	$('#quiz').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-btn').removeClass('hide');
})

// Refresh the screen to show a new quiz if they click the retake quiz button
$('#retake-btn').click(function () {
	$('#quiz').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-btn').addClass('hide');

	$('.results').addClass('hide');
	$('.results').removeClass('show');
})
