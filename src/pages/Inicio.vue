<template>
  <q-page padding>
    <q-input v-model="termoPesquisa" label="Pesquisar" />

    <q-card v-if="totalPaginas == 0 && statusPesquisa == false" class="my-card q-mt-sm">
      <q-card-section>
        Não há filmes que correspondam à sua consulta.
      </q-card-section>
    </q-card>

    <q-infinite-scroll @load="onLoad" :offset="250" ref="infiniteList">
      <q-item v-for="(f, index) in filmes" :key="index" :to="{name: 'detalhes', params: { id: f.id }}" exact>
        <q-item-section top thumbnail class="q-ml-none">
          <img v-if="f.backdrop_path" :src="`https://image.tmdb.org/t/p/w500${f.backdrop_path}`">
          <img v-if="!f.backdrop_path" src="../assets/img-not.jpg">
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ f.title }}</q-item-label>
          <q-item-label caption lines="3">{{ f.overview }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-badge color="black">
            {{ Math.round(f.vote_average * 10) }} %
          </q-badge>
        </q-item-section>
      </q-item>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filmes: null,
      termoPesquisa: '',
      paginaAtual: 0,
      totalPaginas: 0,
      resultado: 0,
      statusPesquisa: false
    }
  },
  created () {
    this.$emit('altera-titulo', 'Filmes Populares')
    if(this.paginaAtual == 0) {
      this.getFilmes(null, 1)
    }
  },
  methods: {
    getFilmes (pesquisa, pagina) {
      this.$emit('progresso', true)
      this.statusPesquisa = true;

      if(pesquisa) {
        var url = `/search/movie?api_key=374e1f09ba996d9840f71bac5d4e527f&language=pt-BR&page=${pagina}&query=${pesquisa}`
      } else {
        var url = `/discover/movie?sort_by=popularity.desc&api_key=374e1f09ba996d9840f71bac5d4e527f&language=pt-BR&page=${pagina}`
      }

      this.$axios.get(url)
        .then((res) => {
          // console.log(res.data)
          if (pesquisa || pagina == 1) {
            this.filmes = res.data.results
          } else {
            this.filmes = this.filmes.concat(res.data.results)
          }

          this.paginaAtual = res.data.page
          this.totalPaginas = res.data.total_pages

          this.statusPesquisa = false
          this.$emit('progresso', false)
        })
        .catch((err) => {
          // console.log(err)
          this.statusPesquisa = false
          this.$emit('progresso', false)
        });
    },
    onLoad (index, done) {
      if(!this.statusPesquisa) {
        this.paginaAtual++
        this.getFilmes(null, this.paginaAtual)
      }
      done()
    }
  },
  watch: {
    termoPesquisa () {
      if(this.termoPesquisa.length > 2) {
        this.$emit('altera-titulo', `Pesquisa '${this.termoPesquisa}'`)
        this.getFilmes (this.termoPesquisa, 1)
      } else if(this.termoPesquisa.length == 0) {
        this.$emit('altera-titulo', 'Filmes Populares')
        this.getFilmes(null, 1)
      }
    }
  }
}
</script>
