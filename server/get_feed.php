<?php

function get_feed($feed_url) {
    $context = stream_context_create(
        array(
            "http" => array(
                "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
            )
        )
    );
    $filename = __DIR__ . '/' . str_replace('/', '-', $feed_url) . '-' . date('Y-m-d') . '.txt';
    if (file_exists($filename)) {
        $myfile = fopen($filename, "r");
        $content = fread($myfile,filesize($filename));
    } else {
        $content = file_get_contents($feed_url, false, $context);
        $myfile = fopen($filename, "w");
        fwrite($myfile, $content);
    }
    fclose($myfile);
    if ($content) {
        $x = new SimpleXmlElement($content);
        return $x->channel->item;
    }
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
if (!$feed) {
    return;
}
$data = array();

foreach($feed as $entry){
    $cover = '';
    if ($entry->children( 'media', True )->content) {
        $cover = $entry->children( 'media', True )->content->attributes()['url'];
    } else if ($entry->children( 'media', True )->thumbnail) {
        $cover = $entry->children( 'media', True )->thumbnail->attributes()['url'];
    } else {
        preg_match('/< *img[^>]*src *= *["\']?([^"\']*)/i', $entry->description, $matches);
        if (isset($matches[1])) {
            $cover = $matches[1];
        }
    }

    $data[] = array(
        'link' => strip_tags($entry->link),
        'title' => strip_tags($entry->title),
        'description' => strip_tags($entry->description),
        'cover' => (string) $cover
    );
}

$json = json_encode($data);
$json = special_character_decode($json);
echo $json;
