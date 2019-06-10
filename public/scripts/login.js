document.querySelector('#register').addEventListener('click', () => {
  redirectPage('register.html');
});

const emailElement = document.querySelector('#email');
const passwordElement = document.querySelector('#password');
const loginBtn = document.querySelector('#login-btn');

document.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    loginBtn.click();
  }
});

let status;
loginBtn.addEventListener('click', () => {
  const bodyJson = JSON.stringify({
    email: emailElement.value,
    password: passwordElement.value,
  });
  fetch('/user/authenticate', {
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
      let date = new Date();
      date.setTime(date.getTime() + 15 * 24 * 60 * 60 * 1000);
      document.cookie = `token=${content.token}; expires=${date.toUTCString}; path=/`;
      redirectPage('feed.html');
    })
    .catch(err => {
      console.log(err.message);
    });
});
