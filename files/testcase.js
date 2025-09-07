function generateResult() {
  const featureName = document.getElementById('featureName').value.trim();
  const userAction = document.getElementById('userAction').value.trim();
  const conditions = document.getElementById('conditions').value.trim();
  const requirement = document.getElementById('requirement').value.trim();
  const testData = document.getElementById('testData').value.trim();


  // ใส่ \n และเว้นวรรคเองให้เหมาะสม
  const result = 
`ช่วยเขียน test case ให้อย่างละเอียด โดยมีคอลัมน์ test case ดังนี้
-TCID	
-Test Case 
-Description	
-Precondition	
-Test Steps	
-Test Data	
-Expected Result		
-Status
และเรียงลำดับเทสเคส ตาม เหตุการ หรือ flow  โดยใช้รายละเอียดดังต่อไปนี้ (20 ข้อขึ้นไป)

1.ชื่อฟีเจอร์หรือระบบ ที่ต้องการให้เขียน : ${featureName}

2.Requirement หรือ User Story (ถ้ามี)  : 
${indentLines(requirement, 4)}

3.ผู้ใช้งานทำอะไร :  
${indentLines(userAction, 4)}

4.ข้อจำกัดหรือเงื่อนไข : 
${indentLines(conditions, 4)}

5.Test Data  : 
${indentLines(testData, 4)}`;

  document.getElementById('resultText').value = result;
}

// ฟังก์ชันช่วยเพิ่มช่องว่าง (4 spaces) ให้แต่ละบรรทัดของข้อความที่กรอก
function indentLines(text, spaces) {
  if (!text) return '';
  const indent = ' '.repeat(spaces);
  return text.split('\n').map(line => indent + line).join('\n');
}


function copyResult() {
      const textarea = document.getElementById('resultText');
      textarea.select();
      textarea.setSelectionRange(0, 99999); // รองรับมือถือ
      document.execCommand("copy");

}


function toggleExample() {
  const checkbox = document.getElementById('showExample');
  if (checkbox.checked) {
    fillExampleData();
    generateResult();
  } else {
    clearAllInputs();
  }
}

function fillExampleData() {
  document.getElementById('featureName').value = 'จัดการตั้งค่าวันหยุด';

    document.getElementById('requirement').value = 
`-ผู้ใช้สร้างวันหยุด โดยตั้งชื่อวันและเลือกวันที่ และกดบันทึก 
-แก้ไขรายการ
-เปิดหรือปิดใช้งาน 
-ดูรายละเอียด 
-ค้นหาข้อมูลที่สร้าง`;

  document.getElementById('userAction').value = 
`ตั้งค่าวันหยุด มีไว้เพื่อนำไปแสดงผลหน้าตั้งค่า คลินิกนัดหมาย เพื่อแสดงให้เจ้าหน้าที่ทราบว่าวันที่กำลังจะนัด เป็นวันหยุด
1.เมนูอยู่ใน เมนูตั้งค่า  > อื่นๆ > จัดการตั้งค่าวันหยุด
2.หลังจากเข้ามาจะเจอตารางแสดงรายการ พร้อม filter ดังนี้
-ช่องสำหรับพิมพ์ค้นหา
-ตัวเลือกปีที่แสดง ระบบจะแสดงปีปัจจุบันให้ก่อนและเลือกได้
-สถานะตั้งต้นไว้ที่ทั้งหมด และมีเปิด/ปิดใช้งาน 
-ปุ่มค้นหา
-ปุ่มเพิ่ม กดแล้วแสดงหน้าต่างเพิ่ม
-ปุ่มจัดการของรายการ มีรายละเอียดดังนี้ 1.ปุ่มเปิดการใช้งาน 2.ปุ่มปิดการใช้งาน 3.ปุ่มดูรายละเอียด 4.ปุ่มแก้ไข`;


  document.getElementById('conditions').value = 
`-หากไม่กรอกข้อมูลและกดบันทึกระบบแจ้ง กรุณาระบุข้อมูลให้ครบถ้วน
-ช่องชื่อวันหยุดที่จะใส่ชื่อ ใส่ได้แค่ 255 ตัวอักษร
-บันทึกหรือแก้ไขวันที่ซ้ำกับรายการอื่นไม่ได้`;




  document.getElementById('testData').value = 
`-สร้างสำเร็จ ชื่อวัน = วันปีใหม่ วันที่ = 1/1/2567
-สร้างสำเร็จ ชื่อวัน = วันแรงงาน วันที่ = 1/5/2568
-สร้างข้อมูลซ้ำ กับ วันปีใหม่ วันที่ = 1/1/2567
-ทำการแก้ไขวันที่ ไปซ้ำกับรายการอื่นๆ`;

}

function clearAllInputs() {
  const fields = [
    'featureName',
    'userAction',
    'conditions',
    'requirement',
    'testData',
    'resultText'
  ];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}
