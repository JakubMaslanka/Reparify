export function generateRandomString(): string {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomLength: number = Math.floor(Math.random() * (24 - 8 + 1)) + 8;
    for ( let i = 0; i < randomLength; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export function generateAvater(firstName: string, lastName: string): string {
    const randomString = generateRandomString();
    return `https://avatars.dicebear.com/api/initials/${firstName.substr(0,1)}${lastName.substr(0,1)}${randomString}.svg`;
}