


$(function () {

	var indice_selecionado = -1;

	var tbAnimes = localStorage.getItem("tbAnimes");// Recupera os dados armazenados


	tbAnimes = JSON.parse(tbAnimes); // Converte string para objeto

	if (tbAnimes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbAnimes = [];

	$(".corpo").on("click","#btnAdicionar",function() {
		var anm = GetAnime("Código", $("#addCode").val());
		if (anm != null) {
			alert("Código já cadastrado.");
			return;
		}
		var anime = JSON.stringify({
			Código: $("#addCode").val(),
			Nome: $("#addName").val(),
			Gênero: $("#addGender").val(),
			Autor: $("#addAuthor").val(),
			Diretor: $("#addDirector").val(),
			Temporadas: $("#addSeasons").val(),
			Episódios: $("#addEpisodes").val(),
			Lançamento: $("#addLaunch").val(),
			Estudio: $("#addStudio").text(),
			Imagem: $('#b64').text()
		});
		tbAnimes.push(anime);
		localStorage.setItem("tbAnimes", JSON.stringify(tbAnimes));
		if (confirm("Anime adicionado com sucesso! Pressione OK para voltar a página principal e cancelar para adicionar mais animes.")) {
			url = 'index.html'
			window.open(url, "_self");
		}
	});

	//Mostra os dados do elemento no modal
	function view() {
		var index = parseInt(localStorage.getItem("index"));
		var tbAnimes = localStorage.getItem("tbAnimes");
		tbAnimes = JSON.parse(tbAnimes);
		var current = JSON.parse(tbAnimes[index]);
		$("#viewCode").text(current.Código);
		$("#viewName").text(current.Nome);
		$("#viewGender").text(current.Gênero);
		$("#viewAuthor").text(current.Autor);
		$("#viewDirector").text(current.Diretor);
		$("#viewSeasons").text(current.Temporadas);
		$("#viewEpisodes").text(current.Episódios);
		$("#viewLaunch").text(current.Lançamento);
		$("#viewStudio").text(current.Estudio);
		carregarImagem()
	}

	function carregarImagem() {
		var index = parseInt(localStorage.getItem("index"));
		var tbAnimes = localStorage.getItem("tbAnimes");
		tbAnimes = JSON.parse(tbAnimes);
		var current = JSON.parse(tbAnimes[index]);
		imgContainer = document.getElementById('imageContainer');
		imgContainer.src = current.Imagem;

	};

	//captura o clique no botao salvar da pagina editar e edita os dados do cadastro
	$(".corpo").on("click", "#btnSalvar", function () {
			var index = parseInt(localStorage.getItem("index"));
			tbAnimes[index] = JSON.stringify({
				Código: $("#addCode").val(),
				Nome: $("#addName").val(),
				Gênero: $("#addGender").val(),
				Autor: $("#addAuthor").val(),
				Diretor: $("#addDirector").val(),
				Temporadas: $("#addSeasons").val(),
				Episódios: $("#addEpisodes").val(),
				Lançamento: $("#addLaunch").val(),
				Estudio: $("#addStudio").val(),
				Imagem: $('#b64').text()
			});

			localStorage.setItem("tbAnimes", JSON.stringify(tbAnimes));
			console.log(tbAnimes);
			if(confirm("Informações editadas com sucesso. Retornar a página inicial?")){
			url = 'index.html'
			window.open(url, "_self");
		};
	});
	

	function Listar() {
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>" +
			"	<tr>" +
			"	<th>Opções</th>" +
			"	<th>Nome</th>" +
			"	<th>Gênero</th>" +
			"	<th>Episódios</th>" +
			"	</tr>" +
			"</thead>" +
			"<tbody>" +
			"</tbody>"
		);

		for (var i in tbAnimes) {
			var anm = JSON.parse(tbAnimes[i]);
			$("#tblListar tbody").append("<tr>" +
				"	<td><a href='#janela1' rel='modal'><button alt='" + i + "' class='btnView'>Visualizar</button></a><button alt='" + i + "' class='btnEditar'>Editar</button><button alt='" + i + "' class='btnExcluir'>Excluir</button></td>" +
				"	<td>" + anm.Nome + "</td>" +
				"	<td>" + anm.Gênero + "</td>" +
				"	<td>" + anm.Episódios + "</td>" +
				"</tr>");
		}
	}



	function Excluir() {
		tbAnimes.splice(indice_selecionado, 1);
		localStorage.setItem("tbAnimes", JSON.stringify(tbAnimes));
		alert("Anime excluído.");
	}


	function GetAnime(propriedade, valor) {
		var cli = null;
		for (var item in tbAnimes) {
			var i = JSON.parse(tbAnimes[item]);
			if (i[propriedade] == valor)
				cli = i;
		}
		return cli;
	}

	Listar();

	//pega o index do anime(row) escolhido e direciona para edição
	$("#tblListar").on("click", ".btnEditar", function () {
		indice_selecionado = parseInt($(this).attr("alt"));
		localStorage.setItem("index", indice_selecionado.toString());
		localStorage.setItem("tbAnimes", JSON.stringify(tbAnimes));
		window.location.href = "edtanimes.html"
	});

	//seleciona o item para excluir
	$("#tblListar").on("click", ".btnExcluir", function () {
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});


	//captura o click no botao visualizar para exibiur o modal
	$("#tblListar").on("click", ".btnView", function () {
		indice_selecionado = parseInt($(this).attr("alt"));
		localStorage.setItem("index", indice_selecionado.toString());
		localStorage.setItem("tbAnimes", JSON.stringify(tbAnimes));
		view();
	});



	//manipula a pagina 
	$(document).ready(function () {
		$("a[rel=modal]").click(function (ev) {
			ev.preventDefault();
			var id = $(this).attr("href");
			var alturaTela = $(document).height();
			var larguraTela = $(window).width();
			$('#mascara').css({ 'width': larguraTela, 'height': alturaTela });
			$('#mascara').fadeIn(1000);
			$('#mascara').fadeTo("slow", 0.8);
			var left = ($(window).width() / 3) - ($(id).width() / 3);
			var top = ($(window).height() / 3) - ($(id).height() / 3);
			$(id).css({ 'top': top, 'left': left });
			$(id).show();
		});
		$("#mascara").click(function () {
			$(this).hide();
			$(".window").hide();
		});
		$('.fechar').click(function (ev) {
			ev.preventDefault();
			$("#mascara").hide();
			$(".window").hide();
		});
	});
});