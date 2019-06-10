var app = new Vue({
  el: '#app',
  data() {
    return {
      lang: '',
      dates: [],
      matches: [],
      en: {
        dayWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        month: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
      },
      pt: {
        dayWeek: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        month: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
      },
    };
  },
  async created() {
    try {
      const rawResponse = await fetch('/match/', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${this.getCookie('token')}`,
        },
      });
      let status = rawResponse.status;
      let content = await rawResponse.json();
      if (status !== 200) {
        throw new Error(content.message);
      }
      this.matches = content;
    } catch (error) {
      console.log(error);
    }

    this.lang = window.location.pathname.split('/')[1];
    this.matches.map(match => {
      if (!this.dates.includes(match.date)) {
        this.dates.push(match.date);
      }
    });
  },
  methods: {
    matchesPerDate(date) {
      return this.matches.filter(match => {
        return match.date === date;
      });
    },
    getDateHour(date) {
      const d = new Date(date);
      const dateArr = d.toGMTString().split(' ');
      let hour = dateArr[4].split(':');
      hour.pop();
      return hour.join(':');
    },
    formatDate(date) {
      const d = new Date(date);
      if (this.lang === 'en') {
        return `${this.en.dayWeek[d.getDay()]}, ${this.en.month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} `;
      }
      return `${this.pt.dayWeek[d.getDay()]}, ${d.getDate()} ${this.pt.month[d.getMonth()]} ${d.getFullYear()} `;
    },
    getCookie(cname) {
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
    },
    follow(id) {
      fetch(`/user/follow/${id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${this.getCookie('token')}`,
        },
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
    },
  },
});
