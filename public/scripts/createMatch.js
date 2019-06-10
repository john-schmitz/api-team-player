function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const placeInput = document.querySelector('#place');
const dateInput = document.querySelector('#date');
let status = 0;
document.querySelector('#send').addEventListener('click', () => {
  let dateArr = dateInput.value.split('-');
  let formattedDate = new Date();
  formattedDate.setDate(Number(dateArr[2]));
  formattedDate.setMonth(Number(dateArr[1]));
  formattedDate.setFullYear(Number(dateArr[0]));

  const bodyJson = JSON.stringify({
    namePrincipal: 'Corinthians',
    nameVisitor: 'Gremio',
    modality: 'Futebol',
    place: placeInput.value,
    date: formattedDate.toJSON(),
  });
  fetch('/match/new', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `bearer ${getCookie('token')}`,
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
      redirectPage('follow.html');
    })
    .catch(err => {
      console.log(err.message);
    });
});
