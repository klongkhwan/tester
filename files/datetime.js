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
