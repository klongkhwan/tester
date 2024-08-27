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
    }, 1000); // ปรับเวลาให้เหมาะสมตามความต้องการ
}

function showTab(tabId) {
    var tabs = document.querySelectorAll('.tab-content');
    var links = document.querySelectorAll('.tab-link');
    var spinner = document.getElementById('spinner');

    // Show spinner
    spinner.style.display = 'block';

    // Hide all tab contents
    tabs.forEach(function(tab) {
        tab.style.display = 'none';
    });

    // Remove active class from all tab links
    links.forEach(function(link) {
        link.classList.remove('active');
    });

    // After a short delay, show the selected tab and hide the spinner
    setTimeout(function() {
        document.getElementById(tabId).style.display = 'block';
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        spinner.style.display = 'none'; // Hide spinner
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
