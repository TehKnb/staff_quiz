import React, { useMemo, useState } from "react";

const roles = [
  "Таргетолог",
  "Рекрутер",
  "Менеджер з продажу",
  "Статист-аналітик",
  "Спеціаліст з технічної підтримки",
];


const startImage = "https://i.ibb.co/Cs1h5hkd/1.png";
const desktopBg = "https://i.ibb.co/yFJyQjjn/image.png";
const mobileBg = "https://i.ibb.co/KxwNvdpx/image.png";

const results = {
  "Таргетолог": {
    title: "Ви — Таргетолог",
    image: "https://i.ibb.co/7x8PgWh4/IMG-4521.jpg",
    text: "Ви поєднуєте аналітичне мислення з креативним підходом. Вам комфортно працювати з гіпотезами, тестуванням і оптимізацією результатів.",
  },
  "Рекрутер": {
    title: "Ви — Рекрутер",
    image: "https://i.ibb.co/zTHCF2gV/IMG-4522.jpg",
    text: "Ви добре орієнтуєтесь у людях і вмієте встановлювати контакт. Вам підходить робота, де важливо оцінювати потенціал і знаходити відповідність між кандидатом і компанією.",
  },
  "Менеджер з продажу": {
    title: "Ви — Менеджер з продажу",
    image: "https://i.ibb.co/tTWn6HC2/IMG-4523.jpg",
    text: "Ви орієнтовані на результат і вмієте переконувати. Вам комфортно працювати в динамічному середовищі та взаємодіяти з клієнтами.",
  },
  "Статист-аналітик": {
    title: "Ви — Статист-аналітик",
    image: "https://i.ibb.co/jPS7cmTd/IMG-4524.jpg",
    text: "Ви мислите структурно і звертаєте увагу на деталі. Вам важливо працювати з точними даними та знаходити логічні закономірності.",
  },
  "Спеціаліст з технічної підтримки": {
    title: "Ви — Спеціаліст з технічної підтримки",
    image: "https://i.ibb.co/dwPpBMCk/IMG-4526.jpg",
    text: "Ви уважні до деталей і вмієте спокійно працювати з запитами користувачів. Вам підходить роль, де важливо допомагати і пояснювати.",
  },
};

const questions = [
  {
    question: "Ви отримали складне завдання без інструкції. Що будете робити?",
    answers: [
      { text: "Починаю шукати закономірності, структурую інформацію", role: "Статист-аналітик" },
      { text: "Запитаю у колег, як вони це робили раніше", role: "Рекрутер" },
      { text: "Спробую одразу протестувати варіанти", role: "Менеджер з продажу" },
      { text: "Проаналізую, як це працює в системі, і зміню параметри", role: "Таргетолог" },
      { text: "Поділю завдання на частини і буду рухатись поступово", role: "Спеціаліст з технічної підтримки" },
    ],
  },
  {
    question: "Який тип задач вам дається найлегше?",
    answers: [
      { text: "Цифри, графіки, таблиці", role: "Статист-аналітик" },
      { text: "Спілкування з новими людьми", role: "Рекрутер" },
      { text: "Переконання та домовленості", role: "Менеджер з продажу" },
      { text: "Тестування і оптимізація процесів", role: "Таргетолог" },
      { text: "Вирішення технічних збоїв", role: "Спеціаліст з технічної підтримки" },
    ],
  },
  {
    question: "Як ви ухвалюєте рішення?",
    answers: [
      { text: "Після обговорення з іншими", role: "Рекрутер" },
      { text: "Крок за кроком пробую різні варіанти", role: "Спеціаліст з технічної підтримки" },
      { text: "Інтуїтивно та швидко", role: "Менеджер з продажу" },
      { text: "На основі даних і фактів", role: "Статист-аналітик" },
      { text: "Через гіпотези і тести", role: "Таргетолог" },
    ],
  },
  {
    question: "Уявіть, що вам дали суперсилу. Яку оберете?",
    answers: [
      { text: "Читати думки інших", role: "Рекрутер" },
      { text: "Миттєво знаходити причину проблеми", role: "Спеціаліст з технічної підтримки" },
      { text: "Впливати на рішення людей", role: "Менеджер з продажу" },
      { text: "Бачити приховані закономірності", role: "Статист-аналітик" },
      { text: "Передбачати, що спрацює краще", role: "Таргетолог" },
    ],
  },
  {
    question: "У групі людей ви частіше:",
    answers: [
      { text: "Спостерігаю і аналізую поведінку", role: "Статист-аналітик" },
      { text: "Одразу бачу, хто з ким подружиться", role: "Рекрутер" },
      { text: "Допомагаю вирішити конфліктні ситуації", role: "Спеціаліст з технічної підтримки" },
      { text: "Беру ініціативу і веду розмову", role: "Менеджер з продажу" },
      { text: "Тестую реакції людей", role: "Таргетолог" },
    ],
  },
  {
    question: "Ви бачите складну, заплутану ситуацію. Перша думка:",
    answers: [
      { text: "Тут десь технічна помилка", role: "Спеціаліст з технічної підтримки" },
      { text: "Це можна повернути собі на користь", role: "Менеджер з продажу" },
      { text: "Це можна перевірити різними способами", role: "Таргетолог" },
      { text: "Тут точно є прихована закономірність", role: "Статист-аналітик" },
      { text: "Це проблема взаємодії людей", role: "Рекрутер" },
    ],
  },
  {
    question: "Уявіть: вам дали новий проєкт. Що ви зробите першим?",
    answers: [
      { text: "Подивлюсь дані і цифри", role: "Статист-аналітик" },
      { text: "Запущу рекламу і протестую", role: "Таргетолог" },
      { text: "Подзвоню потенційним клієнтам", role: "Менеджер з продажу" },
      { text: "Почну шукати людей в команду", role: "Рекрутер" },
      { text: "Підготую відповіді на можливі питання", role: "Спеціаліст з технічної підтримки" },
    ],
  },
  {
    question: "Як ви працюєте під тиском?",
    answers: [
      { text: "Починаю шукати нових людей для допомоги", role: "Рекрутер" },
      { text: "Швидко змінюю стратегію", role: "Таргетолог" },
      { text: "Спокійно пояснюю і допомагаю", role: "Спеціаліст з технічної підтримки" },
      { text: "Проговорюю і вирішую питання", role: "Менеджер з продажу" },
      { text: "Аналізую і шукаю закономірності", role: "Статист-аналітик" },
    ],
  },
];

