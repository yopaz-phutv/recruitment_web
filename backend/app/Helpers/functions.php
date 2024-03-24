<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

function array2String($arr)
{
    $string = "";
    for ($j = 0; $j < count($arr); $j++) {
        $string = $string . $arr[$j];
        if ($j != count($arr) - 1) {
            $string = $string . ", ";
        }
    }
    return $string;
}
function formatDateTime($dt)
{
    $res = Carbon::parse($dt)->format('d/m/Y H:i');

    return $res;
}
function uploadFile2GgDrive($file, $folder, $filename = null, $imgThumbnail = false)
{
    $ext = $file->getClientOriginalExtension();
    if (!$filename) {
        $filename = $file->getClientOriginalName();
        for ($i = strlen($filename) - 1; $filename[$i] != '.'; $i--) {
        } //to exclude extension
        $filename = substr($filename, 0, $i) . '_' . time() . '.' . $ext;
    }
    Storage::putFileAs($folder, $file, $filename);
    //get url:
    $path = Storage::url($folder . '/' . $filename);
    $start = strpos($path, 'id=') + strlen('id=');
    $end = strpos($path, '&export=media');
    $fileId = substr($path, $start, $end - $start);
    if ($imgThumbnail)
        $ret = 'https://drive.google.com/thumbnail?id=' . $fileId;
    else $ret = 'https://drive.google.com/file/d/' . $fileId . '/view';

    return $ret;
}
