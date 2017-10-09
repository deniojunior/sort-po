# SORT-PO
SORT-PO is a Gulp module to sort '.po' files.

# Install
* Clone sort-po into your app.
    ```bash
    cd /my-app
    git clone https://github.com/deniojunior/sort-po.git
    ```

* Assuming you have NPM installed, run:
    ```bash
    npm install --save sort-object-array
    ```
    
* Add the lines below in your gulpfile.js:

    ```javascript
    const gulp = require('gulp');

    const argv = require('yargs').argv;
    const sort_po = require('./sort-po/sort-po.js');

    gulp.task('sort-po', function(){
        sort_po.run(argv);
    });
    ```

# Run
* SORT SPECIFIC FILE
    ```bash
    gulp sort-po --locale [locale] --file [filename]
    # or
    gulp sort-po --l [locale] --f [filename]
    ```

* SORT FILE messages.po
    ```bash
    gulp sort-po --locale [locale]
    # or
    gulp sort-po --l [locale]
    ```

* SORT ALL
    ```bash
    gulp sort-po --all
    # or
    gulp sort-po -a
    ```

* HELP
    ```bash
    sort-po --help
    # or
    sort-po --h
    ```

# Config
Inside 'sort-po.js' file, there are two default variables that can be changed as needed:

```javascript
DEFAULT_FILE = 'message.po';
DEFAULT_PATH = './locale/';
```