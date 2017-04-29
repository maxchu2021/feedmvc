<?php

function get_feed($feed_url) {
    $content = file_get_contents($feed_url);
    $content = str_replace("<content:encoded>","<contentEncoded>",$content);
    $content = str_replace("</content:encoded>","</contentEncoded>",$content);
    $x = new SimpleXmlElement($content);
    return $x->channel->item;
}

function get_imgs($file) {
    preg_match_all('/<img[^>]+>/i',file_get_contents($file), $result);

    foreach($result[0] as $img){
        if (strstr($img, "imgur"))
            $imgs .= $img;
    }

    return $imgs;
}

function get_image($str) {
    preg_match_all('/<img[^>]+>/i', $str, $result);
    return $result[0][0];
}

function img2div($str) {
    if (!$str)
        return;
    $str = str_replace('<img', '<div', $str);
    $str = str_replace('src="', 'style="background-image:url(', $str);

    if (strstr($str, 'class'))
        $str = str_replace('" class="', ')" class="cover ', $str);
    else
        $str = str_replace('">', ')" class="cover">', $str);

    $str .= "</div>";
    return $str;
}

function special_character_decode($str) {
    $str = str_replace('&nbsp;', ' ', $str);
    $str = str_replace('&#8211;', "–", $str);
    $str = str_replace('&#8212;', "—", $str);
    $str = str_replace('&#8216;', "‘", $str);
    $str = str_replace('&#8217;', "’", $str);
    $str = str_replace('&#8220;', '“', $str);
    $str = str_replace('&#8221;', '”', $str);
    $str = str_replace('&#8230;', "…", $str);
    $str = str_replace('&hellip;', '…', $str);
    $str = str_replace('\\u00a0', " ", $str);
    return $str;
}

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
$json = special_character_decode($json);
echo $json;
