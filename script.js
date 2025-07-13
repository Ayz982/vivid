document.addEventListener('DOMContentLoaded', () => {

    // === Елементи DOM ===
    const welcomeScreen = document.getElementById('welcome-screen');
    const testScreen = document.getElementById('test-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    const questionContainer = document.getElementById('question-container');
    const progressBar = document.getElementById('progress-bar');
    const resultsContent = document.getElementById('results-content');
    
    const modal = document.getElementById('support-modal');
    const modalText = document.getElementById('modal-text');
    const closeBtn = document.querySelector('.close-btn');

    // === Розширена база питань (25 питань) ===
    const questions = [
        // === Розділ: Сон та Відпочинок (5 питань) ===
        {
            text: 'Як часто ви прокидаєтеся вранці з відчуттям розбитості, навіть після 7-8 годин сну?',
            category: 'sleep',
            options: [
                { text: 'Ніколи', value: 0 }, { text: 'Рідко', value: 1 }, { text: 'Іноді', value: 2 },
                { text: 'Часто', value: 3, supportTrigger: true }, { text: 'Завжди', value: 4, supportTrigger: true },
            ],
            supportMessage: "Якість сну критично важлива для вашої енергії. Дякуємо, що ділитеся! Пам'ятайте, що ви вже на шляху до покращення."
        },
        {
            text: 'Чи маєте ви проблеми із засинанням (довго не можете заснути) або прокидаєтеся серед ночі?',
            category: 'sleep',
            options: [
                { text: 'Ніколи', value: 0 }, { text: 'Рідко', value: 1 }, { text: 'Іноді', value: 2 },
                { text: 'Часто', value: 3 }, { text: 'Завжди', value: 4 },
            ],
        },
        {
            text: 'Наскільки регулярний ваш графік сну? (Тобто, лягаєте і прокидаєтесь приблизно в однаковий час)',
            category: 'sleep',
            options: [
                { text: 'Дуже регулярний, навіть у вихідні', value: 0 }, { text: 'В цілому регулярний', value: 1 },
                { text: 'Нерегулярний, різниця до 2 годин', value: 3 }, { text: 'Повністю хаотичний', value: 4 },
            ],
        },
        {
            text: 'Чи використовуєте ви телефон/планшет/ноутбук, лежачи в ліжку перед сном?',
            category: 'sleep',
            options: [
                { text: 'Ніколи', value: 0 }, { text: 'Рідко', value: 1 },
                { text: 'Часто', value: 3 }, { text: 'Щоночі', value: 4 },
            ],
        },
        {
            text: 'Чи відчуваєте ви сонливість протягом дня, яка заважає вам працювати чи займатись справами?',
            category: 'sleep',
            options: [
                { text: 'Ніколи', value: 0 }, { text: 'Рідко', value: 1 }, { text: 'Іноді', value: 2 },
                { text: 'Часто', value: 3 }, { text: 'Постійно', value: 4 },
            ],
        },
        // === Розділ: Емоційний Стан (5 питань) ===
        {
            text: 'Як часто ви відчуваєте апатію або втрату інтересу до речей, які раніше приносили вам задоволення?',
            category: 'emotional',
            options: [
                { text: 'Ніколи', value: 0 }, { text: 'Рідко', value: 1 }, { text: 'Іноді', value: 2 },
                { text: 'Часто', value: 3, supportTrigger: true }, { text: 'Завжди', value: 4, supportTrigger: true },
            ],
            supportMessage: "Втрата інтересу - це важкий тягар. Важливо визнати ці почуття. Дякуємо за вашу відвертість."
        },
        {
            text: 'Чи схильні ви до самокритики або часто прокручуєте в голові свої помилки?',
            category: 'emotional',
            options: [
                { text: 'Ні, я до себе добрий', value: 0 }, { text: 'Іноді буває', value: 2 },
                { text: 'Так, це мій постійний супутник', value: 4 },
            ],
        },
        {
            text: 'Чи легко вам заплакати або, навпаки, ви відчуваєте, що емоції "заморожені"?',
            category: 'emotional',
            options: [
                { text: 'Мої емоції збалансовані', value: 0 }, { text: 'Іноді буває складно', value: 2 },
                { text: 'Так, часто відчуваю крайнощі', value: 4 },
            ],
        },
        {
            text: 'Чи відчуваєте ви себе самотнім або незрозумілим, навіть коли перебуваєте серед людей?',
            category: 'emotional',
            options: [
                { text: 'Ні, я відчуваю зв\'язок з іншими', value: 0 }, { text: 'Іноді', value: 2 },
                { text: 'Так, часто', value: 4, supportTrigger: true },
            ],
            supportMessage: "Відчуття самотності може бути дуже виснажливим. Важливо пам'ятати, що ви не одні у своїх почуттях."
        },
        {
            text: 'Чи є у вашому житті хоча б одна річ, яка наповнює вас радістю і натхненням?',
            category: 'emotional',
            options: [
                { text: 'Так, і не одна!', value: 0 }, { text: 'Так, є одна', value: 1 },
                { text: 'Важко знайти таку річ', value: 3 }, { text: 'Ні, нічого не радує', value: 4 },
            ],
        },
        // === Розділ: Стрес та Розумове Навантаження (5 питань) ===
        {
            text: 'Чи відчуваєте ви постійну внутрішню напругу, тривогу або дратівливість без видимої причини?',
            category: 'stress',
            options: [
                { text: 'Ніколи', value: 0 }, { text: 'Рідко', value: 1 }, { text: 'Іноді', value: 2 },
                { text: 'Часто', value: 3, supportTrigger: true }, { text: 'Завжди', value: 4, supportTrigger: true },
            ],
            supportMessage: "Відчуття стресу може бути надзвичайно виснажливим. Важливо дати собі дозвіл на відпочинок. Ви сильніші, ніж думаєте."
        },
        {
            text: 'Чи важко вам казати "ні" і встановлювати особисті кордони з іншими?',
            category: 'stress',
            options: [
                { text: 'Ні, легко', value: 0 }, { text: 'Іноді буває складно', value: 2 },
                { text: 'Так, це для мене велика проблема', value: 4 },
            ],
        },
        {
            text: 'Чи відчуваєте ви себе перевантаженим щоденними обов\'язками (робота, дім, навчання)?',
            category: 'stress',
            options: [
                { text: 'Ні, я справляюся', value: 0 }, { text: 'Іноді', value: 2 },
                { text: 'Так, постійно', value: 4 },
            ],
        },
        {
            text: 'Чи є у вашому розкладі час на повне "відключення" і відпочинок без почуття провини?',
            category: 'stress',
            options: [
                { text: 'Так, регулярно', value: 0 }, { text: 'Рідко, але буває', value: 2 },
                { text: 'Ні, постійно щось роблю', value: 4 },
            ],
        },
        {
            text: 'Як ви реагуєте на несподівані проблеми чи зміни планів?',
            category: 'stress',
            options: [
                { text: 'Гнучко, швидко адаптуюся', value: 0 }, { text: 'Відчуваю легкий стрес, але справляюся', value: 1 },
                { text: 'Сильно дратуюся або впадаю в паніку', value: 3 },
            ],
        },
        // === Розділ: Спосіб Життя та Звички (5 питань) ===
        {
            text: 'Наскільки збалансований ваш раціон? (Чи є в ньому достатньо овочів, білків, складних вуглеводів)',
            category: 'lifestyle',
            options: [
                { text: 'Дуже збалансований', value: 0 }, { text: 'Загалом так', value: 1 },
                { text: 'Не дуже, часто перекуси', value: 3 }, { text: 'Харчуюся хаотично, переважно фастфудом', value: 4 },
            ],
        },
        {
            text: 'Як часто ви займаєтеся фізичною активністю (навіть легкою, як прогулянка) протягом тижня?',
            category: 'lifestyle',
            options: [
                { text: '4-5 разів на тиждень або більше', value: 0 }, { text: '2-3 рази на тиждень', value: 1 },
                { text: 'Раз на тиждень', value: 3 }, { text: 'Майже ніколи', value: 4, supportTrigger: true },
            ],
            supportMessage: "Знайти сили для руху, коли їх немає, дуже важко. Навіть 10-хвилинна прогулянка може стати великою перемогою."
        },
        {
            text: 'Скільки чистої води (не чаю, кави чи соку) ви випиваєте в середньому за день?',
            category: 'lifestyle',
            options: [
                { text: 'Більше 1.5 літра', value: 0 }, { text: 'Близько 1 літра', value: 1 },
                { text: '2-3 склянки', value: 3 }, { text: 'Майже не п\'ю воду', value: 4 },
            ],
        },
        {
            text: 'Чи проводите ви час на свіжому повітрі (на природі, в парку) хоча б 20 хвилин на день?',
            category: 'lifestyle',
            options: [
                { text: 'Так, майже щодня', value: 0 }, { text: 'Кілька разів на тиждень', value: 1 },
                { text: 'Дуже рідко', value: 3 },
            ],
        },
        {
            text: 'Скільки чашок кави або енергетичних напоїв ви випиваєте, щоб "прокинутися" або підтримати активність?',
            category: 'lifestyle',
            options: [
                { text: '0', value: 0 }, { text: '1-2', value: 1 }, { text: '3-4', value: 3 },
                { text: '5 або більше', value: 4 },
            ],
        },
        // === Розділ: Робота та Фізичне Здоров'я (5 питань) ===
        {
            text: 'Чи відчуваєте ви себе емоційно виснаженим або цинічним по відношенню до своєї роботи/навчання?',
            category: 'burnout',
            options: [
                { text: 'Ніколи', value: 0 }, { text: 'Рідко', value: 1 }, { text: 'Іноді', value: 2 },
                { text: 'Часто', value: 3 }, { text: 'Завжди', value: 4, supportTrigger: true },
            ],
            supportMessage: "Емоційне вигорання - це реальна проблема. Ваші почуття важливі, і ви заслуговуєте на відновлення."
        },
        {
            text: 'Чи відчуваєте ви, що ваші зусилля на роботі/навчанні залишаються непоміченими або недооціненими?',
            category: 'burnout',
            options: [
                { text: 'Ні, мене цінують', value: 0 }, { text: 'Іноді так здається', value: 2 },
                { text: 'Так, відчуваю це постійно', value: 4 },
            ],
        },
        {
            text: 'Як часто ви відчуваєте труднощі з концентрацією уваги, пам\'яттю або "туман в голові"?',
            category: 'physical',
            options: [
                { text: 'Ніколи', value: 0 }, { text: 'Рідко', value: 1 }, { text: 'Іноді', value: 2 },
                { text: 'Часто', value: 3 }, { text: 'Постійно', value: 4 },
            ],
        },
        {
            text: 'Чи турбують вас безпричинні м\'язові болі, ломота в тілі або головні болі?',
            category: 'physical',
            options: [
                { text: 'Ні', value: 0 }, { text: 'Рідко', value: 2 },
                { text: 'Так, часто', value: 4 },
            ],
        },
        {
            text: 'Чи помічали ви, що стали частіше хворіти на застуди або відчуваєте постійну мерзлякуватість?',
            category: 'physical',
            options: [
                { text: 'Ні, не помічав', value: 0 }, { text: 'Можливо, іноді', value: 2 },
                { text: 'Так, це про мене', value: 4, supportTrigger: true },
            ],
            supportMessage: "Іноді наше тіло першим сигналізує про виснаження. Важливо прислухатися до нього. Це крок до того, щоб подбати про себе."
        },
    ];

    // === База результатів (незмінна) ===
    const resultsData = {
        sleep: {
            title: "Проблеми зі сном та відновленням",
            explanation: "Навіть якщо ви спите достатньо годин, погана якість сну не дозволяє вашому тілу та мозку пройти через усі необхідні фази відновлення. Це призводить до відчуття розбитості, дратівливості та проблем з концентрацією.",
            recommendations: [
                "<strong>Гігієна сну:</strong> Лягайте спати і прокидайтеся в один і той же час, навіть у вихідні.",
                "<strong>Створіть ритуал:</strong> За годину до сну приглушіть світло, прийміть теплу ванну, почитайте паперову книгу або помедитуйте.",
                "<strong>Обмежте екрани:</strong> Уникайте телефонів, планшетів та комп'ютерів мінімум за годину до сну. Синє світло пригнічує вироблення мелатоніну.",
                "<strong>Оптимізуйте спальню:</strong> Переконайтеся, що у вашій кімнаті темно, тихо та прохолодно."
            ]
        },
        stress: {
            title: "Хронічний стрес та розумове навантаження",
            explanation: "Постійна тривога, внутрішня напруга та невміння встановлювати особисті кордони тримають вашу нервову систему в режимі 'бий або біжи'. Це виснажує наднирники та витрачає величезну кількість енергії.",
            recommendations: [
                "<strong>Дихальні практики:</strong> Освойте техніку 'квадратного дихання' (4 сек вдих, 4 сек затримка, 4 сек видих, 4 сек затримка). Практикуйте 5 хвилин на день.",
                "<strong>Встановлення кордонів:</strong> Потренуйтеся казати 'ні' на невеликі прохання. Пам'ятайте, що ваше 'так' має бути свідомим вибором, а не обов'язком.",
                "<strong>'Розвантаження голови':</strong> Перед сном виписуйте на папір усі тривожні думки та завдання на завтра, щоб звільнити розум.",
                "<strong>Знайдіть хобі:</strong> Займіться тим, що приносить вам радість і не пов'язане з роботою (малювання, спорт, танці)."
            ]
        },
        lifestyle: {
            title: "Дисбаланс у способі життя та харчуванні",
            explanation: "Нерегулярне харчування, надлишок цукру та кофеїну, а також недостатня фізична активність створюють 'енергетичні гойдалки'. Ваше тіло не отримує стабільного 'палива' та не виробляє достатньо ендорфінів для гарного самопочуття.",
            recommendations: [
                "<strong>Збалансуйте тарілку:</strong> Намагайтеся, щоб кожен прийом їжі містив білки (м'ясо, риба, бобові), складні вуглеводи (крупи, цільнозерновий хліб) та овочі.",
                "<strong>Рухайтеся щодня:</strong> Почніть з малого – 15-хвилинної прогулянки в обідню перерву. Головне – регулярність, а не інтенсивність.",
                "<strong>Пийте воду:</strong> Часто втома є ознакою зневоднення. Тримайте пляшку з водою під рукою протягом дня.",
                "<strong>Проведіть ревізію кофеїну:</strong> Поступово зменшуйте кількість кави, особливо у другій половині дня. Спробуйте замінити її на трав'яний чай."
            ]
        },
        burnout: {
            title: "Емоційне та професійне вигорання",
            explanation: "Відчуття, що робота позбавлена сенсу, постійний тиск та надмірне емоційне залучення без належного відновлення призводять до глибокого виснаження. Це стан, коли вичерпуються не тільки фізичні, а й емоційні ресурси.",
            recommendations: [
                "<strong>Чітко розділіть роботу і дім:</strong> Встановіть час, коли ви вимикаєте робочий телефон та комп'ютер. Створіть ритуал 'завершення робочого дня'.",
                "<strong>Перегляньте свої цінності:</strong> Подумайте, що для вас справді важливо в житті та роботі. Можливо, варто скоригувати кар'єрний шлях або знайти сенс поза роботою.",
                "<strong>Делегуйте та просіть про допомогу:</strong> Ви не повинні робити все самотужки. Навчіться довіряти колегам та близьким.",
                "<strong>Плануйте відпочинок:</strong> Вносьте у свій календар не тільки робочі зустрічі, а й час на відпочинок, хобі та зустрічі з друзями."
            ]
        },
        physical: {
            title: "Ймовірні фізичні причини та дефіцити",
            explanation: "Симптоми, такі як 'туман в голові', часті хвороби та мерзлякуватість, можуть вказувати на глибинні фізіологічні проблеми, наприклад, дефіцит вітамінів (залізо, B12, D), проблеми з щитоподібною залозою або хронічні запальні процеси.",
            recommendations: [
                "<strong>Зверніться до лікаря:</strong> Це найважливіший крок. Розкажіть про свої симптоми та попросіть направити на аналізи (загальний аналіз крові, феритин, вітамін D, B12, ТТГ).",
                "<strong>Збагатіть раціон:</strong> Додайте продукти, багаті на залізо (червоне м'ясо, печінка, гречка, шпинат), вітамін B12 (м'ясо, яйця, молочні продукти) та вітамін С для кращого засвоєння заліза.",
                "<strong>Не займайтеся самолікуванням:</strong> Не приймайте вітамінні добавки у великих дозах без консультації з лікарем та відповідних аналізів.",
                "<strong>Прислухайтеся до тіла:</strong> Ведіть щоденник симптомів, щоб надати лікарю якомога більше інформації."
            ]
        },
        emotional: {
            title: "Емоційне пригнічення та апатія",
            explanation: "Втрата інтересу, постійний смуток, самокритика або апатія можуть бути не просто поганим настроєм, а ознакою глибокого емоційного виснаження. Психіка витрачає величезну енергію на придушення почуттів.",
             recommendations: [
                "<strong>Дозвольте собі відчувати:</strong> Визнайте свої почуття без осуду. Скажіть собі: 'Так, зараз мені сумно/тривожно, і це нормально'.",
                "<strong>Знайдіть безпечний вихід емоціям:</strong> Ведіть щоденник, поговоріть з другом, якому довіряєте, поплачте, якщо хочеться.",
                "<strong>Практикуйте самоспівчуття:</strong> Спробуйте ставитися до себе так, як ви б ставилися до хорошого друга, який потрапив у біду.",
                "<strong>Зверніться до психотерапевта:</strong> Це ознака сили, а не слабкості. Професіонал допоможе розібратися в причинах стану та знайти шляхи виходу."
            ]
        }
    };
    
    // === Стан тесту ===
    let currentQuestionIndex = 0;
    let scores = {};

    // === Функції ===
    function startTest() {
        showSupportModal("Ласкаво просимо! Цей тест створений, щоб допомогти вам краще зрозуміти себе. Пам'ятайте, що звернення до своїх відчуттів — це вже великий крок до відновлення.");
        currentQuestionIndex = 0;
        scores = { sleep: 0, stress: 0, lifestyle: 0, burnout: 0, physical: 0, emotional: 0 };
        welcomeScreen.classList.remove('active');
        resultsScreen.classList.remove('active');
        testScreen.classList.add('active');
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            let optionsHTML = '<div class="options-grid">';
            question.options.forEach(option => {
                optionsHTML += `
                    <button class="option-btn" 
                            data-value="${option.value}" 
                            data-category="${question.category}" 
                            data-support-trigger="${option.supportTrigger || false}"
                            data-support-message="${question.supportMessage || ''}">
                        ${option.text}
                    </button>`;
            });
            optionsHTML += '</div>';

            questionContainer.innerHTML = `
                <h3>${currentQuestionIndex + 1}/${questions.length}. ${question.text}</h3>
                ${optionsHTML}
            `;
            updateProgressBar();
        } else {
            showResults();
        }
    }
    
    function handleAnswerSelection(button) {
        const value = parseInt(button.dataset.value, 10);
        const category = button.dataset.category;
        const supportTrigger = button.dataset.supportTrigger === 'true';
        const supportMessage = button.dataset.supportMessage;

        scores[category] += value;
        
        if (supportTrigger && supportMessage) {
            setTimeout(() => showSupportModal(supportMessage), 200);
        }

        currentQuestionIndex++;
        displayQuestion();
    }

    function updateProgressBar() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function showResults() {
        testScreen.classList.remove('active');
        resultsScreen.classList.add('active');

        const filteredScores = Object.entries(scores).filter(([_, score]) => score > 4); // Підняли поріг для більшої точності
        filteredScores.sort(([, a], [, b]) => b - a);
        
        resultsContent.innerHTML = '';
        const topResults = filteredScores.slice(0, 3);

        if (topResults.length === 0) {
            resultsContent.innerHTML = '<div class="result-card"><p class="description">Схоже, у вас хороший рівень енергії! Продовжуйте піклуватися про себе та підтримувати здоровий баланс.</p></div>';
            return;
        }

        topResults.forEach(([category, _]) => {
            const result = resultsData[category];
            const recommendationsHTML = result.recommendations.map(rec => `<li>${rec}</li>`).join('');
            
            resultsContent.innerHTML += `
                <div class="result-card">
                    <h3>${result.title}</h3>
                    <p>${result.explanation}</p>
                    <h4>Що можна зробити вже зараз:</h4>
                    <ul>${recommendationsHTML}</ul>
                </div>
            `;
        });
    }

    function showSupportModal(message) {
        modalText.textContent = message;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    // === Обробники подій ===
    startBtn.addEventListener('click', startTest);
    restartBtn.addEventListener('click', startTest);
    
    questionContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.option-btn');
        if (button) {
            handleAnswerSelection(button);
        }
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
});