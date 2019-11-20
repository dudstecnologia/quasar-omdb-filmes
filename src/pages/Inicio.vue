<template>
  <q-page padding>

    <p>Total Páginas: {{ totalPaginas }}</p>
    <p>Página Atual: {{ paginaAtual }}</p>

    <q-infinite-scroll @load="onLoad" :offset="250">
      <q-item v-for="f in filmes" :key="f.id" :to="{name: 'detalhes', params: { id: f.id }}" exact>
        <q-item-section top thumbnail class="q-ml-none">
          <img :src="`https://image.tmdb.org/t/p/w500${f.backdrop_path}`">
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
      paginaAtual: 0,
      totalPaginas: 0,
      resultado: 0,
      statusPesquisa: false
    }
  },
  created () {
    this.$emit('altera-titulo', 'Filmes Populares')
    // if(this.paginaAtual == 0) {
    //   this.getFilmes(null, 1)
    // }
  },
  methods: {
    getFilmes (pesquisa, pagina, done) {
      this.$emit('progresso', true)

      console.log("Entrou aqui, pagina: " + pagina)

      this.statusPesquisa = true;

      let url = '/discover/movie?sort_by=popularity.desc&api_key=374e1f09ba996d9840f71bac5d4e527f&language=pt-BR';

      // if(pesquisa) {
      //   var url = `/discover/movie?sort_by=popularity.desc&api_key=374e1f09ba996d9840f71bac5d4e527f&language=pt-BR&page=${pagina}&query=${pesquisa}`
      // } else {
      //   var url = `/discover/movie?sort_by=popularity.desc&api_key=374e1f09ba996d9840f71bac5d4e527f&language=pt-BR&page=${pagina}`
      // }

      if(pesquisa) {
        url += `&page=${pagina}&query=${pesquisa}`
      } else {
        url += `&page=${pagina}`
      }

      // this.$axios.get(`/discover/movie?sort_by=popularity.desc&api_key=374e1f09ba996d9840f71bac5d4e527f&language=pt-BR&page=${pagina}`)
      this.$axios.get(url)
        .then((res) => {
          console.log(res.data)

          // this.filmes = res.data.results
          if(this.paginaAtual == 0) {
            this.filmes = res.data.results
          } else {
            this.filmes = this.filmes.concat(res.data.results)
          }
          // this.filmes = this.filmes.concat(res.data.results)

          this.paginaAtual = res.data.page
          this.totalPaginas = res.data.total_pages

          this.$emit('progresso', false)
          this.statusPesquisa = false
          done()
        })
        .catch((err) => {
          console.log(err)
          this.$emit('progresso', false)
          this.statusPesquisa = false
          done()
        });
    },
    detalhesFilme(id) {
      console.log('Selecionou: ' + id)
    },
    onLoad (index, done) {
      console.log('Está no onload')
      // console.log(done);
      // done()
      if(this.paginaAtual == 0) {
        this.getFilmes(null, 1, done)
      } else if(!this.statusPesquisa) {
        this.paginaAtual++
        this.getFilmes(null, this.paginaAtual, done)
      }
    }
  }
}
</script>
