"use strict";

const file_system = require('fs');
const sortArray = require('sort-object-array');
const path = require('path');

const DEFAULT_FILE = 'message.po';
const DEFAULT_PATH = './locale/';

const sort_po = {

    sort_file : (locale, file) => {
        try {
            if (file === undefined || file === null) file = DEFAULT_FILE;

            var path = DEFAULT_PATH + locale + file;

            if (locale == undefined || locale == null) throw 'ERROR. Please type the locale through command --locale or --l\n';
            if (file === true) throw 'ERROR: File not found. Please, type the file name.\n';
            if (!file_system.existsSync(path)) throw 'ERROR: File not found.\\nPATH: ' + path +'\n';
            if (file.split('.')[1] === undefined || file.split('.')[1] !== 'po') throw 'ERROR: File extension not supported. Please type a ".po" file\n';

            const readline = require('readline');
            const instream = file_system.createReadStream(path);
            const outstream = new (require('stream'))();
            const rl = readline.createInterface(instream, outstream);

            let message, messages = [];

            rl.on('line', function (line) {
                if (line.indexOf('msgid') !== -1) {
                    message = {};
                    message.msgid = line;
                } else if (line.indexOf('msgstr') !== -1) {
                    message.msgstr = line;
                } else {
                    messages.push(message);
                }
            });

            rl.on('close', function () {
                messages.push(message);
                console.log('Reading file ' + path);

                if (!fs.existsSync('./tmp')){
                    fs.mkdirSync('./tmp');
                }
                
                let file = './tmp/' + file;

                console.log('Sorting file ' + file);
                messages = sortArray(messages, 'msgid');

                if(file_system.existsSync(file)){
                    file_system.unlinkSync(file);
                }

                var translations = "";

                messages.forEach((value) => {
                    if(value.msgid !== undefined && value.msgstr !== undefined) {
                        let message = value.msgid + "\n" + value.msgstr + "\n\n";
                        translations += message;
                    }
                });

                file_system.writeFileSync(file, translations);

                console.log("Copying file " + file + " to production");

                file_system.createReadStream(file)
                    .pipe(file_system.createWriteStream(path));

                console.log("Done!\n");
            });
        }catch (error){
            console.log(error);
        }
    },
    sort_all_files : () => {
        file_system.readdir(DEFAULT_PATH, function(err, items) {
            items.forEach((directory) => {
                if(file_system.lstatSync(DEFAULT_PATH + directory).isDirectory())
                    i18n.sort_file(directory);
            });
        });
    },
    help : () => {
        console.log(__dirname + path.sep + 'help.txt');
        file_system.readFile(__dirname+path.sep + 'help.txt', 'utf-8', (err, data) => {
            if(!err){
                console.log(data);
            }
        });
    }
};

module.exports = sort_po;