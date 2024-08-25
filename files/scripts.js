document.querySelectorAll('.tab-link').forEach(function(tab) {
    tab.addEventListener('click', function() {
        var tabId = this.getAttribute('data-tab');

        document.querySelectorAll('.tab-link').forEach(function(link) {
            link.classList.remove('active');
        });

        document.querySelectorAll('.tab-content').forEach(function(content) {
            content.classList.remove('active');
        });

        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

document.getElementById('timeInput').addEventListener('input', function() {
    const timeInput = this.value;
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
});

document.querySelector('.clear-input-button').addEventListener('click', function() {
    document.getElementById('timeInput').value = ''; // Clear the input field
    document.getElementById('result').innerText = ''; // Clear the result text
});

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
        position: 'below', // Ensure it appears below the input
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