function StartView({ onStart }) {
  return (
    <section className="card start-card">
      <img className="start-image" src={startImage} alt="Квіз для кандидатів" />
      <h1>Не знаєте, яка вакансія вам підійде?</h1>
      <p>Пройдіть короткий квіз і дізнайтесь, яка роль може бути найближчою до вашого стилю мислення та роботи.</p>
      <button className="primary-button" onClick={onStart}>Старт</button>
    </section>
  );
}

function QuestionView({ question, currentIndex, total, onAnswer }) {
  return (
    <section className="card question-card">
      <div className="progress-text">Питання {currentIndex + 1} з {total}</div>
      <div className="progress-line">
        <div style={{ width: `${((currentIndex + 1) / total) * 100}%` }} />
      </div>
      <h2>{question.question}</h2>
      <div className="answers">
        {question.answers.map((answer) => (
          <button key={answer.text} className="answer-button" onClick={() => onAnswer(answer.role)}>
            {answer.text}
          </button>
        ))}
      </div>
    </section>
  );
}

function ResultView({ resultRole, onRestart }) {
  const result = results[resultRole];
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState(resultRole);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
  event.preventDefault();

  const lead = {
    name,
    position: selectedRole,
    phone,
    quizResult: resultRole,
    createdAt: new Date().toISOString(),
  };

  try {
    const response = await fetch('/api/keycrm-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lead)
    });

    if (!response.ok) {
      throw new Error('Помилка відправки заявки');
    }

    setSent(true);
  } catch (error) {
    console.error(error);
    alert('Не вдалося відправити заявку. Спробуйте ще раз.');
  }
};

  return (
    <section className="card result-card">
      <img className="result-image" src={result.image} alt={result.title} />
      <h1>{result.title}</h1>
      <p>{result.text}</p>

      <form className="lead-form" onSubmit={handleSubmit}>
        <h3>Залиште заявку</h3>

        <label>
          Імʼя
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ваше імʼя" required />
        </label>

        <label>
          Посада
          <select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} required>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </label>

        <label>
          Телефон
          <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Ваш номер телефону" required />
        </label>

        <button className="primary-button" type="submit">Надіслати</button>
        {sent && <div className="success-message">Дякуємо! Вашу заявку прийнято!</div>}
      </form>

      <button className="secondary-button" onClick={onRestart}>Пройти ще раз</button>
    </section>
  );
}

