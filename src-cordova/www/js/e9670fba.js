(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["e9670fba"],{"92b5":function(A,t,e){"use strict";e.r(t);var a=function(){var A=this,t=A.$createElement,a=A._self._c||t;return a("q-page",{attrs:{padding:""}},[a("q-input",{attrs:{label:"Pesquisar"},model:{value:A.termoPesquisa,callback:function(t){A.termoPesquisa=t},expression:"termoPesquisa"}}),0==A.totalPaginas&&0==A.statusPesquisa?a("q-card",{staticClass:"my-card q-mt-sm"},[a("q-card-section",[A._v("\n      Não há filmes que correspondam à sua consulta.\n    ")])],1):A._e(),a("q-infinite-scroll",{ref:"infiniteList",attrs:{offset:250},on:{load:A.onLoad},scopedSlots:A._u([{key:"loading",fn:function(){return[a("div",{staticClass:"row justify-center q-my-md"},[a("q-spinner-dots",{attrs:{color:"primary",size:"40px"}})],1)]},proxy:!0}])},A._l(A.filmes,(function(t,s){return a("q-item",{key:s,attrs:{to:{name:"detalhes",params:{id:t.id}},exact:""}},[a("q-item-section",{staticClass:"q-ml-none",attrs:{top:"",thumbnail:""}},[t.backdrop_path?a("img",{attrs:{src:"https://image.tmdb.org/t/p/w500"+t.backdrop_path}}):A._e(),t.backdrop_path?A._e():a("img",{attrs:{src:e("d170")}})]),a("q-item-section",[a("q-item-label",{attrs:{lines:"1"}},[A._v(A._s(t.title))]),a("q-item-label",{attrs:{caption:"",lines:"3"}},[A._v(A._s(t.overview))])],1),a("q-item-section",{attrs:{side:"",top:""}},[a("q-badge",{attrs:{color:"black"}},[A._v("\n          "+A._s(Math.round(10*t.vote_average))+" %\n        ")])],1)],1)})),1)],1)},s=[],i={data:function(){return{filmes:null,termoPesquisa:"",paginaAtual:0,totalPaginas:0,resultado:0,statusPesquisa:!1}},created:function(){this.$emit("altera-titulo","Filmes Populares"),0==this.paginaAtual&&this.getFilmes(null,1)},methods:{getFilmes:function(A,t){var e=this;if(this.$emit("progresso",!0),this.statusPesquisa=!0,A)var a="/search/movie?api_key=374e1f09ba996d9840f71bac5d4e527f&language=pt-BR&page=".concat(t,"&query=").concat(A);else a="/discover/movie?sort_by=popularity.desc&api_key=374e1f09ba996d9840f71bac5d4e527f&language=pt-BR&page=".concat(t);this.$axios.get(a).then((function(a){e.filmes=A||1==t?a.data.results:e.filmes.concat(a.data.results),e.paginaAtual=a.data.page,e.totalPaginas=a.data.total_pages,e.statusPesquisa=!1,e.$emit("progresso",!1)})).catch((function(A){e.statusPesquisa=!1,e.$emit("progresso",!1)}))},onLoad:function(A,t){this.statusPesquisa||(this.paginaAtual++,this.getFilmes(null,this.paginaAtual)),t()}},watch:{termoPesquisa:function(){this.termoPesquisa.length>2?(this.$emit("altera-titulo","Pesquisa '".concat(this.termoPesquisa,"'")),this.getFilmes(this.termoPesquisa,1)):0==this.termoPesquisa.length&&(this.$emit("altera-titulo","Filmes Populares"),this.getFilmes(null,1))}}},o=i,r=e("2877"),n=e("fe09"),l=Object(r["a"])(o,a,s,!1,null,null,null);t["default"]=l.exports;l.options.components=Object.assign({QPage:n["o"],QInput:n["j"],QCard:n["d"],QCardSection:n["e"],QInfiniteScroll:n["i"],QItem:n["k"],QItemSection:n["m"],QItemLabel:n["l"],QBadge:n["b"],QSpinnerDots:n["r"]},l.options.components||{})},d170:function(A,t){A.exports="data:image/jpeg;base64,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"}}]);