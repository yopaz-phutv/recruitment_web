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
function uploadFile2GgDrive($file, $folder)
{
    $filename = $file->getClientOriginalName();
    $ext = $file->getClientOriginalExtension();

    for ($i = strlen($filename) - 1; $filename[$i] != '.'; $i--) {
    } //to exclude extension
    $filename = substr($filename, 0, $i) . '_' . time() . '.' . $ext;

    Storage::putFileAs($folder, $file, $filename);
    $path = Storage::url($folder . '/' . $filename);

    //get file ID in gg drive:
    $start = strpos($path, 'id=') + strlen('id=');
    $end = strpos($path, '&export=media');
    $fileId = substr($path, $start, $end - $start);

    return 'https://drive.google.com/file/d/' . $fileId . '/view';
}
