document.getElementById("add_options").addEventListener('click', () => {
	let new_div = document.createElement("div");
	new_div.appendChild(document.createElement('input'))
	new_div.firstElementChild.setAttribute('type', 'text');
	new_div.firstElementChild.setAttribute('name', 'option');
	new_div.firstElementChild.classList.add('options_input');
	inputs.appendChild(new_div);
})

document.getElementById("delete_options").addEventListener('click', () => {
	if (inputs.childElementCount > 1)
		inputs.removeChild(inputs.lastElementChild);
})

document.getElementById("clear_options").addEventListener('click', () => {
	div.innerHTML = globals.current_text;
	reset_div();
})

document.getElementById("done").addEventListener('click', () => {
	let values = document.querySelectorAll("#inputs > div > input");
	let selectOptions = [];

	let count = 0;
	for (let i = 0; i < values.length; ++i)
	{
		if (values[i].value != "")
		{
			selectOptions.push(values[i].value);
			++count;
		}
	}
	if (count <= 0)
		alert("You need to have at least one option");
	else
	{
		let { startIndex, endIndex, initial } = globals;
		if (startIndex > endIndex)
			[ startIndex, endIndex ] = [ endIndex, startIndex ];

		result.push( { startIndex, endIndex, selectOptions, initial } );
		reset_div();
	}
})
