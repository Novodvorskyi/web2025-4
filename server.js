const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('xml2js');

const server = http.createServer((req, res) => {
  // Встановлюємо заголовки для відповіді
  res.writeHead(200, { 'Content-Type': 'application/xml' });

  // Читаємо файл з даними
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Помилка при читанні файлу');
      return;
    }

    // Парсимо JSON та перетворюємо його на XML
    try {
      const jsonData = JSON.parse(data);
      parseJsonToXml(jsonData, res);
    } catch (e) {
      res.statusCode = 500;
      res.end('Помилка при парсингу JSON');
    }
  });
});

// Функція для перетворення JSON на XML
function parseJsonToXml(jsonData, res) {
  const builder = new (require('xml2js')).Builder();
  const xml = builder.buildObject(jsonData);

  // Відправляємо XML у відповідь
  res.end(xml);
}

// Слухаємо на порту 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Сервер працює на порту ${port}`);
});