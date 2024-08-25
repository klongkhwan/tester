
        // ฟังก์ชันสำหรับคัดลอกข้อความไปยังคลิปบอร์ด
        function copyToClipboard(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            const message = document.getElementById('copyMessage');
            message.textContent = `คัดลอกข้อความ: "${text}" ไปยังคลิปบอร์ดเรียบร้อยแล้ว`;
        }

        
        function generateRandomText(maxLength) {
            const characters = 'กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรรลวัศษสหฬอฮABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$!&0123456789';
            let result = '';
            let length = 0;

            while (length < maxLength) {
                // Randomly decide to add a space or a character
                if (Math.random() < 0.1 && length + 1 < maxLength) {
                    result += ' ';
                    length++;
                } else {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    result += characters[randomIndex];
                    length++;
                }
            }

             // Enable the copy button
             document.getElementById('copyButton').disabled = false;

            return result;
        }

        document.getElementById('textArea').addEventListener('input', updateCounts);

        document.getElementById('generateButton').addEventListener('click', () => {
            const totalLength = parseInt(document.getElementById('charCountInput').value, 10);
            if (!isNaN(totalLength) && totalLength > 0) {
                const suffix = totalLength.toString();
                const textLength = totalLength - suffix.length;
                const randomText = generateRandomText(textLength);
                
                document.getElementById('textArea').value = randomText + suffix;
                updateCounts();
            }
        });

        function updateCounts() {
            const text = document.getElementById('textArea').value;

            // Count non-space characters
            const charCount = text.replace(/\s/g, '').length;
            const spaceCount = (text.match(/\s/g) || []).length;
            const totalCount = text.length;
        
            // Update the display elements
            document.getElementById('charCount').textContent = `${charCount}`;
            document.getElementById('spaceCount').textContent = `${spaceCount}`;
            document.getElementById('totalCount').textContent = `${totalCount}`;
        }
        

        // JSON data
        const jsonData = {
            "10": "หวัดดี kub",
            "50": "ยินดีต้อนรับเข้าสู่ประเทศไทย Welcome to Tester CAT",
            "100": "บริษัทเรามีชื่อเสียงในด้านคุณภาพ Our company is renowned for its quality and innovation ใช่มันสุดยอด",
            "255": "นักทดสอบซอฟต์แวร์ มีบทบาทสำคัญในการตรวจสอบคุณภาพของระบบและโปรแกรม เพื่อให้มั่นใจว่าซอฟต์แวร์ทำงานได้ตามที่กำหนด ไม่มีข้อผิดพลาดใดๆ การทดสอบที่ละเอียดและรอบคอบช่วยป้องกันปัญหาที่อาจเกิดขึ้นในอนาคต Ensuring quality software delivery is our top priority",
            ">10": "สวัสดีครับคนเทส10",
            ">50": "ความสำเร็จไม่ใช่จุดหมายปลายทาง แต่เป็นการเดินทางที่ยาวนาน50",
            ">100": "ความพยายามไม่เคยทรยศใคร จงทำวันนี้ให้ดีที่สุด เพื่อวันพรุ่งนี้ที่มีบัครอเราอยู่ susu ขยันวันนี้ สบายวันไหน100",
            ">255": "ชีวิตคือการเดินทางที่เต็มไปด้วยบทเรียน ทุกความล้มเหลวเป็นโอกาสในการเรียนรู้ ทุกความสำเร็จเป็นผลลัพธ์ของความพยายาม ไม่มีอะไรได้มาง่าย ๆ แต่ทุกอย่างสามารถทำได้หากเรามีความมุ่งมั่นและไม่ยอมแพ้ การเปลี่ยนแปลงเริ่มต้นที่ตัวเราเอง จงใช้เวลาทุกวันเพื่อสร้างอนาคตที่ดีกว่าเดิม255",
            "th": "การหาบัคก็เหมือนงมเข็มในมหาสมุทร",
            "en": "NoBugNoJob",
            "number": "12345678",
            "special": "@#$!&-=/><",
            "numberTHEN": "testไปทำไมถ้าไม่deploy555",
            "specialTHEN": "ได้โปรดfixbugpls@#$!&-=/><",
            "space": "อย่าให้มีบัครอบที่ 2"
        };
        

        // ฟังก์ชันการคัดลอกข้อความ JSON เมื่อกดปุ่ม
        document && document.addEventListener('DOMContentLoaded', () => {
            // กำหนดคลาสให้กับปุ่มคัดลอกที่มี data-key
            document.querySelectorAll('.copyButton').forEach(button => {
                button.addEventListener('click', () => {
                    const key = button.getAttribute('data-key');
                    const textToCopy = jsonData[key];
                    if (textToCopy) {
                        copyToClipboard(textToCopy);
                        
                        // แสดงข้อความจาก JSON ลงใน textarea
                        const textarea = document.getElementById('textArea');
                        textarea.value = textToCopy;
        
                        // อัปเดตจำนวนตัวอักษรและช่องว่างใน textarea
                        updateCounts();
        
                        
        
                        // เรียกใช้ toggleCopyButton() เพื่อเปิดปุ่มคัดลอกหากมีข้อความ
                        toggleCopyButton();
                    }
                });
            });
        });


        
        function toggleCopyButton() {
            const textArea = document.getElementById('textArea');
            const copyButton = document.getElementById('copyButton');
            copyButton.disabled = textArea.value.trim() === "";
        }
        
        function copyTextarea() {
            const textArea = document.getElementById('textArea');
            textArea.select();
            textArea.setSelectionRange(0, 99999); // สำหรับอุปกรณ์มือถือ
        
            navigator.clipboard.writeText(textArea.value)
                .then(() => {
                    
                })
                .catch(err => {
                   
                });
        }
        
        function clearTextarea() {
            var textarea = document.getElementById('textArea');
            var copyButton = document.getElementById('copyButton');
            
            textarea.value = ''; // ล้างข้อความใน textarea
            copyButton.disabled = true; // ปิดการใช้งานปุ่มคัดลอก
            updateCounts();
        }
           
        
             
            
        
        
        
        // เรียก toggleCopyButton() เมื่อโหลดหน้าเว็บ เพื่อปิดปุ่มหาก textarea ว่าง
        document.addEventListener('DOMContentLoaded', () => {
            toggleCopyButton();
            document.getElementById('generateButton').addEventListener('click', generateRandomText);
            
        });


    