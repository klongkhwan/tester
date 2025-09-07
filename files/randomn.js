// randomn.js - ไฟล์สำหรับการจัดการฟังก์ชันสุ่มข้อมูลต่างๆ

// ตัวแปรสำหรับการสุ่มชื่อ
let firstnames = [];
let lastnames = [];
let generatedName = ''; // เพื่อเก็บชื่อที่สุ่มได้

// โหลดข้อมูลจากไฟล์ JSON สำหรับชื่อ
document.addEventListener('DOMContentLoaded', function() {
    fetch('files/names.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {
            firstnames = json.firstname;
            lastnames = json.lastname;
        })
        .catch(error => console.error('Error loading JSON:', error));
        
    // ตั้งค่าให้ radio button ภาษาไทยถูกเลือกโดยค่าเริ่มต้น
    document.querySelector('input[name="language"][value="thai"]').checked = true;
    
    // ตั้งค่าฟังก์ชันคัดลอกสำหรับทุกหมวด
    setupCopyFunctionality('resultcard', 'copyMessageidcard');
    setupCopyFunctionality('resultphone', 'copyMessagephone');
    setupCopyFunctionality('emailResult', 'copyMessageEmail');
    setupCopyFunctionality('dateResult', 'copyMessageDate');
    setupCopyFunctionality('resultname', 'copyMessagename');
});

document.getElementById('generateCardBtn').addEventListener('click', function () {
    let idCard = '';

    // สุ่มหลักแรก (ประเภทบุคคล 1-8)
    idCard += Math.floor(Math.random() * 8) + 1;

    // สุ่มหลักที่ 2-12
    for (let i = 1; i < 12; i++) {
        idCard += Math.floor(Math.random() * 10);
    }

    // คำนวณเลขหลักที่ 13 (Check Digit)
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(idCard[i]) * (13 - i);
    }

    let remainder = sum % 11;
    let checkDigit = (11 - remainder) % 10;

    idCard += checkDigit;

    // แสดงผลลัพธ์
    document.getElementById('resultcard').textContent = idCard;

    // คัดลอกไปยังคลิปบอร์ด
    copyToClipboard(idCard, 'copyMessageidcard');
});



