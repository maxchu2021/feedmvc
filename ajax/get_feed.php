<?php
include '../lib/func.php';

$feed = get_feed($_GET['url']);
$data = array();

foreach($feed as $entry){
    preg_match('/< *img[^>]*src *= *["\']?([^"\']*)/i', $entry->description, $matches);
	$cover = $matches[1];

	if (empty($cover)) {
	    preg_match('/< *img[^>]*src *= *["\']?([^"\']*)/i', $entry->contentEncoded, $matches);
		$cover = $matches[1];
	}

    $data[] = array(
        'link' => strip_tags($entry->link),
        'title' => strip_tags($entry->title),
        'image' => strip_tags($entry->image->url),
        'description' => strip_tags($entry->description),
        'cover' => $cover
    );
}

$json = json_encode($data);
echo $json;
