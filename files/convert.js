function updatePlaceholders() {
    const conversionType = document.querySelector('input[name="conversionType"]:checked').value;
    const jwtInput = document.getElementById('jwtInput');
    const jsonOutput = document.getElementById('jsonOutput');
    const toimg = document.getElementById('64toimg');
    const convertButton = document.getElementById('convertButton'); // เพิ่มการเลือกปุ่ม


    // ล้างค่าใน input
    jwtInput.value = '';
    jsonOutput.value = '';

    // เปลี่ยน placeholder และป้ายชื่อปุ่มตามตัวเลือก
    if (conversionType === 'jwtToJson') {
        jwtInput.placeholder = 'Paste your Token here...';
        jsonOutput.placeholder = 'Converted JSON will appear here...';
        convertButton.innerText = 'Convert'; // เปลี่ยนชื่อปุ่มเป็น Convert
    } else if (conversionType === 'jsonToJwt') {
        jwtInput.placeholder = 'Paste your JSON here...';
        jsonOutput.placeholder = 'Converted Token will appear here...';
        convertButton.innerText = 'Convert'; // เปลี่ยนชื่อปุ่มเป็น Convert
    } else if (conversionType === 'compareJson') {
        jwtInput.placeholder = 'Paste your JSON here...';
        jsonOutput.placeholder = 'Paste your JSON here...';
        convertButton.innerText = 'Compare'; // เปลี่ยนชื่อปุ่มเป็น Compare
    } else if (conversionType === '64toimg') {
        jwtInput.placeholder = 'Paste your BASE64 here...';
        jsonOutput.placeholder = 'Paste your JSON here...';
        convertButton.innerText = 'Convert'; // เปลี่ยนชื่อปุ่มเป็น Convert
    } else if (conversionType === 'hextofile') {
        jwtInput.placeholder = 'Paste your hex here...';
        convertButton.innerText = 'Convert'; // เปลี่ยนชื่อปุ่มเป็น Convert
    }
}

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", function () {
        document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
        this.classList.add("selected");
        this.querySelector(".radio-input").checked = true;
    });
});


function convert() {
    const conversionType = document.querySelector('input[name="conversionType"]:checked').value;
    const jwtInput = document.getElementById('jwtInput').value;
    const jsonOutput = document.getElementById('jsonOutput');
    const imageContainer = document.getElementById('imageContainer') || createImageContainer();
    const fileInfo = document.getElementById('fileInfo') || createFileInfoContainer();

    // Reset displays
    imageContainer.style.display = 'none';
    fileInfo.style.display = 'none';

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
    } else if (conversionType === 'compareJson') {
        try {
            const json1 = JSON.stringify(JSON.parse(document.getElementById("jwtInput").value || '{}'), null, 2).split('\n');
            const json2 = JSON.stringify(JSON.parse(document.getElementById("jsonOutput").value || '{}'), null, 2).split('\n');
        
            let resultHTML = '';
            const maxLines = Math.max(json1.length, json2.length);
            for (let i = 0; i < maxLines; i++) {
                if (json1[i] !== json2[i]) {
                    resultHTML += `<div style="display: inline-block; width: 45%; background-color: #f8d7da; color: #721c24; padding: 5px; margin: 5px;">>> ${json1[i] || ''}</div>`;
                    resultHTML += `<div style="display: inline-block; width: 45%; background-color: #d4edda; color: #155724; padding: 5px; margin: 5px;"><< ${json2[i] || ''}</div>`;
                } else {
                    resultHTML += `<div style="display: inline-block; width: 45%; padding: 5px; margin: 5px;">${json1[i] || ''}</div>`;
                    resultHTML += `<div style="display: inline-block; width: 45%; padding: 5px; margin: 5px;">${json2[i] || ''}</div>`;
                }
            }
            
            document.getElementById("jsonOutput").style.display = "none";
            document.getElementById("jwtInput").style.display = "none";
            document.getElementById("convertButton").style.display = "none";
            document.getElementById("comparisonResult").innerHTML = resultHTML;
            document.getElementById("comparisonResult").style.display = "block";
            document.getElementById("backButton").style.display = "inline";
        } catch (e) {
            alert("Invalid JSON format. Please check your JSON inputs.");
        }
    } else if (conversionType === '64toimg') {
        // Hide jsonOutput
        jsonOutput.style.display = 'none';
    
        if (!jwtInput) {
            alert('Please enter a valid Base64 code!');
            return;
        }
    
        const img = new Image();
        img.src = jwtInput.startsWith('data:image') ? jwtInput : `data:image/png;base64,${jwtInput}`;
    
        img.onload = function () {
            const resolution = `${img.naturalWidth}×${img.naturalHeight}`;
            const mimeType = img.src.substring(img.src.indexOf(':') + 1, img.src.indexOf(';'));
            const extension = mimeType.split('/')[1];
            const sizeInBytes = Math.ceil((img.src.length * (3 / 4)) - (img.src.endsWith('==') ? 2 : 1));
            const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    
            // Show image and file info
            imageContainer.style.display = 'block';
            imageContainer.innerHTML = '';
            imageContainer.appendChild(img);
    
            fileInfo.style.display = 'block';
            fileInfo.innerHTML = `
                <h3>File Info</h3>
                <p><strong>Resolution:</strong> ${resolution}</p>
                <p><strong>MIME type:</strong> ${mimeType}</p>
                <p><strong>Extension:</strong> ${extension}</p>
                <p><strong>Size:</strong> ${sizeInKB} KB</p>
            `;
        };
    
        img.onerror = function () {
            alert('Invalid Base64 code or unsupported image format.');
        }
    } else if (conversionType === 'hextofile') {
        // Hide jsonOutput
        jsonOutput.style.display = 'none';
    }
}

