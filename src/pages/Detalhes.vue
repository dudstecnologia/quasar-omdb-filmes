<template>
  <div>
    <img v-if="filme.backdrop_path" :src="`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`" style="width: 100%">
    <img v-if="!filme.backdrop_path" src="../assets/img-not.jpg" style="width: 100%">
    <q-page padding>
      <div class="text-center q-mb-sm">
        <q-chip>
        <q-avatar color="primary" text-color="white">{{ filme.vote_average }}</q-avatar>
        Pontuação dos Usuários
        </q-chip>
      </div>

      <div class="text-center q-mb-sm">
        <q-chip color="primary" text-color="white" icon="event">
        {{ filme.release_date | formataData }}
        </q-chip>
      </div>

      <q-card dark class="my-card bg-grey-9">
        <q-card-section>
          <div class="text-h6 text-weight-bold">SINOPSE E DETALHES</div>
        </q-card-section>
          <q-separator dark inset />

        <q-card-section>
          <div>{{ filme.overview }}</div>
        </q-card-section>
      </q-card>
  </q-page>
  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  props: [
    'id'
  ],
  data () {
    return {
      filme: {}
    }
  },
  created () {
    this.$emit('altera-titulo', 'Detalhes');
    this.getDetalhes()
  },
  methods: {
    getDetalhes () {
      this.$emit('progresso', true)

      this.$axios.get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=374e1f09ba996d9840f71bac5d4e527f&language=pt-BR`)
        .then((res) => {
          // console.log(res.data)
          this.filme = res.data
          this.$emit('progresso', false)

          this.$emit('altera-titulo', this.filme.title);
        })
        .catch((err) => {
          // console.log(err)
          this.$emit('progresso', false)
        });
    }
  },
  filters: {
    formataData: function (value) {
      return date.formatDate(Date.parse(value), 'DD/MM/YYYY')
    }
  }
}
</script>
