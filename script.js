



var cell_width = 50 + 1;
var cell_height = 50;
var tooltip_height = 100;

var tooltip = document.querySelector(".tooltip");

var descriptions = {};




/******** MAIN *******/


	fetch('meanings.json')
		.then(response => response.json())
		.then(function(data) { descriptions = data } );


	var list_cells = document.querySelectorAll(".cell");
	for(var i=0; i<list_cells.length; i++)
	{
		list_cells[i].addEventListener("click", show_tooltip, false);
		list_cells[i].addEventListener("pointerover", show_tooltip, false);
		list_cells[i].addEventListener("pointerout", hide_tooltip, false);
		// list_cells[i].addEventListener("click", hide_tooltip, false);
	}
	tooltip.addEventListener("pointerover", hide_tooltip, false);
	tooltip.addEventListener("click", hide_tooltip, false);


	var update_buttons = document.querySelectorAll(".button_update");
	for(var i=0; i<update_buttons.length; i++)
	{
		update_buttons[i].addEventListener("click", update, false);
	}




/****** END MAIN *****/






function update()
{
	var cols = document.querySelector("#input_cols").value;
	var rows = document.querySelector("#input_rows").value;

	var grid = document.querySelector("#grid");
	grid.style.gridTemplateColumns = "repeat("+cols+", 70px)";
	grid.style.gridTemplateRows = "repeat("+rows+", 70px)";

	var kanji = document.querySelector("#input_kanji").value;
	console.log(kanji);
	var all_cells = document.querySelectorAll(".cell");
	for(var i=0; i<all_cells.length; i++)
	{
		if(i < kanji)
		{
			all_cells[i].style.display = "block";
		}
		else if(all_cells[i].innerHTML != "")
		{
			all_cells[i].style.display = "none";
		}
	}

}






function show_tooltip()
{
	// var cell_offset = (tooltip_height - cell_height) / 2;
	var position_top  = this.offsetTop - 1;
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
