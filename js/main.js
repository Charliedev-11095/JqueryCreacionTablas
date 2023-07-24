$(document).ready(function() {
    let numRows = 0;
    let numCols = 0;
    const MAX_COLS = 12; // Número máximo de columnas

    $("#crearTablaBtn").on("click", function() {
        numRows = parseInt(prompt("Ingrese el número de fila:"));
        numCols = parseInt(prompt("Ingrese el número de columnas(Max. 12):"));

        if (numRows > 0 && numCols > 0 && numCols <= MAX_COLS) {
            createTable(numRows, numCols);
            $("#tablaContainer").show();
            $("#eliminarTablaBtn, #eliminarPrimeraFilaBtn, #eliminarUltimaFilaBtn, #eliminarPrimeraColumnaBtn, #eliminarUltimaColumnaBtn, #textoCelda, #agregarTextoCeldaBtn").prop("disabled", false);
        } else {
            alert("Ingrese un número válido de filas y columnas (mayor a 0 y no más de " + MAX_COLS + ").");
        }
    });

    $("#eliminarTablaBtn").on("click", function() {
        $("#tabla").empty();
        numRows = 0;
        numCols = 0;
        $("#eliminarTablaBtn, #eliminarPrimeraFilaBtn, #eliminarUltimaFilaBtn, #eliminarPrimeraColumnaBtn, #eliminarUltimaColumnaBtn, #textoCelda, #agregarTextoCeldaBtn").prop("disabled", true);
    });

    $("#eliminarPrimeraFilaBtn").on("click", function() {
        $("#tabla tr:first").remove();
        numRows--;
    });

    $("#eliminarUltimaFilaBtn").on("click", function() {
        $("#tabla tr:last").remove();
        numRows--;
    });

    $("#eliminarPrimeraColumnaBtn").on("click", function() {
        $("#tabla tr").each(function() {
            $(this).find("td:first").remove();
        });
        numCols--;
    });

    $("#eliminarUltimaColumnaBtn").on("click", function() {
        $("#tabla tr").each(function() {
            $(this).find("td:last").remove();
        });
        numCols--;
    });

    $("#agregarTextoCeldaBtn").on("click", function() {
        const fila = parseInt(prompt("Ingrese el número de fila (1 a " + numRows + "):"));
        const columna = parseInt(prompt("Ingrese el número de columna (1 a " + numCols + "):"));
        const texto = $("#textoCelda").val();

        if (fila >= 1 && fila <= numRows && columna >= 1 && columna <= numCols) {
            $("#tabla tr:nth-child(" + fila + ") td:nth-child(" + columna + ")").text(texto);
            $("#textoCelda").val(""); // Limpiar el contenido del campo de texto
        } else {
            alert("Ingrese un número válido de fila y columna.");
        }
    });

    function createTable(rows, cols) {
        let tableHtml = "";

        for (let i = 0; i < rows; i++) {
            tableHtml += "<tr>";
            for (let j = 0; j < cols; j++) {
                tableHtml += "<td></td>";
            }
            tableHtml += "</tr>";
        }

        $("#tabla").html(tableHtml);
    }
});
