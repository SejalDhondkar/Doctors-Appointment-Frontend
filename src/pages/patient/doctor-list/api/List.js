import interceptor from 'context/interceptor';

function getDoctorList() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/docinfo/all/docs', 'GET');
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function getSlotList(body) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/slot/all', 'POST', body);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function bookNewSlot(body) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/slot/add', 'POST', body);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function getPatientHistory() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/booking/patient', 'GET');
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function cancelSlot(body) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/slot/cancel', 'POST', body);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function getPrescription(body) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/treatment/get', 'POST', body);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

export { getDoctorList, getSlotList, bookNewSlot, getPatientHistory, cancelSlot, getPrescription };
