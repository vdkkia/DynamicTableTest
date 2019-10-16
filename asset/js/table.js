//populateSampleSourceTable(1)

function AddCell() {
    let colCount = $('.tableX').columnCount() + 1;
    let newColName = $("#col_name").val();
    if (newColName.length < 3) {
        alert("Please enter a valid column name!");
        return;
    }
    $('.tableX').find('thead').find('th').eq(colCount - 2).after('<th>' + newColName + '</th>');


    $('.tableX').find('tr').each(function() {
        $(this).find('td').eq(colCount - 2).after('<td>TBD</td>');
    });
}

$.fn.columnCount = function() {
    return $('th', $(this).find('thead')).length;
};

$.fn.rowcount = function() {
    return $('tr', $(this).find('tbody')).length;
};

function AddRow() {
    let rowCount = $('.tableX').rowcount() + 1;

    // console.log($('.table tbody tr:last-child').html())
    let newRow;
    $('.tableX thead tr').find('th').each(function() {
        newRow += '<td>' + makeid(6) + '</td>'
    });
    let c = '<tr>' + newRow + '</tr>'
    $('.tableX tbody').append(c)

}


$(document).ready(function() {

    $(".table").on('click', 'td', function() {
        if ($(this).attr("contentEditable") == true) {
            $(this).attr("contentEditable", "false");
        } else {
            $(this).attr("contentEditable", "true");
        }
    });

    $('.sample_sources_id').on('change', function() {
        if (this.value)
            populateSampleSourceTable(this.value)
    });
    populateSampleSourceTable("2");

});


function ExportJSON() {
    var tbl = $('.table tbody tr').map(function(idxRow, ele) {
        //
        // start building the retVal object
        //
        var retVal = {
            id: ++idxRow
        };
        //
        // for each cell
        //

        var $td = $(ele).find('td').map(function(idxCell, ele) {
            var input = $(ele).find(':input');
            //
            // if cell contains an input or select....
            //
            if (input.length == 1) {
                var attr = $('.table thead tr th').eq(idxCell).text();
                retVal[attr] = input.val();
            } else {
                var attr = $('.table thead tr th').eq(idxCell).text();
                retVal[attr] = $(ele).text();
            }
        });
        return retVal;
    }).get();

    console.log(tbl);

}


function populateSampleSourceTable(sourceId) {
    let cols = ['Developmental stage', 'Material Type', 'Organism', 'Organism part', 'Age', 'Genotype',
        'Disease', 'Individual', 'Sex', 'Cell line', 'Cell type', 'Cultivar', 'Strain'
    ];
    let Animal_tissue = [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1];
    let Cell_line = [1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0];
    let Human_tissue = [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0];
    let Plant = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0];
    let temp = "";

    $(".tableX thead tr").remove();
    $(".tableX tr").remove();

    switch (sourceId) {
        case "1":
            {
                for (let i = 0; i < Animal_tissue.length; i++) {
                    temp += Animal_tissue[i] ? '<th scope="col">' + cols[i] + '</th>' : ''
                }
                break;
            }
        case "2":
            {
                for (let i = 0; i < Cell_line.length; i++) {
                    temp += Cell_line[i] ? '<th scope="col">' + cols[i] + '</th>' : ''
                }
                break;
            }
        case "3":
            {
                for (let i = 0; i < Human_tissue.length; i++) {
                    temp += Human_tissue[i] ? '<th scope="col">' + cols[i] + '</th>' : ''
                }
                break;
            }
        case "4":
            {
                for (let i = 0; i < Plant.length; i++) {
                    temp += Plant[i] ? '<th scope="col">' + cols[i] + '</th>' : ''
                }
                break;
            }
    }


    $('.tableX thead').append('<tr>' + temp + '</tr>');
    AddRow();
    AddRow();
    AddRow();
    AddRow();
    AddRow();
    AddRow();
    AddRow();


}



function makeid(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}