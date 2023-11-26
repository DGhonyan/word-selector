const DEFAULT_USER_TEXT = "This is the default text of the application that can be changed using the admin page."

let replace_options = localStorage.getItem("replace_options");
replace_options = replace_options ? JSON.parse(replace_options) : [ { startIndex: 0, endIndex: 4, selectOptions: [ "hello", "This" ], initial: "This" } ];

let user_text = localStorage.getItem("user_text");

if (!user_text)
	user_text = DEFAULT_USER_TEXT;

let select = document.getElementById("select");

let selectArr = [];
let finalString = "";

function pushSelect(opt)
{
	let newSelect = createSelection(opt.options);
	selectArr[opt.index] = (newSelect)
	select.append(newSelect);
}

function appendSpan(user_text, index)
{
	let sp = document.createElement("span");
	sp.innerText = user_text[index];

	select.appendChild(sp);
}

function iterateUserText(user_text, trueCallback, falseCallback)
{
	for (let i = 0; i < user_text.length; i++)
	{
		let opt = findStartIndex(i);
	
		if (opt)
		{
			trueCallback(opt);

			i = opt.endindex - 1;
		}
		else
		{
			if (falseCallback)
				falseCallback(user_text, i);
		}
	}
}

function findStartIndex(index)
{
	for (let i in replace_options)
	{
		if (index == replace_options[i].startIndex)
			return { index: i, endindex: replace_options[i].endIndex, options: replace_options[i].selectOptions };
	}
	return null;
}

function createSelection(options)
{
	let selectEl = document.createElement("select");
	
	let disabled = document.createElement("option");
	disabled.setAttribute("disabled", "");
	disabled.setAttribute("selected", "");
	disabled.setAttribute("value", "");
	disabled.style.display = "none";

	disabled.innerText = "_".repeat(options[0].length);

	selectEl.appendChild(disabled);
	for (let j of options)
	{
		let opt = document.createElement("option");
		opt.innerHTML = j;
		selectEl.appendChild(opt);
	}

	return selectEl;
}

iterateUserText(user_text, pushSelect, appendSpan);

function concatToFinal(opt) {
	finalString = finalString.concat(selectArr[opt.index].value);
}

function concatToFinalText(user_text, index) {
	finalString = finalString.concat(user_text[index]);
}

function base64EncodeUnicode(str) {
	utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
		return String.fromCharCode('0x' + p1);
	});

	return btoa(utf8Bytes);
}

document.getElementById("base_button").addEventListener('click', () => {
	for (const i of selectArr) {
		if (i.value == "")
		{
			alert("You're not done yet!");
			return ;
		}
	}

	iterateUserText(user_text, concatToFinal, concatToFinalText);
	let base64 = base64EncodeUnicode(finalString);
	
	navigator.clipboard.writeText(base64);

	alert("Copied to clipboard!");

	finalString = "";
})