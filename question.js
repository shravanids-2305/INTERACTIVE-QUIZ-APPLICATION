const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: 3
  }
];

let index = 0;
let score = 0;
let time = 15;
let timer;
let status = Array(questions.length).fill("pending");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const skipBtn = document.getElementById("skipBtn");
const timeEl = document.getElementById("time");
const quizCard = document.getElementById("quizCard");
const summaryEl = document.getElementById("summary");

function renderSummary(){
  summaryEl.innerHTML = "";
  status.forEach((s, i) => {
    const dot = document.createElement("span");
    if(i === index) dot.classList.add("current");
    if(s === "done") dot.classList.add("done");
    if(s === "skipped") dot.classList.add("skipped");
    summaryEl.appendChild(dot);
  });
}

function startTimer(){
  time = 15;
  timeEl.textContent = time;

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if(time === 0){
      clearInterval(timer);
      skipQuestion();
    }
  }, 1000);
}

function loadQuestion(){
  quizCard.classList.remove("fade");
  void quizCard.offsetWidth;
  quizCard.classList.add("fade");

  feedbackEl.textContent = "";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";

  const q = questions[index];
  questionEl.textContent = q.question;

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, btn);
    optionsEl.appendChild(btn);
  });

  renderSummary();
  startTimer();
}

function checkAnswer(selected, btn){
  clearInterval(timer);
  const correct = questions[index].answer;
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);

  if(selected === correct){
    btn.classList.add("correct");
    feedbackEl.textContent = "Correct!";
    score++;
  }else{
    btn.classList.add("wrong");
    buttons[correct].classList.add("correct");
    feedbackEl.textContent = "Wrong!";
  }

  status[index] = "done";
  nextBtn.style.display = "block";
  renderSummary();
}

function skipQuestion(){
  status[index] = "skipped";
  nextStep();
}

function nextStep(){
  clearInterval(timer);
  index++;
  if(index < questions.length){
    loadQuestion();
  }else{
    showResult();
  }
}

skipBtn.onclick = skipQuestion;
nextBtn.onclick = nextStep;

function showResult(){
  const done = status.filter(s => s === "done").length;
  const skipped = status.filter(s => s === "skipped").length;

  quizCard.innerHTML = `
    <div class="result">
      <h1>Quiz Summary 📊</h1>
      <p>Score: <b>${score}/${questions.length}</b></p>
      <p>Completed: <b>${done}</b></p>
      <p>Skipped: <b>${skipped}</b></p>
      <p>Percentage: <b>${Math.round((score/questions.length)*100)}%</b></p>
      <br>

      <button class="retry-btn" id="retryBtn">Retry Quiz</button>
      <br><br>

      <a href="index.html" style="color:white;text-decoration:underline;">
        Back to Home
      </a>
    </div>
  `;

  document.getElementById("retryBtn").onclick = restartQuiz;



  quizCard.innerHTML = `
    <div class="result">
      <h1>Quiz Summary 📊</h1>
      <p>Score: <b>${score}/${questions.length}</b></p>
      <p>Completed: <b>${done}</b></p>
      <p>Skipped: <b>${skipped}</b></p>
      <p>Percentage: <b>${Math.round((score/questions.length)*100)}%</b></p>
      <br>
      <a href="index.html" style="color:white;text-decoration:underline;">
        Back to Home
      </a>
    </div>
  `;
}

loadQuestion();
