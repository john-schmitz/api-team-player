if (window.location.pathname === '/') {
  window.location = '/pt/login.html';
}

if (window.location.pathname === '/pt/') {
  window.location = 'login.html';
}

if (window.location.pathname === '/en/') {
  window.location = 'login.html';
}

function redirectPage(url, param = '') {
  const path = window.location.pathname.split('/');
  path[2] = url;
  const newUrl = path.join('/');
  if (param != '') sessionStorage.setItem('match_id', param);
  window.location = newUrl;
}