export default function App() {
  const [step, setStep] = useState("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(() => Object.fromEntries(roles.map((role) => [role, 0])));

  const resultRole = useMemo(() => {
    return roles.reduce((bestRole, role) => {
      return scores[role] > scores[bestRole] ? role : bestRole;
    }, roles[0]);
  }, [scores]);

  const handleStart = () => {
    setStep("quiz");
  };

  const handleAnswer = (role) => {
    setScores((prev) => ({
      ...prev,
      [role]: prev[role] + 1,
    }));

    if (currentQuestionIndex + 1 >= questions.length) {
      setStep("result");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setStep("start");
    setCurrentQuestionIndex(0);
    setScores(Object.fromEntries(roles.map((role) => [role, 0])));
  };

  return (
    <main className="app">
      {step === "start" && <StartView onStart={handleStart} />}
      {step === "quiz" && (
        <QuestionView
          question={questions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          total={questions.length}
          onAnswer={handleAnswer}
        />
      )}
      {step === "result" && <ResultView resultRole={resultRole} onRestart={handleRestart} />}
    </main>
  );
}

const style = document.createElement("style");
style.innerHTML = `
  * {
    box-sizing: border-box;
  }

body {
  margin: 0;
  font-family: Inter, Arial, sans-serif;
  color: #181818;
  min-height: 100vh;
  background: #fff;
  overflow-x: hidden;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;

  background-image: url("${desktopBg}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  transform: translateZ(0);
}
  .app {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 40px 24px;
    background: transparent;
  }

  .card {
    position: sticky;
    top: 24px;

    width: 100%;
    max-width: 620px;
      background: #ffffff;
    border: 2px solid #000;
    border-radius: 28px;
    padding: 28px;
    box-shadow: 0 24px 70px rgba(35, 29, 20, 0.14);
  }

  .start-card,
  .result-card {
    text-align: center;
  }

  .start-image,
  .result-image {
    width: 100%;
    max-height: 360px;
    object-fit: cover;
    border-radius: 22px;
    margin-bottom: 22px;
  }

  h1 {
    font-size: clamp(30px, 5vw, 48px);
    line-height: 1.04;
    margin: 0 0 14px;
    letter-spacing: -0.04em;
  }

  h2 {
    font-size: clamp(24px, 4vw, 34px);
    line-height: 1.15;
    margin: 18px 0 22px;
    letter-spacing: -0.03em;
  }

  p {
    font-size: 17px;
    line-height: 1.55;
    margin: 0 auto 22px;
    color: #4a4137;
  }

  .primary-button,
  .secondary-button,
  .answer-button {
    border: 0;
    cursor: pointer;
    font-family: inherit;
    transition: 0.2s ease;
  }

  .primary-button {
    width: 100%;
    padding: 17px 22px;
    border-radius: 999px;
    background: #181818;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
  }

  .primary-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
  }

  .secondary-button {
    margin-top: 16px;
    background: transparent;
    color: #181818;
    font-size: 15px;
    text-decoration: underline;
  }

  .progress-text {
    font-size: 14px;
    color: #766b5f;
    margin-bottom: 10px;
  }

  .progress-line {
    width: 100%;
    height: 8px;
    background: #e8dfd2;
    border-radius: 999px;
    overflow: hidden;
  }

  .progress-line div {
    height: 100%;
    background: #c1121f;
    border-radius: 999px;
    transition: width 0.25s ease;
  }

  .answers {
    display: grid;
    gap: 12px;
  }

.answer-button {
  width: 100%;
  padding: 17px 18px;
  border-radius: 18px;
  background: #ffffff;
  color: #181818;
  text-align: left;
  font-size: 16px;
  line-height: 1.35;
  border: 2px solid #000;
  transition: 0.2s ease;
}

  .answer-button:hover {
    background: #c1121f;
    color: #fff;
    border-color: #000;
    transform: translateY(-1px);
  }

  .lead-form {
    margin-top: 28px;
    padding: 20px;
    border-radius: 22px;
    background: #f7f1e8;
    text-align: left;
  }

  .lead-form h3 {
    margin: 0 0 16px;
    font-size: 22px;
  }

  label {
    display: grid;
    gap: 8px;
    margin-bottom: 14px;
    font-size: 14px;
    font-weight: 700;
  }

  input,
  select {
    width: 100%;
    padding: 15px 16px;
    border: 1px solid #ded1c1;
    border-radius: 14px;
    font-size: 16px;
    outline: none;
    background: #fff;
  }

  input:focus,
  select:focus {
    border-color: #181818;
  }

  .success-message {
    margin-top: 12px;
    padding: 12px;
    border-radius: 12px;
    background: #e6f5e9;
    color: #1c6b2a;
    font-size: 14px;
    text-align: center;
  }

  @media (max-width: 520px) {
    body::before {
      background-image: url("${mobileBg}");
      background-size: cover;
      background-position: center top;
      background-repeat: no-repeat;
    }

    .card {
      position: relative;
      top: unset;
    }

    .app {
      padding: 14px;
      align-items: flex-start;
    }

    .card {
      padding: 18px;
      border-radius: 22px;
    }

    .start-image,
    .result-image {
      max-height: 280px;
      border-radius: 18px;
    }
  }

  h1,
  h2,
  h3 {
    color: #181818 !important;
    -webkit-text-fill-color: #181818 !important;
    opacity: 1 !important;
    background: none !important;
    -webkit-background-clip: initial !important;
    background-clip: initial !important;
    text-shadow: none !important;
  }

  p,
  .progress-text,
  label {
    color: #181818 !important;
    -webkit-text-fill-color: #181818 !important;
    opacity: 1 !important;
  }

  :root {
    color-scheme: light;
  }
`;


document.head.appendChild(style);
