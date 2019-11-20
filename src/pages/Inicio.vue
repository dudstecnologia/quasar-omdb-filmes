<template>
  <q-page padding>
    <p>Início</p>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filmes: []
    }
  },
  created () {
    this.$emit('altera-titulo', 'Filmes Populares')
    this.getFilmes(null)
  },
  methods: {
    getFilmes (termo) {
      this.$emit('progresso', true)

      this.$axios.get('/discover/movie?sort_by=popularity.desc&api_key=374e1f09ba996d9840f71bac5d4e527f&language=pt-BR', this.user)
        .then((res) => {
          console.log(res.data)
          this.$emit('progresso', false)
        })
        .catch((err) => {
          console.log(err);
          this.$emit('progresso', false)
        });
    },
  }
}
</script>
