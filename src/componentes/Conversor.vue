<template>
  <div>
    <h1>Conversor a Dólares</h1>
    <hr />
    <p>Ingrese monto $ <input type="number" v-model="pesos" /></p>
    <p>
      Valor del dólar en $ <input type="number" v-model="dolar" /> -
      Actualización: <input type="checkbox" v-model="actualizar" />
      <span v-if="horaAct"> {{ horaAct }}</span>
    </p>
    <p>
      Valor Convertido U$D <span>{{ conversor }}</span>
    </p>
    <hr />
    <p>Respuestas: 1:B 2:B y D 3:C 4:B y E 5:C</p>
  </div>
</template>

<script>
import { getValorDolar } from "../servicios/dolarActual.js";

export default {
  name: "src-componentes-conversor",
  data() {
    return {
      pesos: 0,
      dolar: 0,
      actualizar: false,
      horaAct: null,
      intervalId: null,
    };
  },
  computed: {
    conversor() {
      let conversion =
        !isNaN(this.pesos) && this.pesos && !isNaN(this.dolar) && this.dolar
          ? (Number(this.pesos) / Number(this.dolar)).toFixed(2)
          : "";
      return conversion;
    },
  },
  watch: {
    actualizar(val) {
      if (val) {
        this.iniciarActualizarAutom();
      } else { 
        this.pararActualizarAutom();
        this.horaAct = null; 
      }
    },
  },
  methods: {
    async fetchValorDolar() {
      try {
        const valores = await getValorDolar();
        this.dolar = valores.blue.value_sell;
        this.horaAct = new Date().toLocaleString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
        });
      } catch (error) {
        console.error(error);
      }
    },
    iniciarActualizarAutom() {
      this.fetchValorDolar();
      this.intervalId = setInterval(this.fetchValorDolar, 2000);
    },
    pararActualizarAutom() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
  },
  beforeUnmount() {
    this.pararActualizarAutom();
  },
};
</script>

<style></style>
