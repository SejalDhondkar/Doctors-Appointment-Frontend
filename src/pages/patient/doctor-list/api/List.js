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

export { getDoctorList };
