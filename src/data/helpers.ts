export function generateAvater(firstName: string, lastName: string): string {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 8; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `https://avatars.dicebear.com/api/initials/${firstName.substr(0,1)}${lastName.substr(0,1)}${result}.svg`;
}