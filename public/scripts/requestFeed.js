function match(match) {
  const score = `${match.scorePrincipal} x ${match.scoreVisitor}`;
  const template = `
    <div class="col card">
        <div class="my-2 text-center">${match.modality}</div>
        <div class="row align-items-center justify-content-center">
            <div class="col">
                <div class="team">
                    <img class="shield" src="${match.shieldPrincipal}" alt="img time 1">
                    <strong>${match.namePricipal}</strong>
                </div>
            </div>
            <div class="col align-center px-0">
                <div class="my-2 text-center">
                    <span class="score">${score}</span>
                </div>
            </div>
            <div class="col">
                <div class="team">
                    <img class="shield" src="${match.shieldVisitor}" alt="img time 2">
                    <strong>${match.nameVisitor}</strong>
                </div>
            </div>
        </div>
        <hr>
        <div class="container">
            <div class="row flex-nowrap px-1">
                <img class="icon" src="../assets/redcard.png" alt>
                <p class="text-left pl-2">${match.action.text}</p>
            </div>
        </div>
    </div>
`;
  return template;
}

const feed = [
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
  {
    namePricipal: 'Corinthians',
    nameVisitor: 'Gremio',
    scorePrincipal: 6,
    scoreVisitor: 0,
    shieldPrincipal: '../assets/corinthians.svg',
    shieldVisitor: '../assets/gremio.svg',
    modality: 'Futebol',
    action: {
      type: 'Infração',
      text: 'Wellington recebeu cartão vermelho',
    },
    aditional: {},
  },
];

const feedWrapper = document.querySelector('#feed');
feed.forEach(item => {
  const matchElement = match(item);
  feedWrapper.innerHTML += matchElement;
});
