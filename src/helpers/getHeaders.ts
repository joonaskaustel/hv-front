export const getHeaders = () => {
    const user = localStorage?.getItem('user');

    if (user) {
        const local = JSON.parse(localStorage?.getItem('user') || '');

        if (local) {
            return local.token;
        }
    }

    return ''
}
