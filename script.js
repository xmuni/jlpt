



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





function set_tooltip_offsets()
{
	var tooltip_menu = document.querySelector("#tooltip_menu");
	var position = tooltip_menu.value;
	// tooltip_menu.addEventListener("change", function() {alert(tooltip_menu.options[tooltip_menu.selectedIndex].text);} );
	// tooltip_menu.addEventListener("change", function() {set_tooltip_position(tooltip_menu.value);} );

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
