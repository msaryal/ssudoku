const searchInput = document.getElementById('search');
const fields = document.querySelector('[data-entity="fields"]');

const levels = {
    easy: 'Легкий',
    medium: 'Средний',
    hard: 'Тяжелый',
    expert: 'Эксперт',
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/ssudoku/sw.js');
}

searchInput.addEventListener('keyup', e => {
    const q = e.target.value;

    document.querySelectorAll('[data-entity="field"]').forEach(field => {
        field.classList.add('field-hidden');
    });

    if(q) {
        document.querySelectorAll('[data-entity="field"]').forEach(field => {
            const fieldNum = field.dataset.num;

            if(fieldNum.indexOf(q) == 0) {
                field.classList.remove('field-hidden');
            }
        }); 
    }
});

async function getData()
{
    const response = await fetch('/ssudoku/file.txt');
    const text = await response.text();

    const data = text.split("\r\n");

    data.forEach((row, n) => {

        const level = row.split(" | ")[0];
        const field = row.split(" | ")[1];
        const answer = row.split(" | ")[2];

        const elem = document.createElement('div');
        elem.classList.add('field','field-hidden');
        elem.dataset.entity = "field";
        elem.dataset.num = n;
        const elemTop = document.createElement('div');
        elemTop.classList.add('field-top');
        const elemTopCol1 = document.createElement('div');
        const elemTopNum = document.createElement('div');
        elemTopNum.classList.add('field-num');
        elemTopNum.innerHTML = n;
        const elemTopLevel = document.createElement('div');
        elemTopLevel.classList.add('field-level');
        elemTopLevel.innerHTML = levels[level];

        elemTop.appendChild(elemTopCol1);
        elemTop.appendChild(elemTopNum);
        elemTop.appendChild(elemTopLevel);

        const elemGrid = document.createElement('div');
        elemGrid.classList.add('field-grid');

        let index = 0;
        for(let i = 0; i < 9; i++) {
            const fieldRow = document.createElement('div');
            fieldRow.classList.add('field-row');
            for(let j = 0; j < 9; j++) {
                const fieldCell = document.createElement('div');
                fieldCell.classList.add('field-cell');
                
                if(answer.charAt(index) != field.charAt(index)) {
                    fieldCell.innerHTML = `<span>${answer.charAt(index)}</span>`;
                } else {
                    fieldCell.innerHTML = `<strogn>${answer.charAt(index)}</strong>`;
                }
                
                index++;

                fieldRow.appendChild(fieldCell);
            }

            elemGrid.appendChild(fieldRow);
        }

        elem.appendChild(elemTop);
        elem.appendChild(elemGrid);

        fields.append(elem);
    });
}

getData();