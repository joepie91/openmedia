<?php
if(isset($_POST['submit']))
{
	$id = file_get_contents("incr.txt");
	
	if(!$id)
	{
		$id = 0;
	}
	
	file_put_contents("incr.txt", $id + 1);
	
	$name = $_POST['name'];
	$description = $_POST['description'];
	$category = $_POST['category'];
	
	if(!empty($_POST['id']))
	{
		$video_id = $_POST['id'];
		
		$obj = array(
			$category => array(
				$id => array(
					"name" => $name,
					"site" => "youtube",
					"description" => $description,
					"parameters" => array($video_id)
				)
			)
		);
	}
	else
	{
		$url = $_POST['url'];
		
		$obj = array(
			$category => array(
				$id => array(
					"name" => $name,
					"site" => $url,
					"description" => $description,
					"parameters" => array("")
				)
			)
		);
	}
	
	file_put_contents("suggestions.txt", json_encode($obj) . "\n", FILE_APPEND);
	
	echo("Done! Thank you.");
}

?>
<h1>Submit movie/series/etc.</h1>
<p>All submissions are manually verified before appearing. Please do not submit 'the average Youtube video', only serious movies, documentaries, series, etc.<strong>When submitting a YouTube video, please enter the video ID, and NOT the URL.</strong></p>
<p>It does not matter what site the video is hosted on, as long as it's either a streaming player or a directly linkable flv/mp4 file. If there is no page and just a video file, enter the video file as URL.</p>
<h3>Only FREELY DISTRIBUTABLE (Creative Commons, etc.) movies/series/talks please!</h3>
<form method="post" action="submit.php">
	Name: <input type="text" name="name"><hr>
	Youtube Video ID: <input type="text" name="id"> ... OR Video URL: <input type="text" name="url"><hr>
	Description:<br><textarea name="description" style="width: 300px; height: 120px;"></textarea><hr>
	Category: <input type="text" name="category"><hr>
	<button type="submit" name="submit">Submit</button>
</form>
