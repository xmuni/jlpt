


var cell_width = 80 + 5;
var cell_height = 70;
var tooltip_height = 100;


var list_cells = document.querySelectorAll(".cell");
var tooltip = document.querySelector(".tooltip");


var description_array = []; // array of kanji tooltips to be fetched from the json file

fetch('file.json')
	.then(response => response.json())
	// .then(jsonResponse => console.log(jsonResponse))
	.then(jsonResponse => description_array = jsonResponse.descriptions)
   // outputs a javascript object from the parsed json

// console.log(description_array);



/*
var dictionary = {};

for(var i = 0; i < description_array.length; i++)
{
    dictionary[description_array[0][0]] = description_array[0][1];
}
*/



for(var i=0; i<list_cells.length; i++)
{
	list_cells[i].addEventListener("click", show_tooltip, false);
	list_cells[i].addEventListener("pointerover", show_tooltip, false);
	list_cells[i].addEventListener("pointerout", hide_tooltip, false);
	// list_cells[i].addEventListener("click", hide_tooltip, false);
}
tooltip.addEventListener("pointerover", hide_tooltip, false);





function show_tooltip()
{
	// var cell_offset = (tooltip_height - cell_height) / 2;
	var position_top  = this.offsetTop - 0;
	var position_left = this.offsetLeft + cell_width;
	// var position_top  = this.getBoundingClientRect().top;
	// var position_left = this.getBoundingClientRect().left + cell_width;

	tooltip.style.display = "block";
	tooltip.style.top = position_top+"px";
	tooltip.style.left = position_left+"px";

	var tooltip_text = get_tooltip(this.innerHTML);
	tooltip.innerHTML = tooltip_text;
	// console.log(tooltip_text);

	// alert(position_top+" "+position_left);
}

function hide_tooltip()
{
	tooltip.style.display = "none"; // or "block"
}

function get_tooltip(text)
{
	for(var i=0; i<description_array.length; i++)
	{
		if(description_array[i][0] == text)
			return description_array[i][1];
	}
	return "No description found";
}
