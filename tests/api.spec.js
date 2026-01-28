import {test, expect} from "@playwright/test";
test.describe.configure({ mode: 'serial' });

test.describe('API-тесты для Restful-booker', () => {
    const baseURL = 'https://restful-booker.herokuapp.com';
    let bookingId;
    let token;

    // POST - create
    test('Создание бронирования', async ({request}) => {
        const postData = {
            firstname: 'Maria',
            lastname: 'White',
            totalprice: 400,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-07-07',
                checkout: '2026-07-17',
            },
            additionalneeds: 'Breakfast'

        }

        const response = await request.post(`${baseURL}/booking`, {
            data: postData,
        })

        console.log(response.status())
        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log('Тело ответа: ', body);
        expect(body).toHaveProperty('bookingid');
        bookingId = await body.bookingid;
        expect(body.booking).toMatchObject(postData);
    })


    // GET - read
    test('Получение списка ID бронирований', async ({request}) => {
        const response = await request.get(`${baseURL}/booking`);

        console.log(`Статус-код: ${response.status()}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log('Тело ответа: ', responseBody);
        expect(responseBody.length).toBeGreaterThan(0);

        expect(responseBody[0]).toHaveProperty('bookingid');
    });

    // PUT - update
    test('Обновление бронирования', async ({request}) => {
        const postData = {
            username: 'admin',
            password: 'password123'
        }
        const authResponse = await request.post(`${baseURL}/auth`, {
            data: postData,
        })
        const authBody = await authResponse.json();
        const authToken = authBody.token;
        token = await authToken;
        console.log(`Токен получен: ${authToken}`);

        const updatedData = {
            firstname: 'Max',
            lastname: 'White',
            totalprice: 600,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-07-07',
                checkout: '2026-07-17',
            },
            additionalneeds: 'Dinner'
        }

        const response = await request.put(`${baseURL}/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${authToken}`,
            },
            data: updatedData
        })
        console.log('Booking id: '+ bookingId);
        console.log(`Статус-код: ${response.status()}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log('Тело ответа: ', responseBody);
        expect(responseBody.firstname).toBe('Max');
    });


    // DELETE - delete
    test('Удаление бронирования', async ({request}) => {
        const response = await request.delete(`${baseURL}/booking/${bookingId}`,
            {
                headers: {
                    'Cookie': `token=${token}`,
                }
            });

        console.log(response.status())
        expect(response.status()).toBe(201);

        const responseCheck = await request.get(`${baseURL}/booking/${bookingId}`);
        console.log(responseCheck.status());
        expect(responseCheck.status()).toBe(404);
    });
});