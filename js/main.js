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

      // Agregar el evento click a las celdas de la tabla
      $(document).on("click", "#tabla td", function() {
        // Cambiar el color de fondo de la celda al hacer clic
        $(this).toggleClass("celda-seleccionada");
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
                tableHtml += "<td style='border: 4px solid black; min-width: 25px;height: 25px;'></td>";
            }
            tableHtml += "</tr>";
        }

        $("#tabla").html(tableHtml);
    }

    $(document).on("click", "#tabla td", function() {
        // Al hacer clic en una celda, guardar la referencia a la celda seleccionada
        selectedCell = $(this);
        // Habilitar los botones para insertar y eliminar filas y columnas
        $("#insertarFilaArribaBtn, #insertarFilaAbajoBtn, #insertarColumnaIzquierdaBtn, #insertarColumnaDerechaBtn, #eliminarFilaBtn, #eliminarColumnaBtn").prop("disabled", false);
    });

    $("#insertarFilaArribaBtn").on("click", function() {
        selectedCell.parent().before(createTableRow(numCols));
        numRows++;
    });

    $("#insertarFilaAbajoBtn").on("click", function() {
        selectedCell.parent().after(createTableRow(numCols));
        numRows++;
    });

    $("#insertarColumnaIzquierdaBtn").on("click", function() {
        selectedCell.each(function() {
            // Obtener el índice de la columna seleccionada
            const columnIndex = $(this).index();
            $(this).parent().find("td").eq(columnIndex).before("<td style='border: 4px solid black; min-width: 25px;height: 25px;'></td>");
        });
        numCols++;
    });

    $("#insertarColumnaDerechaBtn").on("click", function() {
        selectedCell.each(function() {
            $(this).after("<td style='border: 4px solid black; min-width: 25px;height: 25px;'></td>");
        });
        numCols++;
    });

    $("#eliminarFilaBtn").on("click", function() {
        selectedCell.parent().remove();
        numRows--;
        // Deshabilitar los botones después de eliminar la fila
        disableButtons();
    });

    $("#eliminarColumnaBtn").on("click", function() {
        selectedCell.each(function() {
            $(this).remove();
        });
        numCols--;
        // Deshabilitar los botones después de eliminar la columna
        disableButtons();
    });

    function createTableRow(cols) {
        let rowHtml = "<tr>";
        for (let j = 0; j < cols; j++) {
            rowHtml += "<td style='border: 4px solid black; min-width: 25px;height: 25px;'></td>";
        }
        rowHtml += "</tr>";
        return rowHtml;
    }

    function disableButtons() {
        // Deshabilitar los botones si no hay una celda seleccionada
        selectedCell = null;
        $("#insertarFilaArribaBtn, #insertarFilaAbajoBtn, #insertarColumnaIzquierdaBtn, #insertarColumnaDerechaBtn, #eliminarFilaBtn, #eliminarColumnaBtn").prop("disabled", true);
    }

});
