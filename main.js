class CompanyLogoRenderer {
    eGui
    // Optional: Params for rendering. The same params that are passed to the cellRenderer function.
    init(params) {
        let companyLogo = document.createElement('img')
        companyLogo.src = `https://www.ag-grid.com/example-assets/space-company-logos/${params.value.toLowerCase()}.png`
        companyLogo.setAttribute(
            'style',
            'display: block; width: 25px; height: auto; max-height: 50%; margin-right: 12px; filter: brightness(1.1)'
        )
        let companyName = document.createElement('p')
        companyName.textContent = params.value
        companyName.setAttribute(
            'style',
            'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'
        )
        this.eGui = document.createElement('span')
        this.eGui.setAttribute(
            'style',
            'display: flex; height: 100%; width: 100%; align-items: center'
        )
        this.eGui.appendChild(companyLogo)
        this.eGui.appendChild(companyName)
    }

    // Required: Return the DOM element of the component, this is what the grid puts into the cell
    getGui() {
        return this.eGui
    }

    // Required: Get the cell to refresh.
    refresh(params) {
        return false
    }
}

// Grid API: Access to Grid API methods
let gridApi

// Grid Options: Contains all of the grid configurations
const gridOptions = {
    pagination: true,
    paginationAutoPageSize: true,
    // Log new value when cell value changes
    onCellValueChanged: (event) => {
        console.log(`New Cell Value: ${event.value}`)
    },
    onSelectionChanged: (e) => {
        console.log('onSelectionChanged was triggered!!')
    },
    rowSelection: 'multiple',
    columnDefs: [
        { field: 'mission', filter: true, checkboxSelection: true },
        { field: 'company', cellRenderer: CompanyLogoRenderer },
        { field: 'location' },
        {
            field: 'date',
            valueFormatter: (p) => {
                const dateValue = new Date(p.value)
                return dateValue.toLocaleDateString()
            }
        },
        {
            field: 'price',
            valueFormatter: (params) => '$' + params.value.toLocaleString()
        },
        { field: 'successful' },
        { field: 'rocket' }
    ],
    defaultColDef: {
        filter: true,
        editable: true
    }
}

const example = [
    { mission: 'mission', company: 'company', location: 'aaa' },
    { mission: 'mission', company: 'company', location: 'aaa' }
]

// Create Grid: Create new grid within the #myGrid div, using the Grid Options object
gridApi = agGrid.createGrid(document.querySelector('#myGrid'), gridOptions)
fetch('https://www.ag-grid.com/example-assets/space-mission-data.json')
    .then((response) => response.json())
    .then((data) => {
        console.log('data', data)
        gridApi.setGridOption('rowData', data)
    })
