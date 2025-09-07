document.addEventListener('DOMContentLoaded', function () {
    initTabs();
    showSection('home'); // section เริ่มต้น
});

function initTabs() {
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });

    // เปิดแท็บเริ่มต้นใน section ที่แสดง
    const activeSection = document.querySelector('section:not([style*="display: none"])');
    if (activeSection) {
        const defaultTab = activeSection.querySelector('.tab-link');
        if (defaultTab) {
            showTab(defaultTab.getAttribute('data-tab'));
        }
    }

    
}

console.log('Show tab:', tabId);
console.log('Tab element:', document.getElementById(tabId));


function resetTabContent(tabId) {
    const tab = document.getElementById(tabId);
    if (!tab) return;

    const inputs = tab.querySelectorAll('input, textarea');
    inputs.forEach(el => el.value = '');

    const selects = tab.querySelectorAll('select');
    selects.forEach(sel => sel.selectedIndex = 0);

    const outputs = tab.querySelectorAll('.output, .result, .temp');
    outputs.forEach(el => el.innerHTML = '');
}

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const links = document.querySelectorAll('.tab-link');
    const dots = document.getElementById('spinner');

    // ปิดเมนูชั่วคราว
    links.forEach(link => link.style.pointerEvents = 'none');
    dots.style.display = 'block';

    // ซ่อนทุก tab-content
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    // ลบ class active จากปุ่ม
    links.forEach(link => link.classList.remove('active'));

    // แสดงเฉพาะ tab ที่เลือก
    setTimeout(() => {
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
            activeTab.style.display = 'block'; // ✅ คืน display กลับมา
        }

        const activeLink = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        dots.style.display = 'none';
        links.forEach(link => link.style.pointerEvents = 'auto');
    }, 500);
    
}



function showSection(id) {
    const sections = document.querySelectorAll('section');
    const spinner = document.getElementById('spinner');
    const links = document.querySelectorAll('.tab-link');

    links.forEach(link => link.style.pointerEvents = 'none');
    spinner.style.display = 'block';

    sections.forEach(section => {
        section.style.display = 'none';
    });

    setTimeout(() => {
        const newSection = document.getElementById(id);
        if (newSection) {
            newSection.style.display = 'block';
        }

        // รีเซ็ต tab และเนื้อหาใน section ใหม่
        initTabs();

        spinner.style.display = 'none';
        links.forEach(link => link.style.pointerEvents = 'auto');
    }, 800);
}
