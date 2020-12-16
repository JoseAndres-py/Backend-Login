<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top: 70px; height: auto; padding-top: 100px !important"
          @submit.prevent="loginUser"
        >
          <h1 class="h3 mb-3 font-weight-normal" style="textalign: center">
            Iniciar de sesión
          </h1>
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="login.email"
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Contraseña"
            v-model="login.password"
          />
          <!-- inicio sesion button -->
          <center>
            <button class="btn btn-primary btn-block w-75 my4" type="submit">
              Inicio de sesion
            </button>
          </center>
        </form>
      </div>
    </div>
    <pre>{{ login }}</pre>
  </div>
</template>

<script>
import swal from "sweetalert";
import jwt_decode from "jwt-decode"; //Importar el desencriptador
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/api/auth/signin", this.login);
        let token = response.data.accessToken;
        let user = jwt_decode(token); //desencripta el token

        localStorage.setItem("jwt", token);
        localStorage.setItem("user", JSON.stringify(user));
        if (token) {
          swal("Exitoso", "login exitoso", "success");
          this.$router.push("/panel");
        }
      } catch (err) {
        swal("Error", "Datos incorrectos", "error");
        console.log(err.response);
      }
    }
  }
};
</script>
