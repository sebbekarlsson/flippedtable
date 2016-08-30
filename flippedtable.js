/**
 *  _____ _ _                      _ _____     _     _      
 * |  ___| (_)_ __  _ __   ___  __| |_   _|_ _| |__ | | ___ 
 * | |_  | | | '_ \| '_ \ / _ \/ _` | | |/ _` | '_ \| |/ _ \
 * |  _| | | | |_) | |_) |  __/ (_| | | | (_| | |_) | |  __/
 * |_|   |_|_| .__/| .__/ \___|\__,_| |_|\__,_|_.__/|_|\___|
 *           |_|   |_| 
 *
 * @name        flippedtable  
 * @category    Tables
 * @author      Sebastian Karlsson <sebbekarlsson97@gmail.com>
 * @version     1.0
 */

/*===========================================================================*/
/* --------------------------------------------------------------------------*/
/*===========================================================================*/

/**
 * Wrapper for the <tr>
 */
var FlippedTableRow = function (element) {
    this.initialize = function (element) {
        this.element = element;
    }
    this.initialize(element);

    /**
     * Get value from row/<tr>
     *
     * @param String key
     *
     * @return String
     */
    this.getValue = function(key) {
        var tds = this.element.querySelectorAll('td');

        for (var i = 0; i < tds.length; i++) {
            if (tds[i].getAttribute('key') == key) {
                return tds[i].innerHTML;
            }
        }
    }

    /**
     * Set value by key.
     *
     * @param String key
     * @param String value
     *
     * @return String
     */
    this.setValue = function(key, value) {
        var tds = this.element.querySelectorAll('td');

        for (var i = 0; i < tds.length; i++) {
            if (tds[i].getAttribute('key') == key) {
                tds[i].innerHTML = value;
            }
        }
    }
}

/*===========================================================================*/
/* --------------------------------------------------------------------------*/
/*===========================================================================*/

/**
 * Wrapper for table <table>
 */
var FlippedTable = function (element) {
    this.initialize = function (element) {
        this.element = element;
        this.table = document.createElement('table');
        this.head = document.createElement('thead');
        this.body = document.createElement('tbody');

        this.table.appendChild(this.head);
        this.table.appendChild(this.body);

        this.table.style.width = '100%';
        this.table.style.textAlign = 'left';

        this.element.setAttribute('version', '0');
        this.element.appendChild(this.table);
    }
    this.initialize(element);

    /**
     * Set the keys of the thead row.
     * 
     * @param Array keyarr - example ['id', 'title']
     *
     * @return HTMLTableRowElement
     */
    this.setKeys = function (keyarr) {
        this.head.innerHTML = '';

        var tr = document.createElement('tr');

        for (var i = 0; i < keyarr.length; i++) {
            var k = keyarr[i];

            var th = document.createElement('th');
            th.style.padding = '0.5rem';

            th.innerHTML = k;
            tr.appendChild(th); 
        }

        this.head.appendChild(tr);

        return tr;
    }

    /**
     * Add a record (<tr>) to the table.
     *
     * @param Object record - example {'id':23, 'title': 'example'}
     *
     * @return HTMLTableRowElement
     */
    this.addRecord = function (record) {
        var tr = document.createElement('tr');
        var ths = this.head.querySelectorAll('th');

        for (var ii = 0; ii < ths.length; ii++) {
            for (var key in record) {
                if (key == ths[ii].innerHTML) {
                    var td = document.createElement('td');
                    td.style.padding = '0.5rem';

                    td.innerHTML = record[key];
                    td.setAttribute('key', ths[ii].innerHTML);
                    tr.appendChild(td);
                }
            }
        }

        if(tr.childNodes.length == 0) {
            return undefined;
        }

        this.body.appendChild(tr);

        return tr;
    }

    /**
     * Get records from the table by querying by a key and a value.
     *
     * @param String by
     * @param String value
     *
     * @return Array
     */
    this.getRecords = function (by, value) {
        var row_arr = [];
        var rows = this.body.querySelectorAll('tr');

        for (var i = 0; i < rows.length; i++) {
            var tds = rows[i].querySelectorAll('td');

            for (var ii = 0; ii < tds.length; ii++) {
                if (tds[ii].getAttribute('key') == by) {
                    if (tds[ii].innerHTML == value) {
                        row_arr.push(new FlippedTableRow(rows[i]));
                    }
                }
            }
        }

        return row_arr;
    }

    /**
     * Clear the table from all data, including keys.
     *
     * @return FlippedTable - (this)
     */
    this.clean = function () {
        this.head.innerHTML = '';
        this.body.innerHTML = '';

        return this;
    }

    /**
     * Synchronize the table from a JSON endpoint.
     *
     * @param String url - Endpoint to synchronize from.
     *
     * @return Boolean
     */
    this.synchronize = function (url) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        var response_text = xmlHttp.responseText;
        var j = JSON.parse(response_text);

        var version = j['version'];
        var current_version = this.element.getAttribute('version');

        if (current_version != version) {
            this.clean();
            this.setKeys(j['keys']);

            var rows = j['rows'];

            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];

                this.addRecord(row);
            }

            return true;
        }

        return false;
    }
}
