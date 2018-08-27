


var cell_width = 70 + 0;
var cell_height = 70;
var tooltip_height = 100;


var list_cells = document.querySelectorAll(".cell");
var tooltip = document.querySelector(".tooltip");


var descriptions = {};

fetch('meanings.json')
	.then(response => response.json())
	.then(function(data) { descriptions = data } );
	// .then(response => response.json())
	// .then(jsonResponse => console.log(jsonResponse))
	// .then(jsonResponse => descriptions = jsonResponse)
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

	var kanji = this.innerHTML;
	// console.log(this.innerHTML);
	// console.log(descriptions);
	// console.log(descriptions.hasOwnProperty(this.innerHTML));
	// console.log(JSON.stringify(descriptions[this.innerHTML]));

	if(descriptions.hasOwnProperty(kanji))
	{
		var tooltip_text = get_tooltip(kanji);
		tooltip.innerHTML = tooltip_text;
		tooltip.style.display = "block";
		tooltip.style.top = position_top+"px";
		tooltip.style.left = position_left+"px";
	}
}

function hide_tooltip()
{
	tooltip.style.display = "none"; // or "block"
}

function get_tooltip(kanji)
{
	var meaning = descriptions[kanji][0];
	var reading = descriptions[kanji][1];
	
	return meaning+"</br></br>"+reading;
}
