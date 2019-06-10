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
const scoreP = document.querySelector('#scorePrincipal');
const scoreV = document.querySelector('#scoreVisitor');
const matchID = sessionStorage.getItem('match_id');
let startP = 0;
let startV = 0;

const btnPlusP = document.querySelector('#btnPrincipalPlus');
const btnMinusP = document.querySelector('#btnPrincipalMinus');
const btnPlusV = document.querySelector('#btnVisitorPlus');
const btnMinusV = document.querySelector('#btnVisitorMinus');
const typeSelect = document.querySelector('#type');
const messageInput = document.querySelector('#action');

btnPlusP.addEventListener('click', () => {
  let val = Number(scoreP.innerHTML);
  scoreP.innerHTML = ++val;
});
btnMinusP.addEventListener('click', () => {
  let val = Number(scoreP.innerHTML);
  scoreP.innerHTML = val == startP ? startP : --val;
});
btnPlusV.addEventListener('click', () => {
  let val = Number(scoreV.innerHTML);
  scoreV.innerHTML = ++val;
});
btnMinusV.addEventListener('click', () => {
  let val = Number(scoreV.innerHTML);
  scoreV.innerHTML = val == startV ? startV : --val;
});

let status;
document.querySelector('#sendBtn').addEventListener('click', () => {
  const bodyJson = JSON.stringify({
    scorePrincipal: scoreP.innerHTML,
    scoreVisitor: scoreV.innerHTML,
    action: {
      type: typeSelect.value,
      text: messageInput.value,
    },
  });
  fetch(`/match/update/${matchID}`, {
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
      redirectPage('feed.html');
    })
    .catch(err => {
      console.log(err.message);
    });
});
