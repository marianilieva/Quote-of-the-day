let quotes = "";

$(function()    {
    $.ajax ({
        url: 'https://dummyjson.com/quotes',
        type: 'get',
        success: function(response) {
            quotes = response;
            show(quotes);
            
            $('#show').click(function() {
                filterQuotes(quotes);
            });
        }
    }); 

    $('#luck').click(function() {
        let luckyNumber = parseInt(Math.random() * 29);
        $('#result').html(`${quotes.quotes[luckyNumber].quote} -
            ${quotes.quotes[luckyNumber].author}`);
    })
})

function show(chosen)  {
    let html = "";
    html += '<table>';
    html += '<th>Number</th><th>Quote</th><th>Author</th>';

    for (let i = 0; i< chosen.quotes.length; i++)  {
        html += '<tr>';
        html += `<td class="t-c">${chosen.quotes[i].id}</td>`;
        html += `<td>${chosen.quotes[i].quote}</td>`;
        html += `<td>${chosen.quotes[i].author}</td>`;
        html += '</tr>';
    }

    html += '</table';
    $('#container').html(html);
}

function filterQuotes(all)    {
    let rest = Object.assign({}, all);
    

    if ($('#to40').is(':checked') || $('#f40to60').is(':checked') ||
        $('#over60').is(':checked'))    {
        if (!$('#to40').is(':checked'))  {
            rest.quotes = rest.quotes.filter(r => r.quote.length >= 40);
        }

        if (!$('#f40to60').is(':checked'))  {
            rest.quotes = rest.quotes.filter
                (r => (r.quote.length < 40) || (r.quote.length >= 60));
        }

        if (!$('#over60').is(':checked'))  {
            rest.quotes = rest.quotes.filter(r => r.quote.length < 60);
        }
    }

    if ($('#name').val().length > 0)  {
        rest.quotes = rest.quotes.filter 
            (r => r.author[0].toLowerCase() == 
            $('#name').val()[0].toLowerCase());
    }


    show(rest);
}