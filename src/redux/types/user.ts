export interface User{
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
}

export interface UserToken{
    access_token: string
}

export interface UserLogin{
    email: string,
    password: string,
}

export interface UserRegister{
    name: string,
    email: string,
    password: string,
    avatar: string,
}

export interface UserData {
    userList: User[]
    userAuth: User | undefined
    userLogin: UserLogin | undefined
    userToken : UserToken | undefined
}