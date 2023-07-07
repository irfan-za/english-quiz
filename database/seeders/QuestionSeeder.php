<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    public function run()
    {
        $questions = [
          [
            'question' => 'watch',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/watch--_gb_1.mp3',
            'hint' => 'look at or observe attentively over a period of time.',
            'level' => 'easy',
        ],
        [
            'question' => 'jeans',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/jeans--_gb_1.mp3',
            'hint' => 'hard-wearing trousers made of denim or other cotton fabric, for informal wear.',
            'level' => 'easy',
        ],
        [
            'question' => 'skirt',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/skirt--_gb_1.mp3',
            'hint' => 'a garment fastened around the waist and hanging down around the legs, worn by women and girls.',
            'level' => 'easy',
        ],
        [
            'question' => 'hour',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/hour--_gb_1.mp3',
            'hint' => 'a period of time equal to a twenty-fourth part of a day and night and divided into 60 minutes.',
            'level' => 'easy',
        ],
        [
            'question' => 'passport',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/passport--_gb_1.mp3',
            'hint' => 'an official document issued by a government, certifying the holder\'s identity and citizenship.',
            'level' => 'easy',
        ],
        [
            'question' => 'relax',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/relax--_gb_1.mp3',
            'hint' => 'make or become less tense or anxious.',
            'level' => 'easy',
        ],
        [
            'question' => 'sweep',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/sweep--_gb_1.mp3',
            'hint' => 'clean (an area) by brushing away dirt or litter.',
            'level' => 'easy',
        ],
        [
            'question' => 'children',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/children--_gb_1.mp3',
            'hint' => 'a young human being below the age of puberty or below the legal age.',
            'level' => 'easy',
        ],
        [
            'question' => 'yard',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/yard--_gb_1.mp3',
            'hint' => 'a unit of linear measure equal to 3 feet.',
            'level' => 'easy',
        ],
        [
            'question' => 'dress',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/dress--_gb_1.mp3',
            'hint' => 'decorate (something) in an artistic or attractive way.',
            'level' => 'easy',
        ],
        [
            'question' => 'design',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/design--_gb_1.mp3',
            'hint' => 'a plan or drawing produced to show the look and function or workings.',
            'level' => 'easy',
        ],
        [
            'question' => 'adventure',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/adventure--_gb_1.mp3',
            'hint' => 'an unusual and exciting, typically hazardous, experience or activity.',
            'level' => 'easy',
        ],
        [
            'question' => 'ticket',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/ticket--_gb_1.mp3',
            'hint' => 'a certificate or warrant.',
            'level' => 'easy',
        ],
        [
            'question' => 'dolphin',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/dolphin--_gb_1.mp3',
            'hint' => 'a small gregarious toothed whale that typically has a beaklike snout and a curved fin on the back.',
            'level' => 'easy',
        ],
        [
            'question' => 'autograph',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/autograph--_gb_1.mp3',
            'hint' => 'a signature, especially that of a celebrity written as a memento for an admirer.',
            'level' => 'easy',
        ],
        [
            'question' => 'persuaded',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/persuaded--_gb_1.mp3',
            'hint' => 'cause (someone) to do something through reasoning or argument.',
            'level' => 'easy',
        ],
        [
            'question' => 'appointment',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/appointment--_gb_1.mp3',
            'hint' => 'an arrangement to meet someone at a particular time and place.',
            'level' => 'easy',
        ],
        [
            'question' => 'question',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/question--_gb_1.mp3',
            'hint' => 'a sentence worded or expressed so as to elicit information.',
            'level' => 'easy',
        ],
        [
            'question' => 'language',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/language--_gb_1.mp3',
            'hint' => 'a system of communication used by a particular country or community.',
            'level' => 'easy',
        ],
        [
            'question' => 'burning',
            'sound_url' => 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/burning--_gb_1.mp3',
            'hint' => 'very hot or bright.',
            'level' => 'easy',
        ],
        ];

        // Mengisi data questions
        foreach ($questions as $data) {
            Question::create($data);
        }

        $this->command->info('Data questions berhasil diisi.');
    }
}
