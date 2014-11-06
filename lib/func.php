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
