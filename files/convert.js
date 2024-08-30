document.addEventListener('DOMContentLoaded', function() {
    const timeInput = document.getElementById('timeInput');
    const clearButton = document.getElementById('clearvalue');
    const calendarButton = document.getElementById('calendarButton');
    const resultConvertDate = document.getElementById('resultconvertdate');
    const hiddenDateInput = document.getElementById('hiddenDateInput');

    // Initialize Flatpickr
    flatpickr(hiddenDateInput, {
        dateFormat: "Y-m-d H:i:S",
        enableTime: true,
        noCalendar: false,
        enableSeconds: true,
        defaultDate: new Date(),
        position: 'below',
        onChange: function(selectedDates, dateStr, instance) {
            const date = selectedDates[0];
            if (date) {
                const formattedDate = formatDateToYYYYMMDDHHMMSS(date);
                resultConvertDate.textContent = formattedDate;
            }
        }
    });

    // Open the calendar on button click
    calendarButton.addEventListener('click', function() {
        hiddenDateInput._flatpickr.open();
    });

    // Clear input and result
    clearButton.addEventListener('click', function() {
        timeInput.value = '';
        resultConvertDate.textContent = '';
        hiddenDateInput._flatpickr.clear();
    });

    // Function to format date to YYYYMMDDHHMMSS
    function formatDateToYYYYMMDDHHMMSS(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }
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
            timeInput.setAttribute('placeholder', '(เวลาใน Database) (30 หลัก)');
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
                document.getElementById('resultconvertdate').innerText = "Unix Timestamp ไม่ถูกต้อง";
            }
        } catch (error) {
            document.getElementById('resultconvertdate').innerText = "เกิดข้อผิดพลาดในการแปลง Unix Timestamp";
        }
    }
});




document.getElementById('jsonInput').addEventListener('input', showAccessToken);

function pasteAndProcess() {
    navigator.clipboard.readText()
        .then(text => {
            document.getElementById('jsonInput').value = text;
            showAccessToken(); // Process the pasted JSON immediately
        })
        .catch(err => {
            alert('Failed to paste JSON.');
        });
}

function calculateYear() {
    const number = parseInt(document.getElementById('numberInput').value);
    if (isNaN(number)) {
        document.getElementById('resultyear').textContent = "กรุณากรอกเลขที่ถูกต้อง";
        return;
    }

    const currentDate = new Date();
    const currentYearCE = currentDate.getFullYear(); // ปี ค.ศ. ปัจจุบัน
    const currentYearBE = currentYearCE + 543; // ปี พ.ศ. ปัจจุบัน

    const yearBE = currentYearBE - number;
    const yearCE = currentYearCE - number;

    document.getElementById('resultyear').textContent = `ปี พ.ศ. ${yearBE}, ปี ค.ศ. ${yearCE}`;
}

document.getElementById('numberInput').addEventListener('input', calculateYear);

function base64UrlDecode(input) {
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}



function updatePlaceholders() {
    const conversionType = document.querySelector('input[name="conversionType"]:checked').value;
    const jwtInput = document.getElementById('jwtInput');
    const jsonOutput = document.getElementById('jsonOutput');

    // ล้างค่าใน input
    jwtInput.value = '';
    jsonOutput.value = '';

    // เปลี่ยน placeholder ตามตัวเลือก
    if (conversionType === 'jwtToJson') {
        jwtInput.placeholder = 'Paste your Token here...';
        jsonOutput.placeholder = 'Converted JSON will appear here...';
    } else if (conversionType === 'jsonToJwt') {
        jwtInput.placeholder = 'Paste your JSON here...';
        jsonOutput.placeholder = 'Converted Token will appear here...';
    }
}

function convert() {
    const conversionType = document.querySelector('input[name="conversionType"]:checked').value;
    const jwtInput = document.getElementById('jwtInput').value;
    const jsonOutput = document.getElementById('jsonOutput');

    if (conversionType === 'jwtToJson') {
        // Logic to convert JWT to JSON
        try {
            const base64Url = jwtInput.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            jsonOutput.value = JSON.stringify(JSON.parse(jsonPayload), null, 4);
        } catch (e) {
            jsonOutput.value = 'Invalid Token';
        }
    } else if (conversionType === 'jsonToJwt') {
        // Logic to convert JSON to JWT (simplified example)
        try {
            const header = {
                "alg": "HS256",
                "typ": "JWT"
            };
            const payload = JSON.parse(jwtInput);
            const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
            const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
            
            let signature = ""; // Empty string to avoid adding a signature

            let jwt = `${encodedHeader}.${encodedPayload}`;

            // Add signature if not empty
            if (signature) {
                jwt += `.${signature}`;
            }

            jsonOutput.value = jwt;
        } catch (e) {
            jsonOutput.value = 'Invalid JSON';
        }
    }
}

// เรียกใช้ฟังก์ชันเพื่อปรับ placeholder ตามค่าเริ่มต้น
updatePlaceholders();
