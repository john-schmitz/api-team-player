var app = new Vue({
  el: '#app',
  data() {
    return {
      matches: [],
    };
  },
  async created() {
    try {
      const rawResponse = await fetch('/user/feed', {
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
      this.matches = content.sort((a, b) => {
        return b.id - a.id;
      });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    formatScore(scorePrincipal, scoreVisitor) {
      return `${scorePrincipal} x ${scoreVisitor}`;
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
    getIcon(type) {
      return type + '.png';
    },
  },
});