function convertToFile(type) {
    const hex = document.getElementById("jwtInput").value.replace(/\s+/g, '');
    if (!hex.match(/^[0-9A-Fa-f]+$/)) {
        alert("กรุณากรอกค่า Hexadecimal ที่ถูกต้อง");
        return;
    }

    // แปลง Hex เป็น Binary
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    const binaryData = new Uint8Array(bytes);

    // กำหนดชื่อไฟล์
    let filename = "output.bin";
    if (type === "pdf") {
        filename = "output.pdf";
    } else if (type === "excel") {
        filename = "output.xlsx";
    }

    const blob = new Blob([binaryData], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

document.querySelectorAll('input[name="conversionType"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const conversionType = document.querySelector('input[name="conversionType"]:checked').value;
        const imageContainer = document.getElementById('imageContainer');
        const fileInfo = document.getElementById('fileInfo');
        const jsonOutput = document.getElementById('jsonOutput');
        const jwtInput = document.getElementById('jwtInput');
        const backButton = document.getElementById('backButton');
        const comparisonResult = document.getElementById('comparisonResult');
        const convertButton = document.getElementById('convertButton');

        // รีเซ็ทเมื่อเปลี่ยน radio
        if (conversionType !== 'compareJson') {
            comparisonResult.style.display = 'none';  // ซ่อนผลการเปรียบเทียบ
            backButton.style.display = 'none';        // ซ่อนปุ่มย้อนกลับ
            jsonOutput.style.display = 'block';       // แสดง jsonOutput
            imageContainer.style.display = 'none';    // ซ่อน imageContainer
            fileInfo.style.display = 'none';          // ซ่อนข้อมูลไฟล์
        }

        // ฟังก์ชันการแสดงผลสำหรับ radio 64toimg
        if (conversionType === '64toimg') {
            jsonOutput.style.display = 'none';
            jwtInput.style.display = 'block'; // แสดง jwtInput สำหรับ Base64
            handleBase64Conversion(jwtInput.value); // แปลง base64 ทันทีหากมีค่า
        } else if (conversionType === 'compareJson') {
            // สำหรับการเทียบ JSON
            jsonOutput.style.display = 'block';
            jwtInput.style.display = 'block';
            convertButton.style.display = 'none'; // ซ่อนปุ่ม Convert สำหรับ Compare JSON
            comparisonResult.style.display = 'none'; // ซ่อนผลการเปรียบเทียบ
            backButton.style.display = 'none'; // ซ่อนปุ่ม Back

            // รีเซ็ทค่าใน jwtInput และ jsonOutput
            jwtInput.value = '';
            jsonOutput.value = '';

            // แสดงปุ่ม Compare
            convertButton.style.display = 'inline';
        } else {
            // สำหรับ Token to JSON และ JSON to Token
            jsonOutput.style.display = 'block';
            jwtInput.style.display = 'block';
            convertButton.style.display = 'inline'; // แสดงปุ่ม Convert
            comparisonResult.style.display = 'none'; // ซ่อนผลการเปรียบเทียบ
            backButton.style.display = 'none'; // ซ่อนปุ่ม Back
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const outputTypebin = document.getElementById('outputTypebin');
    const outputTypepdf = document.getElementById('outputTypepdf');
    const outputTypeexcel = document.getElementById('outputTypeexcel');
    const conversionType = document.querySelector('input[name="conversionType"]:checked')?.value;

    // ซ่อน outputTypebin, outputTypepdf, outputTypeexcel ตอนเข้าเว็บครั้งแรก
    if (outputTypebin) {
        outputTypebin.style.display = 'none';
    }
    if (outputTypepdf) {
        outputTypepdf.style.display = 'none';
    }
    if (outputTypeexcel) {
        outputTypeexcel.style.display = 'none';
    }

    document.querySelectorAll('input[name="conversionType"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const conversionType = document.querySelector('input[name="conversionType"]:checked').value;
            const imageContainer = document.getElementById('imageContainer');
            const fileInfo = document.getElementById('fileInfo');
            const jsonOutput = document.getElementById('jsonOutput');
            const jwtInput = document.getElementById('jwtInput');
            const convertButton = document.getElementById('convertButton');
            const backButton = document.getElementById('backButton');
            const comparisonResult = document.getElementById('comparisonResult');

            // ซ่อนการแสดงผลทั้งหมดก่อนการเลือกใหม่
            if (imageContainer) imageContainer.style.display = 'none';
            if (fileInfo) fileInfo.style.display = 'none';
            if (comparisonResult) comparisonResult.style.display = 'none';
            if (backButton) backButton.style.display = 'none';
            if (convertButton) convertButton.style.display = 'inline';

            // กำหนดค่าเริ่มต้นสำหรับ jwtInput และ jsonOutput
            jsonOutput.style.display = 'block';
            jwtInput.style.display = 'block';

            // ซ่อน outputTypebin, outputTypepdf, outputTypeexcel ก่อนที่ผู้ใช้เลือก
            outputTypebin.style.display = 'none';
            outputTypepdf.style.display = 'none';
            outputTypeexcel.style.display = 'none';

            // ตรวจสอบการเลือก radio
            if (conversionType === '64toimg') {
                // แสดง jwtInput และปุ่ม convert สำหรับ Base64 to Image
                jsonOutput.style.display = 'none';
                jwtInput.style.display = 'block';  // แสดง input field สำหรับ base64
                handleBase64Conversion(jwtInput.value); // แปลง base64 ทันทีหากมีค่าใน jwtInput
            } else if (conversionType === 'compareJson') {
                // รีเซ็ทค่าเมื่อเลือก compareJson
                jwtInput.value = '';
                jsonOutput.value = '';
                comparisonResult.style.display = 'none';
                backButton.style.display = 'none';
                // แสดง jwtInput และ jsonOutput พร้อมปุ่ม compare
                jsonOutput.style.display = 'block';
                jwtInput.style.display = 'block';
            } else if (conversionType === 'jwtToJson' || conversionType === 'jsonToJwt') {
                // แสดง jwtInput และ jsonOutput พร้อมปุ่ม convert สำหรับ JWT และ JSON conversion
                outputTypebin.style.display = 'none';
                jsonOutput.style.display = 'block';
                jwtInput.style.display = 'block';
                convertButton.style.display = 'inline';
            } else if (conversionType === 'hextofile') {
                // แสดง outputTypebin, outputTypepdf, outputTypeexcel และซ่อน jsonOutput เมื่อเลือก hextofile
                outputTypebin.style.display = 'inline';
                outputTypepdf.style.display = 'inline';
                outputTypeexcel.style.display = 'inline';
                jsonOutput.style.display = 'none';
                jwtInput.style.display = 'block';
                convertButton.style.display = 'none';
            } else if (conversionType === 'pdfConversion') {
                // แสดง outputTypepdf เมื่อเลือก pdfConversion
                outputTypepdf.style.display = 'block';
                jsonOutput.style.display = 'none';
                jwtInput.style.display = 'none';
                convertButton.style.display = 'inline';
            } else if (conversionType === 'excelConversion') {
                // แสดง outputTypeexcel เมื่อเลือก excelConversion
                outputTypeexcel.style.display = 'block';
                jsonOutput.style.display = 'none';
                jwtInput.style.display = 'none';
                convertButton.style.display = 'inline';
            }

            // หากเลือก radio อื่นๆ ให้รีเซ็ทการแสดงผลของรูปภาพ
            if (imageContainer) imageContainer.style.display = 'none';
            if (fileInfo) fileInfo.style.display = 'none';
        });
    });
});



// ฟังก์ชันย้อนกลับ (เมื่อกดปุ่ม back)
function goBack() {
    const comparisonResult = document.getElementById('comparisonResult');
    const backButton = document.getElementById('backButton');
    const jsonOutput = document.getElementById('jsonOutput');
    const jwtInput = document.getElementById('jwtInput');
    const convertButton = document.getElementById('convertButton');

    comparisonResult.style.display = 'none';  // ซ่อนผลการเปรียบเทียบ
    backButton.style.display = 'none';        // ซ่อนปุ่มย้อนกลับ
    jsonOutput.style.display = 'block';       // แสดง jsonOutput
    jwtInput.style.display = 'block';         // แสดง jwtInput
    convertButton.style.display = 'inline';   // แสดงปุ่ม Convert
}