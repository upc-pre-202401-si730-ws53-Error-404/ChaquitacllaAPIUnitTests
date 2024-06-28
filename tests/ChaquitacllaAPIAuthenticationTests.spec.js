const { test, expect } = require('@playwright/test');

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

test.only("Sign Up Success", async ({ request }) => {
    const username = generateRandomString(10); 
    const password = generateRandomString(10); 

    console.log(`Generated username: ${username}, Generated password: ${password}`);

    const response = await request.post('http://localhost:5138/api/v1/authentication/sign-up', {
        data: {
            username, 
            password, 
        },
        headers: {
            "Accept": "application/json"
        }
    });
    const contentType = response.headers()['content-type'];
    if (contentType === "application/json; charset=utf-8") {
        console.log(await response.json());
    } else {
        console.log('Unexpected content type:', contentType);
    }

    expect(response.status()).toBe(200);
});

test.only("Sign In Success", async ({ request }) => {
    const username = "string"; 
    const password = "string"; 

    const response = await request.post('http://localhost:5138/api/v1/authentication/sign-in', {
        data: {
            username, 
            password, 
        },
        headers: {
            "Accept": "application/json"
        }
    });

    const contentType = response.headers()['content-type'];
    if (contentType === "application/json; charset=utf-8") {
        console.log(await response.json());
    } else {
        console.log('Unexpected content type:', contentType);
    }

    expect(response.status()).toBe(200);
});