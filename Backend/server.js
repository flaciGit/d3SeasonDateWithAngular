const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

var portNumber = 8000;

const request = require("request");
const cheerio = require('cheerio');


app.use(cors())

app.use(bodyParser.json())

app.route('/api/fetch').get((req, res) => {
	request('https://diablo.fandom.com/wiki/Season', function (error, response, html) {
		if (!error && response.statusCode == 200) {

			let $ = cheerio.load(html);

			var rowArray = [];
			
			$('tr').each(function(i, elm) {
				
				var colArray = [];
				
				var children = $(this).children();
				colArray.push($(children[1]).text());
				colArray.push($(children[2]).text());

				rowArray.push(colArray);
			});
			
			res.send({
				htmlContent: [{ content: rowArray }],
			})
		}
	});

})

app.listen(portNumber, () => {
  console.log('Server started!')
  console.log('Listening on http://localhost:' + portNumber)
})
