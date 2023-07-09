const childProcess = require("child_process");
const https = require("https");

const startSearch = (i=0) => new Promise((resolve, reject) => {
    https.get("https://random-word-api.herokuapp.com/word", response => {
        var chunk = "";

        response.on("data", data => chunk += data);

        response.on("end", () => {
            var randomSearch = JSON.parse(chunk)[0];
            
            childProcess.execSync(`start microsoft-edge:https://www.bing.com/search?q=${randomSearch}`);

            if (i != 35)
            {
                setTimeout(() => {
                    startSearch(i + 1);
                }, 2000);
            }

            resolve();
        });
    })
});

startSearch();