<script setup>
</script>

<template>
  <header>
    <div class="wrapper ">
      <div class="container">
        <div class="d-flex justify-content-center">
          <img alt="Vue logo" class="img-fluid" src="../assets/images/estacio-logo.svg" width="125" height="125" />
        </div>

        <div class="m-3 d-flex justify-content-center">
          <h1>Bem-vindo ao Questionados</h1>
        </div>

        <div class="d-flex justify-content-center">
          <nav>
            <RouterLink class="btn btn-primary" to="/simulado">Iniciar Game</RouterLink>
          </nav>
        </div>
      </div>
    </div>
  </header>

</template>

<style scoped>

header {
  width: 100%;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}

</style>