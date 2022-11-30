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

export { getDoctorInfo, addDoctorInfo };
