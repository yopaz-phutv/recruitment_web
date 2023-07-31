<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\CandidateMessageController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\JlevelController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JtypeController;
use App\Http\Controllers\LocationController;
use App\Models\CandidateMessage;
use App\Models\Employer;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::get('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('profile', 'me');

});

Route::controller(EmployerController::class)->prefix('companies')->group(function () {
    Route::get('', 'index');
    Route::get('{id}/getByID', 'show');
    Route::get('getHotList', 'getHotList');
    Route::delete('{id}', 'destroy');
    Route::get('', 'search');
    Route::get('{id}/getComJobs', 'getComJobs');
    Route::get('{id}/getJobList', 'getJobList');
    Route::post('getCandidateList', 'getCandidateList')->middleware('jwt');
    Route::post('processApplying', 'processApplying')->middleware('jwt');
    Route::post('{job_id}/changeJobStatus', 'changeJobStatus');
});

Route::controller(JobController::class)->prefix('jobs')->group(function () {
    Route::get('', 'index');
    Route::get('{id}/getByID', 'show');
    Route::get('getHotList', 'getHotList');
    Route::post('', 'create');
    Route::post('{id}/update', 'update');
    Route::get('{id}/getJobIndustries', 'getJobIndustries');
    Route::post('filter', 'filter');
    Route::post('{id}/apply', 'apply')->middleware('jwt');
    Route::get('{id}/checkApplying', 'checkApplying')->middleware('jwt');
});

Route::controller(CandidateController::class)->prefix('candidates')->group(function () {
    // Route::get('', 'index');
    Route::get('{id}', 'show')->middleware('jwt');
    Route::get('{id}/getAppliedJobs', 'getAppliedJobs');
    Route::get('{id}/getSavedJobs', 'getSavedJobs');
    Route::post('{job_id}/processJobSaving', 'processJobSaving');
    Route::get('{job_id}/checkJobSaved', 'checkJobSaved');
});

Route::controller(IndustryController::class)->prefix('industries')->group(function () {
    Route::get('', 'index');
});

Route::controller(LocationController::class)->prefix('locations')->group(function () {
    Route::get('', 'index');
});

Route::controller(JtypeController::class)->prefix('jtypes')->group(function () {
    Route::get('', 'index');
});

Route::controller(JlevelController::class)->prefix('jlevels')->group(function () {
    Route::get('', 'index');
});

Route::controller(CandidateMessageController::class)->prefix('cand-msgs')->group(function () {
    Route::get('{id}/getByCandidateID', 'getByCandidateID')->middleware('jwt');
    Route::get('{id}/updateReadMsg', 'updateReadMsg');
});
