<template>
  <q-page padding>
    <p>Detalhes, id: {{ id }}</p>
  </q-page>
</template>

<script>
export default {
  props: [
    'id'
  ],
  data () {
    return {
      // id: '',
    }
  },
  created () {
    this.$emit('altera-titulo', 'Detalhes');
  },
}
</script>