// ฟังก์ชันสำหรับสุ่มเบอร์โทรศัพท์
document.getElementById('generatePhoneBtn').addEventListener('click', function() {
    // เริ่มต้นด้วย 08, 09, 06
    const prefixes = ['08', '09', '06'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    
    // สร้างเบอร์โทรศัพท์ที่เหลือ
    let phoneNumber = prefix;
    for (let i = 0; i < 8; i++) {
        phoneNumber += Math.floor(Math.random() * 10);
    }
    
    // แสดงผลในรูปแบบ 0xx-xxx-xxxx
    const formattedPhone = phoneNumber.substring(0, 3) + '-' + 
                          phoneNumber.substring(3, 6) + '-' + 
                          phoneNumber.substring(6);
    
    document.getElementById('resultphone').textContent = formattedPhone;
    copyToClipboard(formattedPhone, 'copyMessagephone');
});

// ฟังก์ชันสำหรับสุ่มอีเมล
document.getElementById('generateEmailBtn').addEventListener('click', function() {
    const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
    // สร้างชื่อผู้ใช้
    let username = '';
    const usernameLength = Math.floor(Math.random() * 8) + 5; // ความยาว 5-12 ตัวอักษร
    
    for (let i = 0; i < usernameLength; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // สุ่มโดเมน
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    // สร้างอีเมล
    const email = username + '@' + domain;
    
    document.getElementById('emailResult').textContent = email;
    copyToClipboard(email, 'copyMessageEmail');
});

// ฟังก์ชันสำหรับสุ่มวันที่
document.getElementById('generateDateBtn').addEventListener('click', function() {
    // สุ่มปีระหว่าง 1970-2025
    const year = Math.floor(Math.random() * (2015 - 1990 + 1)) + 1970;
    
    // สุ่มเดือน 1-12
    const month = Math.floor(Math.random() * 12) + 1;
    
    // กำหนดจำนวนวันในแต่ละเดือน
    let maxDay;
    if (month === 2) {
        // เดือนกุมภาพันธ์ ตรวจสอบปีอธิกสุรทิน
        maxDay = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
        maxDay = 30;
    } else {
        maxDay = 31;
    }
    
    // สุ่มวัน
    const day = Math.floor(Math.random() * maxDay) + 1;
    
    // จัดรูปแบบวันที่ DD/MM/YYYY
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    
    document.getElementById('dateResult').textContent = formattedDate;
    copyToClipboard(formattedDate, 'copyMessageDate');
    
});

// ฟังก์ชันสำหรับสุ่มชื่อ
document.getElementById('generateNameBtn').addEventListener('click', function() {
    if (firstnames.length === 0 || lastnames.length === 0) {
        document.getElementById("resultname").innerText = "ข้อมูลยังไม่โหลด";
        return;
    }

    const selectedLanguage = document.querySelector('input[name="language"]:checked').value;

    let firstname = '';
    let lastname = '';

    // สุ่มชื่อและนามสกุลตามการเลือกภาษา
    if (selectedLanguage === 'thai') {
        // สุ่มชื่อและนามสกุลภาษาไทย
        const randomFirstName = firstnames[Math.floor(Math.random() * firstnames.length)];
        const randomLastName = lastnames[Math.floor(Math.random() * lastnames.length)];
        firstname = randomFirstName.th;
        lastname = randomLastName.th;
    } else if (selectedLanguage === 'english') {
        // สุ่มชื่อและนามสกุลภาษาอังกฤษ
        const randomFirstName = firstnames[Math.floor(Math.random() * firstnames.length)];
        const randomLastName = lastnames[Math.floor(Math.random() * lastnames.length)];
        firstname = randomFirstName.en;
        lastname = randomLastName.en;
    } else {
        firstname = "กรุณาเลือกภาษาของชื่อ";
        lastname = "";
    }

    generatedName = `${firstname} ${lastname}`;
    document.getElementById("resultname").innerText = generatedName;
    copyToClipboard(generatedName, 'copyMessagename');
});

// ฟังก์ชันสำหรับคัดลอกข้อความ
function setupCopyFunctionality(resultId, copyMessageId) {
    document.getElementById(resultId).addEventListener('click', function() {
        const text = this.textContent;
        if (text && !text.includes('คลิกปุ่ม Random')) {
            navigator.clipboard.writeText(text).then(() => {
                // ซ่อนข้อความคัดลอกทั้งหมดก่อน
                hideAllCopyMessages();
                
                // แสดงข้อความคัดลอกของหมวดนี้
                const copyMessage = document.getElementById(copyMessageId);
                copyMessage.style.display = 'block';
                setTimeout(() => {
                    copyMessage.style.display = 'none';
                }, 3000);
            });
        }
    });
}

// ฟังก์ชันสำหรับซ่อนข้อความคัดลอกทั้งหมด
function hideAllCopyMessages() {
    document.getElementById('copyMessageidcard').style.display = 'none';
    document.getElementById('copyMessagephone').style.display = 'none';
    document.getElementById('copyMessageEmail').style.display = 'none';
    document.getElementById('copyMessageDate').style.display = 'none';
    document.getElementById('copyMessagename').style.display = 'none';
}

function generateCardOnly() {
    let idCard = "";
    for (let i = 0; i < 13; i++) {
        idCard += Math.floor(Math.random() * 10);
    }
    document.getElementById('resultcard').textContent = idCard;
}

function generatePhoneOnly() {
    const prefixes = ['08', '09', '06'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    let phoneNumber = prefix;
    for (let i = 0; i < 8; i++) {
        phoneNumber += Math.floor(Math.random() * 10);
    }

    const formattedPhone = phoneNumber.substring(0, 3) + '-' + 
                          phoneNumber.substring(3, 6) + '-' + 
                          phoneNumber.substring(6);
    
    document.getElementById('resultphone').textContent = formattedPhone;
}

function generateEmailOnly() {
    const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    let username = '';
    const usernameLength = Math.floor(Math.random() * 8) + 5;
    for (let i = 0; i < usernameLength; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const domain = domains[Math.floor(Math.random() * domains.length)];
    const email = username + '@' + domain;

    document.getElementById('emailResult').textContent = email;
}

function generateDateOnly() {
    const year = Math.floor(Math.random() * (2025 - 1970 + 1)) + 1970;
    const month = Math.floor(Math.random() * 12) + 1;

    let maxDay;
    if (month === 2) {
        maxDay = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
        maxDay = 30;
    } else {
        maxDay = 31;
    }

    const day = Math.floor(Math.random() * maxDay) + 1;
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    document.getElementById('dateResult').textContent = formattedDate;
}

function generateNameOnly() {
    if (firstnames.length === 0 || lastnames.length === 0) {
        document.getElementById("resultname").innerText = "ข้อมูลยังไม่โหลด";
        return;
    }

    const selectedLanguage = document.querySelector('input[name="language"]:checked').value;

    let firstname = '';
    let lastname = '';

    if (selectedLanguage === 'thai') {
        const randomFirstName = firstnames[Math.floor(Math.random() * firstnames.length)];
        const randomLastName = lastnames[Math.floor(Math.random() * lastnames.length)];
        firstname = randomFirstName.th;
        lastname = randomLastName.th;
    } else if (selectedLanguage === 'english') {
        const randomFirstName = firstnames[Math.floor(Math.random() * firstnames.length)];
        const randomLastName = lastnames[Math.floor(Math.random() * lastnames.length)];
        firstname = randomFirstName.en;
        lastname = randomLastName.en;
    } else {
        firstname = "กรุณาเลือกภาษาของชื่อ";
        lastname = "";
    }

    generatedName = `${firstname} ${lastname}`;
    document.getElementById("resultname").innerText = generatedName;
}


document.getElementById('generateAllBtn').addEventListener('click', function() {
    generateCardOnly();
    generatePhoneOnly();
    generateEmailOnly();
    generateDateOnly();
    generateNameOnly();
});



function copyToClipboard(text, messageId) {
    navigator.clipboard.writeText(text).then(() => {
        hideAllCopyMessages();
        const message = document.getElementById(messageId);
        if (message) {
            message.style.display = 'block';
            setTimeout(() => {
                message.style.display = 'none';
            }, 2000);
        }
    });
}
