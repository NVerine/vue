<template>
  <nav class="navbar p-1 m-0 navbar-expand-md fixed-top">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <router-link class="nav-link pl-0" data-toggle="tab" role="tablist" :to="{name: 'index'}">
          <img width="120" src="../assets/images/logo.png">
        </router-link>
      </div>
      <form class="navbar-form px-0">
				<span class="bmd-form-group">
					<div class="input-group no-border">
						<input id="live-search" type="text" value="" class="form-control ui-autocomplete-input" placeholder="Pesquisar..." autocomplete="off" >
							<button type="submit" class="btn btn-info btn-round btn-just-icon d-none d-sm-block" >
								<i class="fa fa-search"></i>
							</button>
						</div>
					</span>
      </form>
      <div id="navigation" class="my-2 my-md-0" >
        <ul class="navbar-nav mt-0 flex-column flex-sm-row">
          <mobile-menu></mobile-menu>
          <li class="nav-item dropdown message-menu">
            <a id="messageDropdown" class="nav-link p-2 p-md-3" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
              <i class="fa fa-envelope"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <h4 class="dropdown-header"> Mensagens </h4>
              <div class="dropdown-divider"></div>
              <div class="menu-body">
                <h5 class="menu-header" onclick="destinoMenu('mensagens&amp;u=%3F')" > Ver mais </h5>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown alert-menu">
            <a id="alertDropdown" class="nav-link p-2 p-md-3" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
              <i class="fa fa-bell"></i>
              <span class="notification">3</span>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <h4 class="dropdown-header"> Mensagens </h4>
              <a class="dropdown-item py-1 d-block px-2" href="?pagina=suporte_chamados&amp;pesq_chamado=141" >
                <p class="row m-0" style="white-space:pre-wrap;" >
                  <strong>Atraso:</strong> Google analytics/ADS
                </p>
                <p class="m-0 mt-2">
										<span class="misterio">
											<i class="fa fa-calendar-o"></i>
										</span>
                </p>
              </a>
              <a class="dropdown-item py-1 d-block px-2" href="?pagina=suporte_chamados&amp;pesq_chamado=143" >
                <p class="row m-0" style="white-space:pre-wrap;" >
                  <strong>Atraso:</strong> Projetar reestruturação do Portal - Oficinas
                </p>
                <p class="m-0 mt-2">
										<span class="misterio">
											<i class="fa fa-calendar-o"></i>
										</span>
                </p>
              </a>
              <a class="dropdown-item py-1 d-block px-2" href="?pagina=suporte_chamados&amp;pesq_chamado=161" >
                <p class="row m-0" style="white-space:pre-wrap;" >
                  <strong>Atraso:</strong> Permissões de visualizações - EDUCACIONAL
                </p>
                <p class="m-0 mt-2">
										<span class="misterio">
											<i class="fa fa-calendar-o"></i>
										</span>
                </p>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown user-menu">
            <a id="ususarioDropdown" class="nav-link p-2 p-md-3" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
              <i class="fa fa-user"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <h4 class="dropdown-header">
                <img src="uploads/galeria/teste/usuario/Anotacao_2020-01-09_115139.png">
              </h4>
              <div class="menu-body">
                <h5 onclick="Tools.redirect('?pagina=perfil&amp;pesq_num=0', false, true)" class="menu-header" > Usuário Padrão
                  <span class="misterio">Administrador</span>
                </h5>
              </div>
              <div class="dropdown-divider"></div>
              <div class="menu-body">
                <router-link class="menu-header" :to="{name: 'logout'}"> Sair </router-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import MobileMenu from "./MobileMenu";
  export default {
      components: { MobileMenu }
  };
</script>
