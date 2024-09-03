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
