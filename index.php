<?
$filename = __DIR__ . '/file.txt';
$content = file($filename);

$data = [];
foreach($content as $row) {
    $arr = explode(" | ", $row);
    $level = $arr[0];
    $field = $arr[1];
    $answer = $arr[2];

    $data[] = [
        'level' => $level,
        'field' => $field,
        'answer' => $answer
    ];
}

$levels = [
    'easy' => 'Легкий',
    'medium' => 'Средний',
    'hard' => 'Тяжелый',
    'expert' => 'Эксперт',
];
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <title>ssudoku</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="description" content="ssudoku">
    <link rel="icon" type="image/png" href="/ssudoku/assets/ico/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/ssudoku/assets/ico/favicon.svg" />
    <link rel="shortcut icon" href="/ssudoku/assets/ico/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/ssudoku/assets/ico/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="ssudoku" />
    <link rel="manifest" href="/ssudoku/assets/ico/site.webmanifest" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/ssudoku/assets/css/style.css">
</head>
<body>
    <main class="main">
        <div class="container">
            <div class="search">
                <input type="number" inputmode="numeric" id="search" class="search-input" autocomplete="off" placeholder="Введите номер...">
            </div>
            <div class="fields">
                <? for($n = 0; $n < count($data); $n++): ?>
                    <div class="field field-hidden" data-entity="field" data-num="<?=$n?>">
                        <div class="field-top">
                            <div></div>
                            <div class="field-num"><?=$n?></div>
                            <div class="field-level"><?=$levels[$data[$n]['level']]?></div>
                        </div>
                        <div class="field-grid">
                            <? $index = 0; ?>
                            <? for($i = 0; $i < 9; $i++): ?>
                                <div class="field-row">
                                    <? for($j = 0; $j < 9; $j++): ?>
                                        <div class="field-cell">
                                            <? if($data[$n]['answer'][$index] != $data[$n]['field'][$index]): ?>
                                                <span><?=$data[$n]['answer'][$index]?></span>
                                            <? else: ?>
                                                <strong><?=$data[$n]['answer'][$index]?></strong>
                                            <? endif; ?>
                                        </div>
                                        <? $index++; ?>
                                    <? endfor; ?>
                                </div>
                            <? endfor; ?>
                        </div>
                    </div>
                <? endfor; ?>
            </div>
        </div>
    </main>

    <script src="/ssudoku/assets/js/script.js"></script>
</body>
</html>