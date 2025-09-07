  const englishWords = [
    "scenario", "retest", "bugapi", "database ", "fixbug", "deploy", "deploy", "response", "module", "prototype", 
    "script", "push", "pull", "feature", "compiler", "fullflow", "build", "clone", "task", "commit", 
    "merge", "release", "security ", "stack", "error", "logic", "case", "verify", "syntax", "release", 
    "output", "optimize", "review", "sprint", "codebase", "design", "analyze", "recheck", "devops", 
    "server", "cloud", "patch", "version", "query", "branch", "framework", "robot", "process", 
    "integration", "agile", "frontend", "backend", "authorization", "docker", "functionality " ];
  
  const thaiWords = [
    "เหตุการณ์", "ตรวจสอบอีกรอบ", "บัคอีกครั้ง", "แก้ไขอีกรอบ", "ไม่ควรเกิด", "แอลกอฮอล์", "เดฟทั้งหมด", "การตอบสนอง", "แพทช์โน็ต", "ทดสอบผ่าน", 
    "สคริปต์", "ให้บริการ", "รวบรวม", "ฟีเจอร์", "ผู้ใช้ทดสอบ", "โฟลว์ระบบ", "รอบครอบ", "โคลนงาน", "เวชภัณฑ์", "เวชศาสตร์", 
    "ศีรษะ", "เปิดตัว", "วัยเจริญพันธุ์", "สเตตัส", "ข้อผิดพลาด", "ลอจิก", "แมนนวล", "ยืนยันอีกครั้ง", "หน่วยความจำ", 
    "อินพุต", "เอาต์พุต", "เพิ่มประสิทธิภาพ", "รีวิวงาน", "ความหน่วง", "ฟังก์ชัน", "การจำลอง", "วิเคราะห์", 
    "ตรวจสอบการพิมพ์", "ประสบการณ์", "เซิร์ฟเวอร์", "ข้อมูลคลาวด์", "แพทช์", "เวอร์ชัน", "ฐานข้อมูล", "ผ่านด้วยดี", "โครงสร้าง", 
    "โรบอท", "กระบวนการ", "ยูนิต", "เอไจล์"  ];
  let words = englishWords;

const gameContainer = document.getElementById("game-container");
const inputBox = document.getElementById("input-box");
const timeDisplay = document.getElementById("time");
const speedDisplay = document.getElementById("speed");
const accuracyDisplay = document.getElementById("accuracy");
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");
const resultDisplay = document.getElementById("resultgame");
const languageSelect = document.getElementById("language-select");
const startgame = document.getElementById("startgame");


// ปรับ style ให้อยู่ภายใน gameContainer
const styles = `
#game-container {
    position: relative;  /* เพิ่มเพื่อให้เป็นจุดอ้างอิงของ absolute positioning */
}

.countdown-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.countdown-number {
    font-size: 120px;
    color: white;
    animation: pulse 1s infinite;
}

.centered-result {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    text-align: center;
    min-width: 200px;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}
`;

// เพิ่ม style ลงใน document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

let timeLeft = 60;
let typedWords = 0;
let correctWords = 0;
let totalTyped = 0;
let incorrectAttempts = 0;
let gameInterval;

function getRandomPosition() {
    return {
        x: Math.random() * (gameContainer.clientWidth - 100),
        y: Math.random() * (gameContainer.clientHeight - 100)
    };
}

let usedWords = [];
function createWord() {
    if (usedWords.length === words.length) {
        // If all words have been used, reset the usedWords array
        usedWords = [];
    }

    // Pick a random word that hasn't been used yet
    let wordIndex;
    do {
        wordIndex = Math.floor(Math.random() * words.length);
    } while (usedWords.includes(wordIndex));

    usedWords.push(wordIndex); // Mark this word as used

    const wordElement = document.createElement("div");
    wordElement.classList.add("word");
    wordElement.textContent = words[wordIndex];
    const position = getRandomPosition();
    wordElement.style.left = `${position.x}px`;
    wordElement.style.top = `${position.y}px`;
    gameContainer.appendChild(wordElement);
}

function showCountdown() {
    return new Promise(resolve => {
        let count = 3;
        
        // สร้าง overlay สำหรับ countdown ภายใน gameContainer
        const overlay = document.createElement('div');
        overlay.className = 'countdown-overlay';
        const countElement = document.createElement('div');
        countElement.className = 'countdown-number';
        overlay.appendChild(countElement);
        gameContainer.appendChild(overlay);
        
        const countInterval = setInterval(() => {
            if (count > 0) {
                countElement.textContent = count;
                count--;
            } else {
                clearInterval(countInterval);
                overlay.remove();
                resolve();
            }
        }, 1000);
    });
}

function showCenteredResult(speed, accuracy) {
    const resultElement = document.createElement('div');
    resultElement.className = 'centered-result';
    resultElement.innerHTML = `
        <h2>Game Over!</h2>
        <h3>Speed: ${speed} WPM</h3>
        <h3>Accuracy: ${accuracy}% </h3>
        <h3>Total Words: ${typedWords}</h3>
    `;
    gameContainer.appendChild(resultElement);
}

function resetGame() {
    timeLeft = 60;
    typedWords = 0;
    correctWords = 0;
    totalTyped = 0;
    incorrectAttempts = 0;
    
    timeDisplay.textContent = timeLeft;
    speedDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";
    inputBox.value = "";
    
    // ล้างทุกอย่างใน gameContainer
    while (gameContainer.firstChild) {
        gameContainer.firstChild.remove();
    }
    
    // ซ่อนผลลัพธ์
    resultDisplay.style.display = "none";
    
    if (gameInterval) {
        clearInterval(gameInterval);
    }
}

async function startGame() {
    resetGame();
    startgame.disabled = true;
    
    // แสดง countdown ก่อนเริ่มเกม
    
    
    words = languageSelect.value === "thai" ? thaiWords : englishWords;
    gameContainer.style.display = "block";
    inputBox.disabled = false;
    inputBox.focus();
    await showCountdown();
    
    gameInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
        } else {
            clearInterval(gameInterval);
            inputBox.disabled = true;
            
            // ลบคำที่เหลือออกก่อนแสดงผล
            const remainingWords = document.querySelectorAll('.word');
            remainingWords.forEach(word => word.remove());
            
            // แสดงผลตรงกลาง gameContainer
            showCenteredResult(speedDisplay.textContent, accuracyDisplay.textContent);
            startgame.disabled = false;
        }
    }, 1000);
    
    createWord();
}

inputBox.addEventListener("input", () => {
    const activeWord = document.querySelector(".word");
    if (!activeWord) return;
    
    const currentInput = inputBox.value.trim();
    const targetWord = activeWord.textContent;
    
    if (currentInput.length > 0 && !targetWord.startsWith(currentInput)) {
        incorrectAttempts++;
    }
    
    if (currentInput === targetWord) {
        correctWords++;
        typedWords++;
        activeWord.style.transform = "scale(1.2)";
        setTimeout(() => activeWord.remove(), 200);
        createWord();
        inputBox.value = "";
        correctSound.play();
        
        const totalAttempts = correctWords + incorrectAttempts;
        const accuracy = Math.round((correctWords / totalAttempts) * 100) || 100;
        accuracyDisplay.textContent = Math.min(accuracy, 100);
        
        const speed = Math.round((typedWords / (60 - timeLeft)) * 60) || 0;
        speedDisplay.textContent = speed;
    }
});

