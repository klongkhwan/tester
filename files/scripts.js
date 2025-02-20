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

function showSection(id) {
    var sections = document.querySelectorAll('section');
    var spinner = document.getElementById('spinner');
    var links = document.querySelectorAll('.tab-link');

    // ปิดการทำงานของลิงก์เมนู
    links.forEach(function(link) {
        link.style.pointerEvents = 'none';
    });

    // แสดง spinner
    spinner.style.display = 'block';

    // ซ่อนทุก section
    sections.forEach(function(section) {
        section.style.display = 'none';
    });

    // หลังจากที่ spinner แสดงสักครู่ เปลี่ยน section
    setTimeout(function() {
        document.getElementById(id).style.display = 'block';
        spinner.style.display = 'none'; // ซ่อน spinner

        // เปิดการทำงานของลิงก์เมนู
        links.forEach(function(link) {
            link.style.pointerEvents = 'auto';
        });
    }, 1000); // ปรับเวลาให้เหมาะสมตามความต้องการ
}

function showTab(tabId) {
    var tabs = document.querySelectorAll('.tab-content');
    var links = document.querySelectorAll('.tab-link');
    var dots = document.getElementById('spinner');

    // ปิดการทำงานของลิงก์เมนู
    links.forEach(function(link) {
        link.style.pointerEvents = 'none';
    });

    // Show 
    dots.style.display = 'block';

    // Hide all tab contents
    tabs.forEach(function(tab) {
        tab.style.display = 'none';
    });

    // Remove active class from all tab links
    links.forEach(function(link) {
        link.classList.remove('active');
    });

    // After a short delay, show the selected tab and hide the 
    setTimeout(function() {
        document.getElementById(tabId).style.display = 'block';
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        dots.style.display = 'none'; // Hide spinner

        // เปิดการทำงานของลิงก์เมนู
        links.forEach(function(link) {
            link.style.pointerEvents = 'auto';
        });
    }, 500); // Adjust delay as needed
}

// Initialize the first tab
showTab('random');

// Add event listeners to tab links
document.querySelectorAll('.tab-link').forEach(function(link) {
    link.addEventListener('click', function() {
        showTab(this.getAttribute('data-tab'));
    });
});


async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    chatBox.value += `คุณ: ${message}\n`;
    userInput.value = '';

    try {
        const response = await fetch('https://dear-magical-meadow.glitch.me/proxy/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 150
            })
        });

        const data = await response.json();
        const reply = data.choices[0].text.trim();
        chatBox.value += `DeepSeek: ${reply}\n`;
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        chatBox.value += `ข้อผิดพลาด: ${error.message}\n`;
    }
}