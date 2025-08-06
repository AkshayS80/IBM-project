// Tab Navigation
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const target = tab.dataset.target;
    panels.forEach(panel => panel.classList.toggle('hidden', panel.id !== target));
  });
});

// Hide all panels except 'resources' on load
panels.forEach(panel => {
  if (panel.id !== 'resources') panel.classList.add('hidden');
});

// Level Selection
const levelButtons = document.querySelectorAll('.level');
const quizContainer = document.getElementById('quiz-container');
const startBtn = document.getElementById('start-btn');
const quizForm = document.getElementById('quiz-form');
const scoreBox = document.getElementById('score');
const timer = document.getElementById('timer');

let quizzes = {};
let selectedLevel = 'basic';
let timeLeft = 60;
let timerInterval;

const levelToFile = {
  basic: './data/ComQ_Basic.json',
  intermediate: './data/CompQ_Intermediate.json',
  advanced: './data/ComQ_Advanced.json'
};

function showLevel(level) {
  selectedLevel = level;
  levelButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.level === level));
}

levelButtons.forEach(btn =>
  btn.addEventListener('click', () => showLevel(btn.dataset.level))
);

showLevel('basic');

// Format seconds to mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


// Timer
function startTimer() {
  timeLeft = 1800; // 30 minutes
  scoreBox.textContent = '';
  scoreBox.classList.add('hidden');
  timer.textContent = `Time: ${formatTime(timeLeft)}`;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = `Time: ${formatTime(timeLeft)}`;
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

// Flatten and randomize questions
function flattenQuestions(data, level) {
  const topics = data[level];
  const allQuestions = [];

  for (let topic in topics) {
    topics[topic].forEach(q => {
      allQuestions.push({
        ...q,
        topic,
        name: '' // name will be assigned after shuffle
      });
    });
  }

  const selected = allQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, 12);

  selected.forEach((q, i) => (q.name = `q${i + 1}`));
  return selected;
}

// Start Quiz
startBtn.addEventListener('click', () => {
  quizForm.classList.remove('hidden');
  startBtn.classList.remove('submit-btn');
  startBtn.classList.add('hidden');

  fetch(levelToFile[selectedLevel])
    .then(res => res.json())
    .then(data => {
      console.log("selectedLevel:", selectedLevel);
      quizzes[selectedLevel] = flattenQuestions(data, selectedLevel);
      const selectedQuiz = quizzes[selectedLevel];

      console.log("selectedQuiz:", selectedQuiz);
      quizContainer.innerHTML = '';

      selectedQuiz.forEach(q => {
        const block = document.createElement('div');
        block.className = 'question';

        const qText = document.createElement('p');
        qText.innerHTML = `<strong>${q.question}</strong>`;
        block.appendChild(qText);

        q.options.forEach(opt => {
          const label = document.createElement('label');
          label.innerHTML = `<input type="radio" name="${q.name}" value="${opt}"> ${opt}`;
          block.appendChild(label);
          block.appendChild(document.createElement('br'));
        });

        quizContainer.appendChild(block);
      });

      startTimer();
    })
    .catch(err => console.error("Failed to load quiz data:", err));
});

// Submit Quiz Handler
quizForm.addEventListener('submit', function (e) {
  e.preventDefault();
  submitQuiz();
});

// Submit Quiz
function submitQuiz() {
  clearInterval(timerInterval);

  const currentQuestions = quizzes[selectedLevel];
  let score = 0;
  const wrongTopics = {};

  currentQuestions.forEach(q => {
    const selected = document.querySelector(`input[name="${q.name}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    } else {
      if (!wrongTopics[q.topic]) wrongTopics[q.topic] = 0;
      wrongTopics[q.topic]++;
    }
  });

  quizForm.classList.add('hidden');
  quizContainer.innerHTML = '';

  startBtn.classList.add('submit-btn');
  startBtn.classList.remove('hidden');

  scoreBox.textContent = `Your score: ${score}/${currentQuestions.length}`;
  scoreBox.classList.remove('hidden');

  timer.textContent = 'Time: --';

  // Send result to Relay 
  sendToRelay(
    score, 
    currentQuestions.length, 
    selectedLevel, 
    'Computer Science', 
    Object.keys(wrongTopics)

  );
// Show confirmation message after Relay
const emailNotice = document.createElement("p");
emailNotice.textContent = "📬 A learning plan has been sent to your email.";
emailNotice.style.marginTop = "10px";
emailNotice.style.fontWeight = "bold";
emailNotice.style.color = "#2e7d32";
document.getElementById("score").appendChild(emailNotice);
};
// Send Results to Relay (Async)
async function sendToRelay(score, total, level, subject, weakTopics) {
  
  const savedEmail = localStorage.getItem('userEmail');
    console.log("🚨 Debug - sending to Relay:");
  console.log("subject:", subject);
  console.log("level:", level);
  console.log("score:", score);
  console.log("total:", total);
  console.log("weakTopics:", weakTopics);
  console.log("savedEmail:", savedEmail);

  const payload = {
    subject,
    level,
    score,
    total,
    weakTopics: weakTopics,
    savedEmail: savedEmail,
    timestamp: new Date().toISOString()
  };

  console.log("Sending payload to Relay:", payload); // DEBUG
  console.log("🚨 Debug - sending to Relay:");
console.log("subject:", subject);
console.log("level:", level);
console.log("score:", score);
console.log("total:", total);
console.log("weakTopics:", weakTopics);
console.log("savedEmail:", savedEmail);


  try {
    const response = await fetch("https://hook.relay.app/api/v1/playbook/cmdvb5at35fkf0om673rzdg35/trigger/JyBS9CCKlwm3F66AjZUYfA", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Relay failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Relay response:", result); // DEBUG

    if (result.pdfLink) {
      const pdfDiv = document.createElement("div");
      pdfDiv.innerHTML = `<a href="${result.pdfLink}" target="_blank" class="btn">Download Practice PDF</a>`;
      document.getElementById("score").appendChild(pdfDiv);
    } else if (result.summary || result.plan) {
      const summaryDiv = document.createElement("div");
      summaryDiv.innerHTML = `
        <p><strong>Summary:</strong> ${result.summary}</p>
        <p><strong>Learning Plan:</strong> ${result.plan}</p>
      `;
      document.getElementById("score").appendChild(summaryDiv);
    }

  } catch (err) {
    console.error("Error sending to Relay:", err);
  }
}
