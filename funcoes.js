$(function(){
	

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;

	var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados
	var editarIndex = localStorage.getItem("index");

	tbClientes = JSON.parse(tbClientes); // Converte string para objeto

	if(tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbClientes = [];

	function Adicionar(){
		var cli = GetCliente("Codigo", $("#txtCodigo").val());

		if(cli != null){
			alert("Código já cadastrado.");
			return;
		}

		var cliente = JSON.stringify({
			Codigo: $("#txtCodigo").val(),
			Nome: $("#txtNome").val(),
			Genero: $("#txtGenero").val(),
			SubGenero: $("#txtSubGenero").val(),
			Temporadas: $("#txtTemporadas").val(),
			Episodios: $("#txtEpisodios").val(),
			Lancamento: $("#txtLancamento").val()
		});

		tbClientes.push(cliente);

		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));

		alert("Anime adicionado.");
		return true;
	}

	//Mostra os dados do elemento no modal
	function view(){
        var index = parseInt(localStorage.getItem("index"));
        var tbClientes = localStorage.getItem("tbClientes");
        tbClientes = JSON.parse(tbClientes); 
        var current = JSON.parse(tbClientes[index]);
        console.log(index);
        console.log(current);
		console.log(current.Nome);
		$("#Codigo").text(current.Codigo);
		$("#Nome").text(current.Nome);
		$("#Genero").text(current.Genero);
		$("#SubGenero").text(current.SubGenero);
		$("#Temporadas").text(current.Temporadas);
		$("#Episodios").text(current.Episodios);
		$("#Lancamento").text(current.Lancamento);
	}
		
	//edita os dados do elemento na pagina de edição
	function Editar(){

		var index = parseInt(localStorage.getItem("index"));


		tbClientes[index] = JSON.stringify({
			Codigo: $("#txtCodigo").val(),
			Nome: $("#txtNome").val(),
			Genero: $("#txtGenero").val(),
			SubGenero: $("#txtSubGenero").val(),
			Temporadas: $("#txtTemporadas").val(),
			Episodios: $("#txtEpisodios").val(),
			Lancamento: $("#txtLancamento").val()
		});
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	}

	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"	<th>Opções</th>"+
			"	<th>Código</th>"+
			"	<th>Nome</th>"+
			"	<th>Genero</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		 for(var i in tbClientes){
			var cli = JSON.parse(tbClientes[i]);
		  	$("#tblListar tbody").append("<tr>"+
									 	 "	<td><a href='#janela1' rel='modal'><button alt='"+i+"' class='btnView'>Visualizar</button><button alt='"+i+"' class='btnEditar'>Editar</button><button alt='"+i+"' class='btnExcluir'>Excluir</button></td>" + 
										 "	<td>"+cli.Codigo+"</td>" + 
										 "	<td>"+cli.Nome+"</td>" + 
										 "	<td>"+cli.Genero+"</td>" + 
		  								 "</tr>");
		 }
	}

	

	function Excluir(){
		tbClientes.splice(indice_selecionado, 1);
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Anime excluído.");
	}
	

	function GetCliente(propriedade, valor){
		var cli = null;
        for (var item in tbClientes) {
            var i = JSON.parse(tbClientes[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
	}

	Listar();

	$("#frmCadastro").on("submit",function(){
		return Adicionar();	
	});


	$("#frmEditar").on("submit",function(){
		return Editar();	
	});

	

	$("#tblListar").on("click", ".btnEditar", function(){
		indice_selecionado = parseInt($(this).attr("alt"));

		localStorage.setItem("index", indice_selecionado.toString());
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
	
		console.log(indice_selecionado);
		
		window.location.href = "editar.html"
		
	});

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});



	$("#tblListar").on("click", ".btnView", function(){
		
		indice_selecionado = parseInt($(this).attr("alt"));
		localStorage.setItem("index", indice_selecionado.toString());
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		
		view();
	});

	$(document).ready(function(){
		$("a[rel=modal]").click( function(ev){
			ev.preventDefault();
	 
			var id = $(this).attr("href");
	 
			var alturaTela = $(document).height();
			var larguraTela = $(window).width();
		 
			//colocando o fundo preto
			$('#mascara').css({'width':larguraTela,'height':alturaTela});
			$('#mascara').fadeIn(1000); 
			$('#mascara').fadeTo("slow",0.8);
	 
			var left = ($(window).width() /2) - ( $(id).width() / 2 );
			var top = ($(window).height() / 2) - ( $(id).height() / 2 );
		 
			$(id).css({'top':top,'left':left});
			$(id).show();   
		});
	 
		$("#mascara").click( function(){
			$(this).hide();
			$(".window").hide();
		});
	 
		$('.fechar').click(function(ev){
			ev.preventDefault();
			$("#mascara").hide();
			$(".window").hide();
		});
	});
});