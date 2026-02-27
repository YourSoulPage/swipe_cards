const container = document.getElementById('card-container');
let cards = Array.from(container.children);

// Пресеты позиций (как на вашей картинке)
const states = [
    { top: '20%', left: '70%', rotate: '5deg', zIndex: 3 },  // Центр (верхняя)
    { top: '10%', left: '30%', rotate: '-12deg', zIndex: 2 }, // Слева (средняя)
    { top: '5%', left: '75%', rotate: '15deg', zIndex: 1 }   // Справа (нижняя)
];

function applyStates() {
    cards.forEach((card, index) => {
        const s = states[index];
        card.style.top = s.top;
        card.style.left = s.left;
        card.style.transform = `translate(-50%, 0) rotate(${s.rotate})`;
        card.style.zIndex = s.zIndex;
    });
}

function nextCard() {
    const topCard = cards[0]; // Берем текущую верхнюю карту
    
    // 1. Анимация улета
    topCard.classList.add('swipe-anim');

    setTimeout(() => {
        // 2. Перемещаем её в конец массива
        topCard.classList.remove('swipe-anim');
        cards.push(cards.shift()); 
        
        // 3. Пересчитываем позиции для всех карт
        applyStates();
    }, 400);
}

// Календарь

// --- НАСТРОЙКИ ДАТЫ ---
const configDate = {
    year: 2026,
    month: 2, // 0 - Январь, 1 - Февраль, 2 - Март и т.д.
    day: 8   // Число, которое обведем в кружок
};

function initCal() {
    const grid = document.getElementById('cal-grid');
    const monthTitle = document.getElementById('cal-month-title');
    grid.innerHTML = ''; 

    const { year, month, day } = configDate;

    // 1. Название месяца
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    monthTitle.innerHTML = `<b>${monthNames[month]}</b> ${year}`;

    // 2. Вставляем заголовки дней недели прямо в грид
    const dayLabels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    dayLabels.forEach(label => {
        const el = document.createElement('div');
        el.innerText = label;
        el.className = 'day-label'; // Специальный класс для стиля букв
        grid.appendChild(el);
    });

    // 3. Расчет сдвига и дней
    let firstDayIdx = new Date(year, month, 1).getDay();
    let shift = (firstDayIdx === 0) ? 6 : firstDayIdx - 1;
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    // 4. Пустые ячейки
    for (let i = 0; i < shift; i++) {
        grid.appendChild(document.createElement('div'));
    }

    // 5. Числа месяца
    for (let i = 1; i <= daysInMonth; i++) {
        const d = document.createElement('div');
        d.innerText = i;
        if (i === day) d.className = 'active-day';
        grid.appendChild(d);
    }
}

// Не забудьте вызвать функцию при загрузке
initCal();

// События
container.addEventListener('click', nextCard);

let startY = 0;
container.addEventListener('touchstart', e => startY = e.touches[0].clientY);
container.addEventListener('touchend', e => {
    if (Math.abs(startY - e.changedTouches[0].clientY) > 50) nextCard();
});

initCal();

applyStates(); // Применяем начальные позиции
