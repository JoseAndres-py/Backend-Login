<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top: 70px; height: auto; padding-top: 100px !important"
          @submit.prevent="loginUser"
        >
        
          <h1 class="h3 mb-4 font-weight-normal" style="textalign: center">
            Iniciar Sesión
          </h1>
        
          <input
            type="text"
            id="email"
            class="form-control mb-4"
            placeholder="Email"
            v-model="login.email"
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-4"
            placeholder="Contraseña"
            v-model="login.password"
          />
          <!-- inicio sesion button -->
          <center>
            <button class="btn btn-info btn-block w-75 my4" type="submit">
              Ingresar
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";

export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/api/auth/signin", this.login);
        console.log(response.data);
        let token = response.data.accessToken;
        localStorage.setItem("jwt", token);
        if (token) {
          swal("Exitoso", "Ingreso correcto", "success");
          this.$router.push("/panel");
        }
      } catch (err) {
        swal("Error", "Datos incorrectos", "error");
        console.log(err.response);
      }
    },
  },
};
</script>