<?php

namespace App\Services;

use App\Models\Industry;
use App\Models\Job;

class ScanJobsSimilarity
{
    public function convertDoc2Array(string $doc)
    {
        $array = preg_split("/[\s,.;\-:\/()\n\'\"&]+/", $doc);
        //to lower case
        $array = array_map(
            fn ($word) => mb_strtolower($word, 'UTF-8'),
            $array
        );
        //remove 1 character word and number
        $array = array_filter($array, function ($word) {
            return mb_strlen($word) > 1 && (int)$word == 0;
        });

        $array = array_count_values($array);

        return $array;
    }
    public function getTfidfMatrix($industry)
    {
        $totalJobs = $industry['totalJobs'];
        $jobs = $industry['jobs'];

        $wordArrList = array_map(fn ($job) => array_keys($job['wordArr']), $jobs);
        $allWords = array_count_values(array_merge(...$wordArrList)); //word and frequency in all docs
        // word list with key: word and value:idf of each word        
        foreach ($allWords as $key => $value) {
            $allWords[$key] = log($totalJobs / $value);
        }

        $matrix = [];
        for ($i = 0; $i < $totalJobs; $i++) {
            $job = $jobs[$i];
            $totalWords = $job['totalWords'];
            $wordList = $job['wordArr'];
            foreach ($allWords as $word => $idf) {
                $curWordCount = $wordList[$word] ?? 0;
                $matrix[$job['id']][] = round($curWordCount / $totalWords * $idf, 6);
            }
        }

        return $matrix;
    }
    public function cosineSimilarity($vector1, $vector2)
    {
        $dimension = count($vector1);
        $product = 0;
        $vector1SquaredMagnitude = $vector2SquaredMagnitude = 0;
        for ($i = 0; $i < $dimension; $i++) {
            $product += $vector1[$i] * $vector2[$i];
            $vector1SquaredMagnitude += pow($vector1[$i], 2);
            $vector2SquaredMagnitude += pow($vector2[$i], 2);
        }

        return $product / (sqrt($vector1SquaredMagnitude) * sqrt($vector2SquaredMagnitude));
    }
    public function getSimilarityMatrix($tfidfMatrix)
    {
        $matrix = [];
        foreach ($tfidfMatrix as $id1 => $vector1) {
            foreach ($tfidfMatrix as $id2 => $vector2) {
                $matrix[$id1][$id2] = round($this->cosineSimilarity($vector1, $vector2), 2);
            }
        }

        return $matrix;
    }
    public function mergeSimilarityMatrixs($matrixs)
    {
        $finalMatrix = $matrixs[0];
        for ($i = 1; $i < count($matrixs); $i++) {
            foreach ($matrixs[$i] as $key => $value) {
                if (array_key_exists($key, $finalMatrix)) {
                    $finalMatrix[$key] = $finalMatrix[$key] + $matrixs[$i][$key];
                } else $finalMatrix[$key] = $value;
            }
        }

        return $finalMatrix;
    }
    public function run()
    {
        $industryIDs = Industry::pluck('id');
        $industries = [];
        for ($i = 0; $i < count($industryIDs); $i++) {
            $industries[$i]['id'] = $industryIDs[$i];
            $jobs = Job::join('job_industry', 'id', '=', 'job_id')
                ->where('industry_id', $industryIDs[$i])
                ->select('id', 'description')
                ->get()
                ->toArray();
            $industries[$i]['totalJobs'] = count($jobs);
            $industries[$i]['jobs'] = [];

            for ($j = 0; $j < count($jobs); $j++) {
                $jobList = &$industries[$i]['jobs'][$j];
                $jobList['id'] = $jobs[$j]['id'];
                $wordArr = $this->convertDoc2Array($jobs[$j]['description']);
                $jobList['totalWords'] = array_sum($wordArr);
                $jobList['wordArr'] = $wordArr;
            }
        }
        $jobSimilarityMatrixs = [];
        for ($i = 0; $i < count($industryIDs); $i++) {
            if($industries[$i]['totalJobs'] == 1) continue;
            $jobSimilarityMatrixs[] = $this->getSimilarityMatrix($this->getTfidfMatrix($industries[$i]));
        }
        $jobsSimilarity = $this->mergeSimilarityMatrixs($jobSimilarityMatrixs);
        ksort($jobsSimilarity);
        return $jobsSimilarity;
        // foreach ($jobsSimilarity as $id => $similarity) {
        //     Job::where('id', $id)->update(['similarity' => json_encode($similarity)]);
        // }

        // return response()->json('update jobs similarity successfully');
    }
}
