const searchInput = document.getElementById('search');

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