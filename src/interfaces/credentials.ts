export interface ILoginCredentials {
    input: {
        email: string,
        password: string
    }
}

export interface ISignupCredentials {
    input: {
        email: string
        firstName: string
        lastName: string
        password: string
    }
}