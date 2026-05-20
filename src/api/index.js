export const getUserHeaders = (userId) => {
    return {
        headers: {
            'x-user-id': userId
        }
    }
}