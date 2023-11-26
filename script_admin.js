let div = document.getElementById("user_text");
let options = document.getElementById("options");
let inputs = document.getElementById("inputs");
let buttons = document.getElementById("buttons");

let result = [];

options.style.display = "none";

div.innerHTML = localStorage.getItem("user_text") || "This is the default text of the application that can be changed using the admin page.";

let text_to_store = (' ' + div.innerText).slice(1); // making a deep copy
let globals = { current_text: text_to_store };

function reset_div()
{
	while (inputs.childElementCount != 1)
		inputs.removeChild(inputs.lastChild);
	options.style.display = 'none';
	getSelection().empty()
}

// don't allow selecting the same words twice
function alreadySelected(start, end)
{
	if (start > end)
		[ start, end ] = [ end, start ];

	for (let i of result)
	{
		if ((start >= i.startIndex && start < i.endIndex)
			|| (end > i.startIndex && end < i.endIndex)
			|| (start < i.startIndex && end >= i.endIndex))
		{
			alert("Area already selected");
			getSelection().empty();	
			return true;
		}
	}
	return false;
}
