const texts = {
    VisitInfo: 'SELECT "vnNumber","hnNumber","dateService","visitStatus" FROM ms_medical_record_visit WHERE "vnNumber"=\'050906711140006\' OR "hnNumber"=\'456700000326\'',
    join1: 'SELECT ff."pregnancyNo",ff."pregnancyStatus",vv."vnNumber",vv."hnNumber",vv."dateService",vv."visitStatus" FROM ms_medical_record_momchild_visit_pregnancy AS ff LEFT JOIN ms_medical_record_visit AS vv ON ff."hnNumber" = vv."hnNumber" WHERE vv."vnNumber"=\'050906801250004\'',
    join2: 'SELECT pp."personalRegistrationNumber",pp."firstName",pp."lastName",EXTRACT(YEAR FROM AGE(pp."birthDate")) AS "age" ,ff."pregnancyNo",ff."pregnancyStatus",vv."vnNumber",vv."hnNumber",vv."dateService",vv."visitStatus" FROM ms_medical_record_momchild_visit_pregnancy AS ff LEFT JOIN ms_medical_record_visit AS vv ON ff."hnNumber" = vv."hnNumber" LEFT JOIN ms_medical_record_patient_profiles AS pp ON ff."hnNumber" = pp."hnNumber" WHERE vv."vnNumber"=\'050906801250004\'',
    schema2: 'SELECT pp."personalRegistrationNumber",pp."firstName",pp."lastName",EXTRACT(YEAR FROM AGE(pp."birthDate")) AS "age",cho."clinicCode",cho."diagnosisCode",cho."diagnosis" FROM ms_person."ms_person_profile" AS pp LEFT JOIN ms_medical_record."ms_medical_record_chronic" AS cho ON pp."personalRegistrationNumber" = cho."personalRegistrationNumber" WHERE pp."personalRegistrationNumber"=\'456700000210\'',
};

function copyText(type) {
    const text = texts[type];
    const textarea = document.getElementById('textAreasql');
    textarea.value = text;
    
    const tempTextArea = document.createElement('textarea');
            tempTextArea.value = text;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);
}