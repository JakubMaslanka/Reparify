"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAvater = exports.generateRandomString = void 0;
function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomLength = Math.floor(Math.random() * (24 - 8 + 1)) + 8;
    for (let i = 0; i < randomLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
exports.generateRandomString = generateRandomString;
function generateAvater(firstName, lastName) {
    const randomString = generateRandomString();
    return `https://avatars.dicebear.com/api/initials/${firstName.substr(0, 1)}${lastName.substr(0, 1)}${randomString}.svg`;
}
exports.generateAvater = generateAvater;
