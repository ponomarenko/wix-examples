/************
.web.js file
************

Backend '.web.js' files contain functions that run on the server side and can be called from page code.

Learn more at https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/web-modules/calling-backend-code-from-the-frontend

****/

/**** Call the sample multiply function below by pasting the following into your page code:

import { multiply } from 'backend/new-module.web';

$w.onReady(async function () {
   console.log(await multiply(4,5));
});

****/

import { fetch } from 'wix-fetch';
import { Permissions, webMethod } from "wix-web-module";

const userCountryUrl = 'https://fleets.uklon.com.ua/api/me/user-country';
export const getUserCountry = webMethod(
    Permissions.Anyone,
    () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(userCountryUrl, options).then(response => response.json());
    });

const createApplicationUrl = 'https://webhook.site/61db51e0-e079-437d-af2e-32500716fdf5';
export const createApplication = webMethod(
    Permissions.Anyone,
    (name, phone) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                name,
                phone
            })
        };

        return fetch(createApplicationUrl, options).then(response => response.json());
    });

export const multiply = webMethod(
    Permissions.Anyone,
    (factor1, factor2) => {
        return factor1 * factor2
    }
);