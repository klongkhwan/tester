document.addEventListener('DOMContentLoaded', function () {
    const inputYears = document.getElementById('inputyears');
    const inputMonths = document.getElementById('inputmonths');
    const inputDays = document.getElementById('inputdays');
    const resultYear = document.getElementById('resultyear');

    function calculateBirthDate() {
        const currentDate = new Date(); // วันที่ปัจจุบัน
        let birthDate = new Date(currentDate); // คัดลอกวันที่ปัจจุบันมาใช้

        // ดึงค่าที่ผู้ใช้กรอก (ถ้าไม่มีให้ใช้ 0)
        const ageYears = parseInt(inputYears.value) || 0;
        const ageMonths = parseInt(inputMonths.value) || 0;
        const ageDays = parseInt(inputDays.value) || 0;

        // ลบอายุปีออกจากวันที่ปัจจุบัน
        birthDate.setFullYear(birthDate.getFullYear() - ageYears);

        // ลบอายุเดือน (ถ้าเกินขอบเขตของเดือนจะถูกปรับอัตโนมัติ)
        birthDate.setMonth(birthDate.getMonth() - ageMonths);

        // ลบอายุวัน
        birthDate.setDate(birthDate.getDate() - ageDays);

        // ปรับวันที่ในกรณีที่ลบแล้ววันที่เกินขอบเขตของเดือน
        if (birthDate.getDate() !== (currentDate.getDate() - ageDays)) {
            birthDate.setDate(0); // กลับไปวันสุดท้ายของเดือนก่อนหน้า
        }

        // คำนวณปี ค.ศ. และ พ.ศ.
        const birthYearAD = birthDate.getFullYear(); // ค.ศ.
        const birthYearBE = birthYearAD + 543; // พ.ศ.
        const birthMonth = String(birthDate.getMonth() + 1).padStart(2, '0'); // เดือน (01-12)
        const birthDay = String(birthDate.getDate()).padStart(2, '0'); // วัน (01-31)

        // ตรวจสอบว่ามีค่าที่ถูกกรอกหรือไม่
        if (ageYears > 0 || ageMonths > 0 || ageDays > 0) {
            resultYear.textContent = `ปีเกิด ${birthDay}/${birthMonth}/${birthYearBE} หรือ ${birthYearAD}`;
        } else {
            resultYear.textContent = "กรุณากรอกอายุ (ปี, เดือน หรือ วัน อย่างน้อย 1 ค่า)";
        }
    }

    // Event listener ให้คำนวณเมื่อมีการป้อนค่า
    inputYears.addEventListener('input', calculateBirthDate);
    inputMonths.addEventListener('input', calculateBirthDate);
    inputDays.addEventListener('input', calculateBirthDate);
});



// ฟังก์ชันสำหรับการเปลี่ยน maxlength ตามรูปแบบที่เลือก
document.querySelectorAll('input[name="timeFormat"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        const selectedFormat = document.querySelector('input[name="timeFormat"]:checked').value;
        const timeInput = document.getElementById('timeInput');

        if (selectedFormat === 'format1') {
            timeInput.setAttribute('maxlength', '14');
            timeInput.setAttribute('placeholder', 'YYYYMMDDHHMMSS (14 หลัก)');
        } else if (selectedFormat === 'format2') {
            timeInput.setAttribute('maxlength', '30');
            timeInput.setAttribute('placeholder', '(2024-08-30 09:24:41.284867+00) (30 หลัก)');
        }
    });
});

// ฟังก์ชันสำหรับการเปลี่ยน maxlength ตามรูปแบบที่เลือก และล้างค่า input
document.querySelectorAll('input[name="timeFormat"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
        const selectedFormat = document.querySelector('input[name="timeFormat"]:checked').value;
        const timeInput = document.getElementById('timeInput');

        // ล้างค่า input text
        timeInput.value = '';

        if (selectedFormat === 'format1') {
            timeInput.setAttribute('maxlength', '14');
            timeInput.setAttribute('placeholder', 'YYYYMMDDHHMMSS (14 หลัก)');
        } else if (selectedFormat === 'format2') {
            timeInput.setAttribute('maxlength', '30');
            timeInput.setAttribute('placeholder', 'Database Time (30 หลัก)');
        } else if (selectedFormat === 'format3') {
            timeInput.setAttribute('maxlength', '10');
            timeInput.setAttribute('placeholder', 'Timestamp (10 หลัก)');
        }

        // ล้างข้อความแสดงผล
        document.getElementById('resultconvertdate').innerText = '';
    });
});

