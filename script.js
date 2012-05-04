function switch_video(id)
{
	////console.log("start");
	//alert(find_video(id)['name']);
	var video = find_video(id);
	var template = "This video is not available.";
	
	if(omp_sites[video["site"]] || video["site"] == "flv")
	{
		if(video["site"] == "flv")
		{
			$("#video").html("<div id=\"mediaplayer\"></div>");
			
			jwplayer("mediaplayer").setup({
				flashplayer: "jwplayer/player.swf",
				file: video["parameters"][0],
				width: "100%",
				height: "100%",
				autoplay: true
			});
		}
		else
		{
			template = omp_sites[video["site"]];
			
			template = template.replace(/\$w/g, "100%");
			template = template.replace(/\$h/g, "100%");
			
			//console.log(video["parameters"]);
			
			for(var i in video["parameters"])
			{
				var parameter = video["parameters"][i];
				template = template.replace(new RegExp("\\$s" + i, "g"), parameter);
				//console.log(template);
			}
			
			$("#video").html(template);
		}
		
		$("#np_title").html(video["name"]);
		$("#np_description").html(cut_text(video["description"], 200));
		$(".nowplaying").show();
		
		hide_index();
	}
	else
	{
		//console.log(video["site"]);
	}
}

function find_video(id)
{
	for(var i in omp_videos)
	{
		var cat = omp_videos[i];
		
		if(cat[id])
		{
			return cat[id];
		}
	}
}

function cut_text(text, length)
{
	if(text.length > length)
	{
		var pattern = new RegExp("^.{0," + length + "}\\b", "i");
		//console.log(pattern, text);
		return text.match(pattern) + "...";
	}
	else
	{
		return text;
	}
}

function show_index()
{
	$("#video").removeClass("video_normal").addClass("video_shrunk");
	$("#index").removeClass("index_normal").addClass("index_expanded");
}

function hide_index()
{
	$("#video").removeClass("video_shrunk").addClass("video_normal");
	$("#index").removeClass("index_expanded").addClass("index_normal");
}

function load_categories()
{
	var categorylist = [];
	
	for(var i in omp_videos)
	{
		categorylist.push(i);
		//console.log(i);
	}
	
	categorylist.sort();
	var list_element = $("#categorylist");
	
	for(var t in categorylist)
	{
		list_element.append("<a href=\"#\" class=\"category_item\" onclick=\"load_category('" + categorylist[t] + "'); return false;\">" + categorylist[t] + "</a>");
	}
}

function load_category(id)
{
	var close_button = "<a class=\"close_button\" href=\"#\" onclick=\"hide_index(); return false;\">X</a>";
	
	if(omp_videos[id])
	{
		var index_element = $("#index");
		index_element.html(close_button + "<h4>" + id + "</h4>");
		
		var videolist = omp_videos[id];
		
		for(var i in videolist)
		{
			index_element.append("<a href=\"#\" onclick=\"switch_video(" + i + "); return false;\" class=\"video_item\"><div class=\"video_title\">" + videolist[i]["name"] + "</div><div class=\"video_description\">" + cut_text(videolist[i]["description"], 550) + "</div></a>");
		}
	}
	else
	{
		$("#index").html(close_button + "<h4>" + id + "</h4><div class=\"error\">No videos were found in this category.</div>");
	}
	
	show_index();
}

$(function(){
	load_categories();
	
	/*var test = '<iframe width="$w" height="$h" src="http://www.youtube.com/embed/$s0?fs=1&autoplay=1&hd=1" frameborder="0" allowfullscreen></iframe>';
	var i = "0";
	var pattern = new RegExp("\\$s" + i, "g");
	var parameter="test";
	test = test.replace(pattern, parameter);
	//console.log(pattern);
	//console.log(/\$s0/g);
	alert(test);*/
});
