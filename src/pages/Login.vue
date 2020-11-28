<template>
  <div class="off-canvas-sidebar">
    <div class="wrapper wrapper-full-page">
      <div filter-color="black" class="page-header login-page header-filter">
        <div class="container py-0">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
              <form @submit.prevent.stop="enviar" method="post">
                <div class="card card-login">
                  <div class="card-header card-header-success text-center">
                    <div class="img-wrapper" style="overflow: hidden;">
                      <img src="../assets/images/logo.png" alt="" style="width: 100%;">
                    </div>
                    <h4 class="card-title">Frase de efeito aqui</h4>
                  </div>
                  <div class="card-body">
                    <p class="text-center text-danger font-weight-bold my-3">{{error}}</p>
                    <div class="bmd-form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="material-icons">face</i>
                          </span>
                        </div>
                        <input type="text" placeholder="Usuário" v-model="username" class="form-control" name="_username" required autofocus>
                      </div>
                    </div>
                    <div class="bmd-form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="material-icons">lock_outline</i>
                          </span>
                        </div>
                        <input type="password" placeholder="Senha" v-model="password" class="form-control" name="_password" required>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer justify-content-center">
                    <button type="submit" class="btn btn-info btn-block btn-link btn-lg">Entrar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <footer class="footer">
          <div class="container">
            <div class="copyright">
              © {{ new Date().getFullYear() }} por NVerine.
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

    export default {
        name: "Login",
        data: function(){
            return {
                username: null,
                password: null,
                error: null
            }
        },
        methods: {
            enviar: function() {
                let dados = {username: this.username, password: this.password};
                axios
                    .post('/login', dados)
                    .then(response => {
                        if(response.data.dados.token){
                            localStorage.token = response.data.dados.token;
                            this.$router.push({ name: "dashboard"});
                        }
                    })
                    .catch(error => {
                        this.error = error.response.data.error;
                    })
            }
        }
    }
</script>

<style scoped>
  .login-page.header-filter{
      background-image: url('../assets/images/login.jpg');
      background-size: cover;
      background-position: top center;
  }
</style>