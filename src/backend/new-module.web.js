/************
.web.js file
************

Backend '.web.js' files contain functions that run on the server side and can be called from page code.

Learn more at https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/web-modules/calling-backend-code-from-the-frontend

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
                'X-Request-Source': 'Wix',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                name,
                phone
            })
        };

        const url = new URL(createApplicationUrl);

        url.searchParams.set('ts', Date.now().toString());
        url.searchParams.set('source', 'wix');        

        return fetch(url.toString(), options).then((httpResponse) => {
            if (httpResponse.ok) {
              return httpResponse.json();
            } else {
              return Promise.reject("Fetch did not succeed");
            }
          })
          .then((json) => console.log(json.someKey))
          .catch((err) => console.log(err));
    });
