const { test, expect } = require('@playwright/test');

test.only("Crop Disease successfully registered", async ({ request }) => {
    const authResponse = await request.post('http://localhost:5138/api/v1/authentication/sign-in', {
        data: {
            username: "string", 
            password: "string" 
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    const { token } = await authResponse.json();

    expect(authResponse.status()).toBe(200);

    const requestBody = {
        name: "Leaf Spot",
        description: "Circular spots on leaves",
        solution: "Use fungicide"
    };

    const response = await request.post('http://localhost:5138/api/v1/crops-management/crops/diseases', {
        data: requestBody,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        }
    });

    const contentType = response.headers()['content-type'];
    if (contentType === "application/json; charset=utf-8") {
        console.log(await response.json());
    } else {
        console.log('Unexpected content type:', contentType);
    }

    expect(response.status()).toBe(201);
});



test.only("Get all crop diseases", async ({ request }) => {
    const authResponse = await request.post('http://localhost:5138/api/v1/authentication/sign-in', {
        data: {
            username: "string", 
            password: "string" 
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    const { token } = await authResponse.json();

    expect(authResponse.status()).toBe(200);

    const response = await request.get('http://localhost:5138/api/v1/crops-management/crops/diseases', {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}` 
        }
    });

    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'];
    if (contentType === "application/json; charset=utf-8") {
        console.log(await response.json());
    } else {
        console.log('Unexpected content type:', contentType);
    }
});