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

