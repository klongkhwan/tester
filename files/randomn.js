function generateRandomID() {
    let id = '';
    let sum = 0;
    let weights = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    // สุ่มเลข 12 หลักแรก
    for (let i = 0; i < 12; i++) {
        let digit = Math.floor(Math.random() * 10);
        id += digit;
        sum += digit * weights[i];
    }

    // คำนวณหลักตรวจสอบ
    let checkDigit = (11 - (sum % 11)) % 10;
    id += checkDigit;

    return id;
}

function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

document.getElementById('generateBtn').addEventListener('click', function() {
    let randomID = generateRandomID();
    document.getElementById('result').innerText = randomID;
    copyToClipboard(randomID);

    // ซ่อนข้อความคัดลอกของชื่อและแสดงข้อความคัดลอกของเลขบัตร
    document.getElementById('copyMessagename').style.display = 'none';
    document.getElementById('copyMessagephone').style.display = 'none';
    document.getElementById('copyMessage').innerText = 'คัดลอกแล้ว!';
    document.getElementById('copyMessage').style.display = 'block';
});

let firstnames = [];
let lastnames = [];
let generatedName = ''; // เพื่อเก็บชื่อที่สุ่มได้

// โหลดข้อมูลจากไฟล์ JSON
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

function generateName() {
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

    // คัดลอกชื่อที่สุ่มได้ไปยังคลิปบอร์ด
    copyNameToClipboard();
}

function copyNameToClipboard() {
    if (!generatedName) {
        document.getElementById("resultname").innerText = "กรุณาสุ่มชื่อก่อน";
        return;
    }
    
    // สร้าง element ชั่วคราวเพื่อคัดลอกข้อความ
    const tempInput = document.createElement("input");
    tempInput.value = generatedName;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    // ซ่อนข้อความคัดลอกของเลขบัตรและแสดงข้อความคัดลอกของชื่อ
    document.getElementById('copyMessage').style.display = 'none';
    document.getElementById('copyMessagephone').style.display = 'none';
    document.getElementById('copyMessagename').innerText = 'คัดลอกแล้ว!';
    document.getElementById('copyMessagename').style.display = 'block';
}

// ตั้งค่าให้ radio button ภาษาไทยถูกเลือกโดยค่าเริ่มต้น
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('input[name="language"][value="thai"]').checked = true;
});



function generatePhoneNumber() {
    // กำหนดหลักที่สองให้สุ่มจาก 8 ถึง 9
    const secondDigit = Math.floor(Math.random() * 2) + 8;

    // สุ่มหลักที่เหลือเป็น 0 ถึง 9 จำนวน 8 หลัก
    const remainingDigits = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');

    // รวมหมายเลขโทรศัพท์ให้มีทั้งหมด 10 หลัก
    const phoneNumber = '0' + secondDigit + remainingDigits;

    // แสดงหมายเลขโทรศัพท์ในหน้าเว็บ
    document.getElementById('resultphone').textContent = phoneNumber;

    // คัดลอกหมายเลขโทรศัพท์ไปยังคลิปบอร์ด
    const tempInput = document.createElement('input');
    tempInput.value = phoneNumber;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // แสดงข้อความคัดลอก
    document.getElementById('copyMessage').style.display = 'none';
    document.getElementById('copyMessagename').style.display = 'none';
    document.getElementById('copyMessagephone').innerText = 'คัดลอกแล้ว!';
    document.getElementById('copyMessagephone').style.display = 'block';
}
