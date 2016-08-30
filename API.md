#### FlippedTable.setKeys(Array<String>)
> Used to set the keys of the table head.
        
        table.setKeys(['id', 'title', 'date']);

#### FlippedTable.addRecord(Object)
> Used to add a record/row to the table.
        
        table.addRecord({
            id: 231,
            title: 'Vegetable',
            date: '2016-04-01'
        });

#### FlippedTable.getRecords(String by, String value)
> Used to query for records in the table.

        table.getRecords('title', 'Vegetable');

> Will return an array of FlippedTable-rows.

#### FlippedTable.clean()
> Used to remove all data from the table.

        table.clean();

> This will remove keys for thead and rows from tbody.

#### FlippedTable.synchronize(String endpoint)
> Synchronize the table with a JSON endpoint.

        table.synchronize('/api/vegetables.json');

> This will synchronize the keys in thead and the rows in tbody
> with the JSON feed.
>
> The json needs too look something like this:

        {
            "version": 2.3,
            "keys": ["id", "title", "date"],
            "rows": [
                {"id": 231, "title": "Pear", "date": "2015-02-01"},
                {"id": 322, "title": "Cucumber", "date": "2015-02-01"},
                {"id": 444, "title": "Carrot", "date": "2015-07-03"}
            ]
        }

> If the "version" field was changed since last synchronization of the table,
> the data will update and get synchronized.
