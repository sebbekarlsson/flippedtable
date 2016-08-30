# FlippedTable.js
> Manage HTML tables easier
>
> * Sorting
> * Filters
> * Querying
> * Adding records
> * Removing records

## How to use
> [API Documentation](API.md)

## Example
        
        <div id='myTable'></div>
        <script type='text/javascript'>
            var table = new FlippedTable(document.getElementById('myTable'));
            table.setKeys(['id', 'title']);

            table.addRecord({id: '232', title: 'Test title'}); 
        </script>
