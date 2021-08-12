interface User {
    id: number,
    fullname: string,
    username: string,
    role: string,
    wallet: number;
    password: string,
    createdOn: Date,
}

export {
    User,
}