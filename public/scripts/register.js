document.querySelector('#alreadyLogin').addEventListener('click', () => {
  redirectPage('login.html');
});

const nameElement = document.querySelector('#name');
const nameOrgElement = document.querySelector('#nameOrg');
const emailElement = document.querySelector('#email');
const passwordElement = document.querySelector('#password');
const registerBtn = document.querySelector('#register-btn');

document.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    registerBtn.click();
  }
});

let status;
registerBtn.addEventListener('click', () => {
  const bodyJson = JSON.stringify({
    name: nameElement.value,
    nameOrganization: nameOrgElement.value,
    email: emailElement.value,
    password: passwordElement.value,
  });
  fetch('/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: bodyJson,
  })
    .then(rawResponse => {
      status = rawResponse.status;
      return rawResponse.json();
    })
    .then(content => {
      if (status !== 200) {
        throw new Error(content.message);
      }
      redirectPage('login.html');
    })
    .catch(err => {
      if (status === 406) {
        document.querySelector('#error').style.display = 'block';
      }
      console.log(err.message);
    });
});
