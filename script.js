



var tooltip_offset_x = 50 + 1;
var tooltip_offset_y = 0;

var tooltip = document.querySelector("#tooltip");

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
	}
	tooltip.addEventListener("pointerover", hide_tooltip, false);
	tooltip.addEventListener("click", hide_tooltip, false);


	var update_buttons = document.querySelectorAll(".button_update");
	for(var i=0; i<update_buttons.length; i++)
	{
		update_buttons[i].addEventListener("click", update, false);
	}

	var cell_random_n5 = document.querySelector("#random_n5");
	var cell_random_n4 = document.querySelector("#random_n4");
	var cell_random_n3 = document.querySelector("#random_n3");
	var button_random_n5 = document.querySelector("#randomize_n5");
	var button_random_n4 = document.querySelector("#randomize_n4");
	var button_random_n3 = document.querySelector("#randomize_n3");
	button_random_n5.addEventListener("click", function() { cell_random_n5.innerHTML = get_random_kanji("n5") }, false);
	button_random_n4.addEventListener("click", function() { cell_random_n4.innerHTML = get_random_kanji("n4") }, false);
	button_random_n3.addEventListener("click", function() { cell_random_n3.innerHTML = get_random_kanji("n3") }, false);



	// var button_random_kanji = document.querySelector("#button_random_kanji");
	// button_random_kanji.addEventListener("click", get_random_kanji_from_checkbox, false);





/****** END MAIN *****/




function get_random_kanji(cell_class)
{
	var cells = document.querySelectorAll("."+cell_class);

	var kanji = "";
	while(kanji == "")
	{
		random_index = Math.floor(Math.random() * (cells.length + 1));
		kanji = cells[random_index].innerHTML;
	}

	return kanji;
}

/*
function get_random_kanji_from_checkbox()
{
	var checkbox_n5 = document.querySelector("#checkbox_n5");
	var checkbox_n4 = document.querySelector("#checkbox_n4");
	var checkbox_n3 = document.querySelector("#checkbox_n3");

	var cells;

	if(checkbox_n5.checked)
		cells = document.querySelectorAll(".n5");


}
*/


function set_tooltip_offsets()
{
	var tooltip_menu = document.querySelector("#tooltip_menu");
	var position = tooltip_menu.value;

	if(position == "right")
	{
		tooltip_offset_x = 50 + 1;
		tooltip_offset_y = 0;
	}
	else if(position == "left")
	{
		tooltip_offset_x = -1 -tooltip.clientWidth;
		tooltip_offset_y = 0;
	}
	else if(position == "top")
	{
		tooltip_offset_x = 0;
		tooltip_offset_y = -1 -tooltip.clientHeight;
	}
	else if(position == "bottom")
	{
		tooltip_offset_x = 0;
		tooltip_offset_y = 50 + 1;
	}

	else
	{
		console.log("Error. Tooltip position not recognized: "+position);
	}
}


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
	var kanji = this.innerHTML;

	// display="block" must come first to get the tooltip's height and width
	if(descriptions.hasOwnProperty(kanji))
	{
		var tooltip_text = get_tooltip(kanji);
		tooltip.innerHTML = tooltip_text;
		tooltip.style.display = "block";

		set_tooltip_offsets();

		var position_top  = this.offsetTop + tooltip_offset_y;
		var position_left = this.offsetLeft + tooltip_offset_x;

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
