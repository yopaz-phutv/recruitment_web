<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

function getCurUser(int $role) : object
{
    $user = Auth::user();

    if ($user->role != $role) {
        throw new Exception('no permission', 405);
    }
    else return $user;
}
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
function uploadFile2GgDrive(
    $file,
    $folder,
    $filename = null,
    $option = ['isImage' => false, 'isText' => false]
) {
    $isImage = isset($option['isImage']) && $option['isImage'];
    $isText = isset($option['isText']) && $option['isText'];

    $ext = $file->getClientOriginalExtension();
    if (!$filename) {
        $filename = $file->getClientOriginalName();
        for ($i = strlen($filename) - 1; $filename[$i] != '.'; $i--) {
        } //to exclude extension
        $filename = substr($filename, 0, $i) . '_' . time() . '.' . $ext;
    }
    if ($isText) {
        $file = 'data:image/' . $file->getClientOriginalExtension() . ';base64,' .
            base64_encode(file_get_contents($file));
        Storage::put($folder . '/' . $filename, $file);
    } else Storage::putFileAs($folder, $file, $filename);

    //get url:
    $path = Storage::url($folder . '/' . $filename);
    $start = strpos($path, 'id=') + strlen('id=');
    $end = strpos($path, '&export=media');
    $fileId = substr($path, $start, $end - $start);
    if ($isImage)
        $ret = "https://lh3.googleusercontent.com/d/{$fileId}?authuser=0";
    else if ($isText) $ret = $folder . '/' . $filename;
    else $ret = 'https://drive.google.com/file/d/' . $fileId . '/view';

    return $ret;
}

function getViewLinkFromGgStorageUrl($url) {
    $start = strpos($url, 'id=') + strlen('id=');
    $end = strpos($url, '&export=media');
    $fileId = substr($url, $start, $end - $start);

    return 'https://drive.google.com/file/d/' . $fileId . '/view';
}
