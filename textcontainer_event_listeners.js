div.addEventListener('mouseup', (e) => {
	if (options.style.display == "none")
	{
		globals = { current_text: globals.current_text };
		let start = getSelection().anchorOffset;
		let end = getSelection().extentOffset;

		if (start > end)
			[ start, end ] = [ end, start ];

		if (start != end && !alreadySelected(start, end))
		{
			options.style.display = "block"
			
			let val = e.target.textContent.substring(start, end)
			
			globals.options = {};
			globals.endIndex = JSON.parse(JSON.stringify(end)); // deep copying again
			globals.startIndex = JSON.parse(JSON.stringify(start));
			globals.initial = val;
			
			let htmlCopy = (' ' + e.target.innerText).slice(1);
			
			e.target.innerText = htmlCopy.substring(0, start) + "_".repeat(Math.abs(end - start)) + htmlCopy.substring(end, htmlCopy.length);
			globals.current_text = htmlCopy;
			
			inputs.firstElementChild.firstElementChild.value = val;
		}
	}
})

document.getElementById('update_text').addEventListener('click', (e) => {
	let new_text = document.getElementById('new_text');

	if (confirm("Are you sure? This will clear all current selections") && new_text.value)
	{
		reset_div();
		result = [];
		div.innerText = new_text.value;
		text_to_store = new_text.value;

		globals.current_text = new_text.value;
		new_text.value = ""
	}
})

document.getElementById("reset").addEventListener('click', () => {
	if (confirm("Are you sure?"))
	{
		div.innerHTML = text_to_store;
		options.style.display = 'none';
		result = [];
		globals = { current_text: globals.current_text };
	}
})

document.getElementById("upload").addEventListener('click', () => {
	let to_print = [];

	if (result.length == 0)
		return ;

	for (let i of result)
	{
		let { startIndex, endIndex, ...newObj } = i;
	
		to_print.push(newObj);
	}
	if (confirm(`Uploading the result: ${JSON.stringify(to_print, null, 2)}`))
	{
		reset_div();
		localStorage.setItem("replace_options", JSON.stringify(result));
		localStorage.setItem("user_text", text_to_store);
		result = [];
		div.innerHTML = text_to_store;
	}
})
