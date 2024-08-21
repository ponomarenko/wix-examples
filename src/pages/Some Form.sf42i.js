import { fetch } from 'wix-fetch';
import { getUserCountry, createApplication } from 'backend/new-module.web';

const testUrl = 'https://jsonplaceholder.typicode.com/todos/';

function getTodos() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(testUrl, options)
        .then(response => response.json())
        .then(data => {
            console.log('getTodos.Success:', data);
        })
        .catch((error) => {
            console.error('getTodos.Error:', error);
        });
}

function getFieldValue(name, fields) {
    return fields.find(f => f.id === name).fieldValue;
}

$w.onReady(async function () {
    console.log("Let's go!");

    getTodos();

    const userCountryResponse = await getUserCountry();
	console.log('userCountryResponse', userCountryResponse);

    const applicationResponse = await createApplication('Test', '380971234567');
	console.log('onReady.applicationResponse', applicationResponse);

    $w("#firstName").value = "John";
    $w("#lastName").value = "Smith";

    $w("#phone").value = "380971234567";

    $w("#sendBtn").label = "Click me!";

    $w("#phone").onCustomValidation((value, reject) => {
        if (!value.startsWith("380")) {
            reject("Phone must be a from Ukraine.");
        }
    });

    $w("#contactForm").onWixFormSubmit(async (event) => {
        console.log('onWixFormSubmit', event);

        const { fields } = event;

        let fullName = getFieldValue('firstName', fields) + ' ' + getFieldValue('lastName', fields);
        let phone = getFieldValue('phone', fields);            

        const applicationResponse = await createApplication(fullName, phone);
		console.log('onWixFormSubmit.applicationResponse', applicationResponse);

        return event.fields;
    });

});