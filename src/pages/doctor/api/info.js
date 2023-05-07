import interceptor from 'context/interceptor';

function getDoctorInfo() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/docinfo/doc', 'GET');
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}
function addDoctorInfo(body) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/docinfo/doc', 'POST', body);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function getDoctorHistory() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/booking/doctor', 'GET');
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function getDoctorSlots() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/slot', 'GET');
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function addDocSlot(body) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/slot/', 'POST', body);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function enableDocSlot(body) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/slot/enable', 'POST', body);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function disableDocSlot(body) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/slot/disable', 'POST', body);
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

function addTreatment(body) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/treatment/add', 'POST', body);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function getMeetLink() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/meet/getlink', 'GET');
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function saveMeetLink(body) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/meet/savelink', 'POST', body);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

function getStatData(){
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/docinfo/stats', 'GET');
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}


export { getDoctorInfo, addDoctorInfo, getDoctorHistory, getDoctorSlots, addDocSlot, enableDocSlot, disableDocSlot, cancelSlot, addTreatment, getMeetLink, saveMeetLink, getStatData };
