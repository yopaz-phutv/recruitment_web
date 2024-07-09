<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CandidateBookmarkController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\CandidateMessageController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\JlevelController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JtypeController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\OtherController;
use App\Http\Controllers\PrizeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\SkillController;

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
    Route::get('refresh', 'refresh');
    Route::get('getMe', 'me');
    Route::patch('updateNewPassword', 'updateNewPassword');
});

Route::controller(CandidateController::class)->prefix('candidates')->group(function () {
    // Route::get('', 'index');
    // Route::get('{id}', 'show')->middleware('jwt');
    Route::get('getCurrent', 'getCurrent')->middleware('jwt');
    Route::get('getCurrentAvatar', 'getCurrentAvatar')->middleware('jwt');
    Route::post('update', 'update');
    Route::get('{id}/getAppliedJobs', 'getAppliedJobs');
    Route::get('{id}/getSavedJobs', 'getSavedJobs');
    Route::post('{job_id}/processJobSaving', 'processJobSaving');
    Route::get('{job_id}/checkJobSaved', 'checkJobSaved');
    Route::post('updatePublicResume', 'updatePublicResume');
    Route::get('getCurJobRecommendData/{job_id}', 'getCurJobRecommendData');
});

Route::controller(EmployerController::class)->prefix('companies')->group(function () {
    Route::get('', 'index');
    Route::get('{id}/getByID', 'show');
    Route::post('update', 'update');
    Route::get('getDetail', 'getDetail');
    Route::get('getHotList', 'getHotList');
    Route::delete('{id}', 'destroy');
    Route::get('{id}/getComJobs', 'getComJobs');
    Route::get('getJobList', 'getJobList');
    Route::get('getCandidateList', 'getCandidateList')->middleware('jwt');
    Route::post('processApplying', 'processApplying')->middleware('jwt');
    Route::post('{job_id}/changeJobStatus', 'changeJobStatus');
    Route::get('findCandidates', 'findCandidates');
    Route::post('sendRecommendToCandidate', 'sendRecommendToCandidate');
});

Route::controller(AdminController::class)->prefix('admin')->group(function () {
    Route::get('getEmployerList', 'getEmployerList');
    Route::patch('handleRequest', 'handleRequest');
    Route::patch('changeAccActiveStatus', 'changeAccActiveStatus');
    Route::get('getCandidateList', 'getCandidateList');
});

Route::controller(JobController::class)->prefix('jobs')->group(function () {
    Route::get('', 'index');
    Route::get('{id}/getByID', 'show');
    Route::get('getHotList', 'getHotList');
    Route::post('', 'create');
    Route::post('{id}/update', 'update');
    Route::get('{id}/getJobIndustries', 'getJobIndustries');
    Route::post('{id}/apply', 'apply')->middleware('jwt');
    Route::get('{id}/checkCanApply', 'checkCanApply')->middleware('jwt');
    Route::get('{id}/getSimilarJobs', 'getSimilarJobs');
    Route::get('getRecommendJobs', 'getRecommendJobs'); 
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

Route::controller(EducationController::class)->prefix('educations')->group(function () {
    Route::get('', 'index');
    Route::get('getByCurrentCandidateProfile', 'getByCurrentCandidateProfile');
    Route::get('{resume_id}/getByCurCandResumeId', 'getByCurCandResumeId');
    Route::post('', 'create');
    Route::delete('{id}', 'destroy');
    Route::post('update/{id}', 'update');
});
Route::controller(ExperienceController::class)->prefix('experiences')->group(function () {
    Route::get('', 'index');
    Route::get('getByCurrentCandidateProfile', 'getByCurrentCandidateProfile');
    Route::get('{resume_id}/getByCurCandResumeId', 'getByCurCandResumeId');
    Route::post('', 'create');
    Route::delete('{id}', 'destroy');
    Route::patch('{id}', 'update');
});
Route::controller(SkillController::class)->prefix('skills')->group(function () {
    Route::get('', 'index');
    Route::get('getByCurrentCandidateProfile', 'getByCurrentCandidateProfile');
    Route::get('{resume_id}/getByCurCandResumeId', 'getByCurCandResumeId');
    Route::post('', 'create');
    Route::delete('{id}', 'destroy');
    Route::patch('{id}', 'update');
});
Route::controller(ProjectController::class)->prefix('projects')->group(function () {
    Route::get('', 'index');
    Route::get('getByCurrentCandidateProfile', 'getByCurrentCandidateProfile');
    Route::get('{resume_id}/getByCurCandResumeId', 'getByCurCandResumeId');
    Route::post('', 'create');
    Route::delete('{id}', 'destroy');
    Route::patch('{id}', 'update');
});
Route::controller(CertificateController::class)->prefix('certificates')->group(function () {
    Route::get('', 'index');
    Route::get('getByCurrentCandidateProfile', 'getByCurrentCandidateProfile');
    Route::get('{resume_id}/getByCurCandResumeId', 'getByCurCandResumeId');
    Route::post('', 'create');
    Route::delete('{id}', 'destroy');
    Route::post('/update/{id}', 'update');
});
Route::controller(PrizeController::class)->prefix('prizes')->group(function () {
    Route::get('', 'index');
    Route::get('getByCurrentCandidateProfile', 'getByCurrentCandidateProfile');
    Route::get('{resume_id}/getByCurCandResumeId', 'getByCurCandResumeId');
    Route::post('', 'create');
    Route::delete('{id}', 'destroy');
    Route::post('/update/{id}', 'update');
});
Route::controller(ActivityController::class)->prefix('activities')->group(function () {
    Route::get('', 'index');
    Route::get('getByCurrentCandidateProfile', 'getByCurrentCandidateProfile');
    Route::get('{resume_id}/getByCurCandResumeId', 'getByCurCandResumeId');
    Route::post('', 'create');
    Route::delete('{id}', 'destroy');
    Route::patch('{id}', 'update');
});
Route::controller(OtherController::class)->prefix('others')->group(function () {
    Route::get('', 'index');
    Route::get('getByCurrentCandidateProfile', 'getByCurrentCandidateProfile');
    Route::get('{resume_id}/getByCurCandResumeId', 'getByCurCandResumeId');
    Route::post('', 'create');
    Route::delete('{id}', 'destroy');
    Route::patch('{id}', 'update');
});
Route::controller(ResumeController::class)->prefix('resumes')->group(function () {
    Route::get('getByCurrentCandidate', 'getByCurrentCandidate');
    Route::get('{id}/getById', 'getById');
    Route::get('{id}/getAvatar', 'getAvatar');
    Route::post('', 'create');
    Route::post('update', 'update');
    Route::delete('{id}', 'destroy');
});
Route::controller(CandidateBookmarkController::class)->prefix('candidate-bookmarks')->group(function () {
    Route::get('', 'index');
    Route::post('', 'create');
    Route::patch('{id}', 'update');
    Route::delete('', 'destroy');
    Route::post('{id}/send-recommend', 'sendRecommend');
});
