<template>
  <q-page padding>
    <p>Detalhes</p>
  </q-page>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {
    this.$emit('altera-titulo', 'Detalhes');
  },
}
</script>
