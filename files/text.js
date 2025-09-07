// Utility Functions

// Sets a default value of 1 if the input field is empty
function setDefaultValue(event) {
    if (event.target.value === '') {
        event.target.value = 1;
    }
    const input = event.target;
    if (parseInt(input.value) > 10000) {
      input.value = 10000;
    }
}

// Copies text to the clipboard and displays a confirmation message
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const message = document.getElementById('copyMessage');
    message.textContent = `คัดลอกข้อความ: "${text}" ไปยังคลิปบอร์ดเรียบร้อยแล้ว`;
}

// Updates character counts and displays them
function updateCounts() {
    const text = document.getElementById('textArea').value;
    const charCount = text.replace(/\s/g, '').length;
    const spaceCount = (text.match(/\s/g) || []).length;
    const totalCount = text.length;

    document.getElementById('charCount').textContent = `${charCount}`;
    document.getElementById('spaceCount').textContent = `${spaceCount}`;
    document.getElementById('totalCount').textContent = `${totalCount}`;
}

// Toggles the state of the generate button based on checkbox selections
function toggleGenerateButton() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const generateButton = document.getElementById('generateButton');

    const onlySpaceChecked = Array.from(checkboxes).every(checkbox => 
        checkbox.id === 'space' ? checkbox.checked : !checkbox.checked
    );

    const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    generateButton.disabled = !anyChecked || onlySpaceChecked;
}

// Toggles the state of the copy button based on textarea content
function toggleCopyButton() {
    const textArea = document.getElementById('textArea');
    const copyButton = document.getElementById('copyButton');
    copyButton.disabled = textArea.value.trim() === "";
}

function generateRandom(charCount) {
    const thaiChars = 'กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮ';
    const englishChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-={}[]|:;<>?,./`~';
    const spaces = ' ';
    
    let allowedChars = '';

    if (document.getElementById('th').checked) {
        allowedChars += thaiChars;
    }
    if (document.getElementById('en').checked) {
        allowedChars += englishChars;
    }
    if (document.getElementById('number').checked) {
        allowedChars += numbers;
    }
    if (document.getElementById('special').checked) {
        allowedChars += specialChars;
    }
    if (document.getElementById('space').checked) {
        allowedChars += spaces;
    }

    let result = '';
    for (let i = 0; i < charCount; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        result += allowedChars[randomIndex];
    }
    updateCounts();

    // Use setTimeout to ensure the UI updates before calling toggleCopyButton
    setTimeout(() => {
        toggleCopyButton();
    }, 0);

    return result;
}


// Copies text from JSON data to the textarea and updates the UI
function copyJsonData(key) {
    const jsonData = {
        "10": "หวัดดี kub",
        "50": "ยินดีต้อนรับเข้าสู่ประเทศไทย Welcome to Tester CAT",
        "100": "บริษัทเรามีชื่อเสียงในด้านคุณภาพ Our company is renowned for its quality and innovation ใช่มันสุดยอด",
        "255": "นักทดสอบซอฟต์แวร์ มีบทบาทสำคัญในการตรวจสอบคุณภาพของระบบและโปรแกรม เพื่อให้มั่นใจว่าซอฟต์แวร์ทำงานได้ตามที่กำหนด ไม่มีข้อผิดพลาดใดๆ การทดสอบที่ละเอียดและรอบคอบช่วยป้องกันปัญหาที่อาจเกิดขึ้นในอนาคต Ensuring quality software delivery is our top priority  255",
        "500": "นี้คือข้อความใช้ทดสอบความยาวจำนวน 500 ตัวอักษร โดยรวมทั้งไทยอังกฤษตัวเลขช่องว่างและอักษรพิเศษ จะเริ่มแล้วนะครับ ปัจจุบันนี้เทคโนโลยีมีบทบาทสำคัญในชีวิตประจำวันของเรา เราใช้เทคโนโลยีเพื่อการสื่อสาร การทำงาน การเรียนรู้ และความบันเทิง เทคโนโลยีไม่เพียงแต่ทำให้ชีวิตของเราสะดวกขึ้น แต่ยังช่วยเพิ่มประสิทธิภาพในการทำงานและการเรียนรู้ให้มีคุณภาพมากยิ่งขึ้น อย่างไรก็ตาม การใช้งานเทคโนโลยีอย่างมีประสิทธิภาพต้องอาศัยความรู้และการใช้งานอย่างถูกต้อง เพื่อให้ได้ประโยชน์สูงสุดจากการใช้เทคโนโลยีในชีวิตประจำวัน",
        ">10": "สวัสดีครับคนเทส10",
        ">50": "ความสำเร็จไม่ใช่จุดหมายปลายทาง แต่เป็นการเดินทางที่ยาวนาน50",
        ">100": "ความพยายามไม่เคยทรยศใคร จงทำวันนี้ให้ดีที่สุด เพื่อวันพรุ่งนี้ที่มีบัครอเราอยู่ susu ขยันวันนี้ สบายวันไหน100",
        ">255": "ชีวิตคือการเดินทางที่เต็มไปด้วยบทเรียน ทุกความล้มเหลวเป็นโอกาสในการเรียนรู้ ทุกความสำเร็จเป็นผลลัพธ์ของความพยายาม ไม่มีอะไรได้มาง่าย ๆ แต่ทุกอย่างสามารถทำได้หากเรามีความมุ่งมั่นและไม่ยอมแพ้ การเปลี่ยนแปลงเริ่มต้นที่ตัวเราเอง จงใช้เวลาทุกวันเพื่อสร้างอนาคตที่ดีกว่าเดิม255",
        "th": "การหาบัคก็เหมือนงมเข็มในมหาสมุทร",
        "en": "NoBugNoJob",
        "number": "12345678",
        "special": "@#$!&-=/><",
        "numberTHEN": "testไปทำไมถ้าไม่deploy555",
        "specialTHEN": "ได้โปรดfixbugpls@#$!&-=/><",
        "space": "อย่าให้มีบัครอบที่ 2"
    };

    const textToCopy = jsonData[key];
    if (textToCopy) {
        copyToClipboard(textToCopy);

        const textarea = document.getElementById('textArea');
        textarea.value = textToCopy;

        updateCounts();
        toggleCopyButton();
    }
}

// Event Listeners

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.copyButton').forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-key');
            copyJsonData(key);
        });
    });

    document.getElementById('generateButton').addEventListener('click', () => {
        const totalLength = parseInt(document.getElementById('charCountInput').value, 10);
        if (!isNaN(totalLength) && totalLength > 0) {
            const randomText = generateRandom(totalLength);
            document.getElementById('textArea').value = randomText;
            updateCounts();
        } else {
            alert('กรุณาระบุจำนวนตัวอักษรที่ถูกต้อง');
        }
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', toggleGenerateButton);
    });

    document.getElementById('textArea').addEventListener('input', updateCounts);

    // Initial state check
    toggleGenerateButton();
    toggleCopyButton();
});

// Copy and Clear Functions

function copyTextarea() {
    const textArea = document.getElementById('textArea');
    textArea.select();
    textArea.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(textArea.value)
        .then(() => {})
        .catch(err => {});
}

function clearTextarea() {
    const textarea = document.getElementById('textArea');
    const copyButton = document.getElementById('copyButton');
    
    textarea.value = '';
    copyButton.disabled = true;
    updateCounts();
}
