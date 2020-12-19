<template>
  <!-- Image and text -->
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Datos de usuario</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <form class="d-flex">
            <button class="btn btn-success" type="button" @click="logOut">
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
    <div class="text-left container mt-5">
      <p>
        <strong>Nombre: </strong>
        {{ user.name }}
      </p>
      <p>
        <strong>Email: </strong>
        {{ user.email }}
      </p>
      <p>
        <strong>Identificación: </strong>
        {{ user.id }}
      </p>
      <p>
        <strong>Iat: </strong>
        {{ user.iat }}
      </p>
      <p>
        <strong>Exp: </strong>
        {{ user.exp }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    getUserDetails() {
      //Carga los datos guardados en el localStorage
      let user = localStorage.getItem("user");
      let token = localStorage.getItem("jwt");

      if (token) { //Si hay algo en el local Storage lo guarda en user
        this.user = JSON.parse(user);
      }
    },
    logOut() { //Al salir limpia el almacenamiento y lo regresa a la ruta de inicio
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      this.$router.push("/");
    }
  },
  created() {
    this.getUserDetails(); //Al iniciar la vista obtiene los datos del usuario
  }
};
</script>
