<template>
    <div class="limiter">
		<div class="container-login100" style="background-image: url('images/bg-01.jpg');">
			<div class="wrap-login100">
				<form class="login100-form validate-form" @submit.prevent="loginUser">
					<span class="login100-form-logo">
						<i class="zmdi zmdi-account-circle"></i>
					</span>

					<span class="login100-form-title p-b-34 p-t-27">
						Inicio
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Correo inválido">
						<input class="input100" name="username" type="email" placeholder="Correo electrónico" v-model="login.email">
						<span class="focus-input100" data-placeholder=""></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Contraseña Invalida">
						<input class="input100" type="password" name="pass" placeholder="Contraseña" v-model="login.password">
						<span class="focus-input100" data-placeholder=""></span>
					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
							Ingreso
						</button>
					</div>
				</form>
			</div>
		</div>
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
          swal("Exitoso", "Ingreso correcto", "success");
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
