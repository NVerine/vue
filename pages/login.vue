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
                    <h4 class="card-title">Leading to new places</h4>
                  </div>
                  <div class="card-body">
                    <p class="text-center text-danger font-weight-bold my-3">{{ error }}</p>
                    <div class="bmd-form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-user"></i>
                          </span>
                        </div>
                        <input type="text" placeholder="Username" v-model="username" class="form-control"
                               name="_username" required autofocus>
                      </div>
                    </div>
                    <div class="bmd-form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-lock"></i>
                          </span>
                        </div>
                        <input type="password" placeholder="Password" v-model="password" class="form-control"
                               name="_password" required>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer justify-content-center">
                    <button type="submit" class="btn btn-info btn-block btn-success btn-lg">Log in</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <footer class="footer">
          <div class="container">
            <div class="copyright">
              © {{ new Date().getFullYear() }} by NVerine.
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'PublicEmpty',
  name: "login",
  data: function () {
    return {
      username: null,
      password: null,
      error: null
    };
  },
  methods: {
    enviar: function () {
      let dados = {username: this.username, password: this.password};
      this.$backend
        .post("/login", dados)
        .then(response => {
          this.$store.dispatch("session/login", response.data.data.items);
        })
    }
  },
  beforeCreate() {
    if (process.browser && this.$helper.isLogged()) {
      this.$helper.toStart();
    }
  }
};
</script>

<style scoped>
.login-page.header-filter {
  background-image: url('../assets/images/login.jpg');
  background-size: cover;
  background-position: top center;
}
</style>