// ฟังก์ชันสำหรับการแปลงวันที่และเวลา
document.getElementById('timeInput').addEventListener('input', function() {
    const timeInput = this.value;
    const selectedFormat = document.querySelector('input[name="timeFormat"]:checked').value;

    if (selectedFormat === 'format1') {
        if (timeInput.length === 14) {
            const year = timeInput.substring(0, 4);
            const month = timeInput.substring(4, 6);
            const day = timeInput.substring(6, 8);
            const hour = timeInput.substring(8, 10);
            const minute = timeInput.substring(10, 12);
            const second = timeInput.substring(12, 14);

            const formattedTime = `วันที่ ${day}/${month}/${year} เวลา ${hour}:${minute}:${second}`;
            document.getElementById('resultconvertdate').innerText = formattedTime;
        } else {
            document.getElementById('resultconvertdate').innerText = "รูปแบบเวลาผิดพลาด";
        }
    } else if (selectedFormat === 'format2') {
        try {
            const date = new Date(timeInput);
            const options = {
                timeZone: 'Asia/Bangkok',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            const formattedTime = date.toLocaleString('th-TH', options);
            document.getElementById('resultconvertdate').innerText = `เวลาไทย: ${formattedTime}`;
        } catch (error) {
            document.getElementById('resultconvertdate').innerText = "รูปแบบเวลาผิดพลาด";
        }
    } else if (selectedFormat === 'format3') {
        try {
            const unixTimestamp = parseInt(timeInput, 10);
            if (!isNaN(unixTimestamp)) {
                const date = new Date(unixTimestamp * 1000); // คูณด้วย 1000 เพื่อเปลี่ยนจากวินาทีเป็นมิลลิวินาที
                const options = {
                    timeZone: 'Asia/Bangkok',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                };
                const formattedTime = date.toLocaleString('th-TH', options);
                document.getElementById('resultconvertdate').innerText = `เวลาไทย: ${formattedTime}`;
            } else {
                document.getElementById('resultconvertdate').innerText = "Timestamp ไม่ถูกต้อง";
            }
        } catch (error) {
            document.getElementById('resultconvertdate').innerText = "เกิดข้อผิดพลาดในการแปลง Unix Timestamp";
        }
    }
});


function validateInput(inputId, maxValue) {
    const inputElement = document.getElementById(inputId);
    if (inputElement.value > maxValue) {
        inputElement.value = maxValue;
    } else if (inputElement.value < 0) {
        inputElement.value = 0;
    }
}

function calculateDate() {
    validateInput('inputmonths', 11);
    validateInput('inputdays', 30);
    validateInput('inputyears', 100);

    const currentDate = new Date();
    const years = parseInt(document.getElementById('inputyears').value) || 0;
    const months = parseInt(document.getElementById('inputmonths').value) || 0;
    const days = parseInt(document.getElementById('inputdays').value) || 0;

    let targetDate = new Date(currentDate);
    targetDate.setFullYear(targetDate.getFullYear() - years);
    targetDate.setMonth(targetDate.getMonth() - months);
    targetDate.setDate(targetDate.getDate() - days);

    let resultDate = targetDate.getDate() + "/" + (targetDate.getMonth() + 1) + "/" + (targetDate.getFullYear() + 543);

    document.getElementById('resultyear').innerText = resultDate;
}

document.getElementById('inputyears').addEventListener('input', calculateDate);
document.getElementById('inputmonths').addEventListener('input', calculateDate);
document.getElementById('inputdays').addEventListener('input', calculateDate);

// BMI
function validateInputbmi(input) {
    input.value = input.value.replace(/[^0-9.]/g, ""); // อนุญาตเฉพาะตัวเลขและจุดทศนิยม
    let parts = input.value.split(".");
    if (parts.length > 2) {
        input.value = parts[0] + "." + parts[1]; // จำกัดจุดทศนิยมให้มีได้เพียงจุดเดียว
    }
    if (parts[0].length > 3) {
        input.value = parts[0].slice(0, 3) + (parts[1] ? "." + parts[1] : ""); // จำกัดให้มีเลขไม่เกิน 3 หลักก่อนทศนิยม
    }
    if (parts[1] && parts[1].length > 1) {
        input.value = parts[0] + "." + parts[1].slice(0, 1); // จำกัดทศนิยมให้มีแค่ 1 ตำแหน่ง
    }
}

document.getElementById("clearvalue").addEventListener("click", function () {
    document.getElementById("timeInput").value = "";
});


function calculateBMI() {
    let weight = parseFloat(document.getElementById("inputweight").value);
    let height = parseFloat(document.getElementById("inputheight").value) / 100; // แปลงเป็นเมตร
    
    if (!weight || !height) {
        document.getElementById("resultbmi").innerHTML = "";
        return;
    }
    
    let bmi = weight / (height * height);
    let category = "";
    
    if (bmi >= 30.0) {
        category = "อ้วนมาก";
    } else if (bmi >= 25.0) {
        category = "อ้วน";
    } else if (bmi >= 23.0) {
        category = "น้ำหนักเกิน";
    } else if (bmi >= 18.6) {
        category = "น้ำหนักปกติ เหมาะสม";
    } else {
        category = "ผอมเกินไป";
    }
    
    document.getElementById("resultbmi").innerHTML = `BMI : ${bmi.toFixed(1)} (${category})`;
}