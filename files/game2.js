
        function playHitSound() {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // สูง
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        }

        function playMissSound() {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // ต่ำ
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
        }

        const container = document.getElementById('game-container');
        const startScreen = document.getElementById('start-screen');
        const scoreElement = document.getElementById('score');
        const gameOverElement = document.getElementById('game-over');
        const finalScoreElement = document.getElementById('final-score');
        let score = 0;
        let gameSpeed = 1000; // เริ่มต้นที่ 1 วินาที
        let gameInterval;
        let currentLanguage = '';

        const colors = [
            '#e74c3c', // แดง
            '#3498db', // น้ำเงิน
            '#2ecc71', // เขียว
            '#f39c12', // ส้ม
            '#9b59b6'  // ม่วง
        ];

        function startGame2(language) {
            currentLanguage = language;
            startScreen.style.display = 'none';
            container.style.display = 'block';
            gameOverElement.style.display = 'none';
            score = 0;
            scoreElement.textContent = 'คะแนน: 0';
            gameSpeed = 1000;
            startLetterFall();
        }

        function generateLetter() {
            if (currentLanguage === 'english') {
                // A-Z
                return String.fromCharCode(65 + Math.floor(Math.random() * 26));
            } else {
                // ก-ฮ
                return String.fromCharCode(3585 + Math.floor(Math.random() * 44));
            }
        }

        function startLetterFall() {
            gameInterval = setInterval(createLetter, gameSpeed);
        }

        function createLetter() {
            const letter = document.createElement('div');
            letter.classList.add('letter');
            letter.textContent = generateLetter();
            letter.style.left = `${Math.random() * (container.clientWidth - 30)}px`;
            letter.style.color = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(letter);

            let position = 0;
            const fallInterval = setInterval(() => {
                position += 10;
                letter.style.top = `${position}px`;

                // ถ้าตัวอักษรตกถึงพื้น
                if (position > container.clientHeight) {
                    clearInterval(fallInterval);
                    container.removeChild(letter);
                    playMissSound();
                    endGame();
                }
            }, gameSpeed / 10);

            letter.addEventListener('click', () => {
                clearInterval(fallInterval);
                letter.classList.add('hit-effect');
                setTimeout(() => {
                    container.removeChild(letter);
                }, 300);
                playHitSound();
                updateScore();
            });
        }

        function updateScore() {
            score++;
            scoreElement.textContent = `คะแนน: ${score}`;
            
            // เพิ่มความเร็วทุก 5 คะแนน
            if (score % 5 === 0) {
                gameSpeed = Math.max(200, gameSpeed - 100);
                clearInterval(gameInterval);
                startLetterFall();
            }
        }

        function endGame() {
            clearInterval(gameInterval);
            finalScoreElement.textContent = `คะแนน: ${score}`;
            gameOverElement.style.display = 'flex';
        }

        function restartGame2() {
            gameOverElement.style.display = 'none';
            container.style.display = 'none';
            startScreen.style.display = 'block';
        }

        // รับค่าจากแป้นพิมพ์
        document.addEventListener('keydown', (event) => {
            if (container.style.display === 'none') return;

            const letters = document.querySelectorAll('.letter');
            letters.forEach(letter => {
                if (letter.textContent === event.key.toUpperCase()) {
                    letter.classList.add('hit-effect');
                    setTimeout(() => {
                        letter.remove();
                    }, 300);
                    playHitSound();
                    updateScore();
                }
            });
        });
