$(function () {

	var indice_selecionado = -1;

	var tbAnimes = localStorage.getItem("tbAnimes");// Recupera os dados armazenados


	tbAnimes = JSON.parse(tbAnimes); // Converte string para objeto

	if (tbAnimes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbAnimes = [];

	function GetAnime(propriedade, valor) {
		console.log(propriedade + valor)
		var cli = null;
		for (var item in tbAnimes){
			var i = (tbAnimes[item]);
			if (i[propriedade] == valor)
                cli = i;
		}
		return cli;
	}
	
	//bloco para adicionar novo registro
	$(".corpo").on("click", "#btnAdicionar", function () {

		var cli = GetAnime("Codigo", $("#addCode").val());

		if(cli != null){
			alert("Código já cadastrado.");
			return;
		}
		var anime = {
			Codigo: $("#addCode").val(),
			Nome: $("#addName").val(),
			Genero: $("#addGender").val(),
			Autor: $("#addAuthor").val(),
			Diretor: $("#addDirector").val(),
			Temporadas: $("#addSeasons").val(),
			Episodios: $("#addEpisodes").val(),
			Lancamento: $("#addLaunch").val(),
			Estudio: $("#addStudio").val(),
			Imagem: $('#b64').text()
		};
		tbAnimes.push(anime);
		localStorage.setItem("tbAnimes", JSON.stringify(tbAnimes));
		if (confirm("Anime adicionado com sucesso! Pressione OK para voltar a página principal e cancelar para adicionar mais animes.")) {
			url = 'index.html'
			window.open(url, "_self");
		}
	});


	//captura o clique no botao salvar da pagina editar e edita os dados do cadastro
	$(".corpo").on("click", "#btnSalvar", function () {
		var index = parseInt(localStorage.getItem("index"));
		tbAnimes[index] = {
			Codigo: $("#addCode").val(),
			Nome: $("#addName").val(),
			Genero: $("#addGender").val(),
			Autor: $("#addAuthor").val(),
			Diretor: $("#addDirector").val(),
			Temporadas: $("#addSeasons").val(),
			Episodios: $("#addEpisodes").val(),
			Lancamento: $("#addLaunch").val(),
			Estudio: $("#addStudio").val(),
			Imagem: $('#b64').text()
		};

		localStorage.setItem("tbAnimes", JSON.stringify(tbAnimes));
		console.log(tbAnimes);
		if (confirm("Informações editadas com sucesso. Retornar a página inicial?")) {
			url = 'index.html'
			window.open(url, "_self");
		};
	});

	//Mostra os dados do elemento no modal
	function view() {
		var index = parseInt(localStorage.getItem("index"));
		var tbAnimes = localStorage.getItem("tbAnimes");
		tbAnimes = JSON.parse(tbAnimes);
		$("#viewCode").text(tbAnimes[index].Codigo);
		$("#viewName").text(tbAnimes[index].Nome);
		$("#viewGender").text(tbAnimes[index].Genero);
		$("#viewAuthor").text(tbAnimes[index].Autor);
		$("#viewDirector").text(tbAnimes[index].Diretor);
		$("#viewSeasons").text(tbAnimes[index].Temporadas);
		$("#viewEpisodes").text(tbAnimes[index].Episodios);
		$("#viewLaunch").text(tbAnimes[index].Lancamento);
		$("#viewStudio").text(tbAnimes[index].Estudio);
		imgContainer = document.getElementById('imageContainer');
		imgContainer.src = tbAnimes[index].Imagem;
		modal.style.display = "block";
	}



	function Excluir() {
		tbAnimes.splice(indice_selecionado, 1);
		localStorage.setItem("tbAnimes", JSON.stringify(tbAnimes));
		alert("Anime excluído.");
	}






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
	// function Listar() {
	// 	$("#tblListar").html("");
	// 	$("#tblListar").html(
	// 		"<thead>" +
	// 		"	<tr>" +
	// 		"	<th>Opções</th>" +
	// 		"	<th>Nome</th>" +
	// 		"	<th>Gênero</th>" +
	// 		"	<th>Episódios</th>" +
	// 		"	</tr>" +
	// 		"</thead>" +
	// 		"<tbody>" +
	// 		"</tbody>"
	// 	);
     
	// 	for (i = 0; i < tbAnimes.length; i++) {
	// 		var anm = tbAnimes[i];
	// 		$("#tblListar tbody").append("<tr>" +
	// 			"	<td><button alt='" + i + "' class='btnView'>Visualizar</button></a><button alt='" + i + "' class='btnEditar'>Editar</button><button alt='" + i + "' class='btnExcluir'>Excluir</button></td>" +
	// 			"	<td>" + anm.Nome + "</td>" +
	// 			"	<td>" + anm.Genero + "</td>" +
	// 			"	<td>" + anm.Episodios + "</td>" +
	// 			"</tr>");
	// 	}
	// };

	//captura o click no botao visualizar para exibiur o modal
	$("#tblListar").on("click", ".btnView", function () {
		indice_selecionado = parseInt($(this).attr("alt"));
		localStorage.setItem("index", indice_selecionado.toString());
		// localStorage.setItem("tbAnimes", JSON.stringify(tbAnimes));
		view();
	});

	$(".show").on("click", function () {
		$(".mask").addClass("active");
	});
	function closeModal() {
		$(".mask").removeClass("active");
	}
	$(".close, .mask").on("click", function () {
		closeModal();
	});
	$(document).keyup(function (e) {
		if (e.keyCode == 27) {
			closeModal();
		}
	});

});
