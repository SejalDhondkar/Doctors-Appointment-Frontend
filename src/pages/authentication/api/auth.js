import interceptor from '../../../context/interceptor';

function loginUser(body) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/login', 'POST', body);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}
function registerUser(body) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await interceptor('/api/register', 'POST', body);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

export { loginUser, registerUser };
