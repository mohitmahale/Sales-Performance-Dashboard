
        // Handle file upload and parsing
        function loadFile() {
            const fileInput = document.getElementById('fileUpload');
            const file = fileInput.files[0];

            if (!file) {
                alert("Please select a file to upload.");
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const data = JSON.parse(e.target.result);
                    if (!Array.isArray(data)) {
                        throw new Error("The JSON data should be an array of objects.");
                    }
                    generateDashboard(data);
                } catch (err) {
                    document.getElementById('errorMessage').innerText = "Error parsing JSON file: " + err.message;
                }
            };
            reader.readAsText(file);
        }

        // Generate the dashboard based on the uploaded data
        // Generate the dashboard based on the uploaded data
        function generateDashboard(data) {
            // Helper functions to aggregate and process data
            const salesByRegion = {};
            const unitsSoldByItem = {};
            const salesByManager = {};
            let totalSales = 0;
            let totalUnits = 0;
            let totalSaleAmt = 0;
            const avgSaleValues = [];

            // Process each sale entry
            data.forEach(entry => {
                // Log each entry to see if data is correctly parsed
                console.log(entry);  // Add this line for debugging

                const region = entry.Region;
                const item = entry.Item;
                const manager = entry.Manager;
                const units = entry.Units;

                // Convert Unit_price and Sale_amt to numbers (after removing commas)
                const unitPrice = parseFloat(String(entry.Unit_price).replace(',', '').replace('₹', ''));
                const saleAmt = parseFloat(String(entry.Sale_amt).replace(',', '').replace('₹', ''));

                // Aggregating sales by region
                if (!salesByRegion[region]) salesByRegion[region] = 0;
                salesByRegion[region] += saleAmt;

                // Aggregating units sold by item
                if (!unitsSoldByItem[item]) unitsSoldByItem[item] = 0;
                unitsSoldByItem[item] += units;

                // Aggregating sales by manager
                if (!salesByManager[manager]) salesByManager[manager] = 0;
                salesByManager[manager] += saleAmt;

                totalSales += saleAmt;
                totalUnits += units;
                totalSaleAmt += saleAmt;
                avgSaleValues.push(saleAmt / units); // Average sale value per unit
            });

            // Log aggregated data to debug
            console.log("Aggregated Data for Dashboard:");
            console.log("Sales by Region: ", salesByRegion);
            console.log("Units Sold by Item: ", unitsSoldByItem);
            console.log("Sales by Manager: ", salesByManager);
            console.log("Total Sales: ", totalSales);
            console.log("Average Sale Value per Unit: ", avgSaleValues);

            const avgSaleValuePerUnit = totalSaleAmt / totalUnits;

            // Plotting charts using Plotly.js
            // Sales by Region - Pie Chart
            const regions = Object.keys(salesByRegion);
            const regionValues = Object.values(salesByRegion);
            const regionTrace = {
                type: 'pie',
                labels: regions,
                values: regionValues,
            };
            Plotly.newPlot('salesByRegion', [regionTrace], { title: 'Sales by Region' });

            // Units Sold by Item - Bar Chart
            const items = Object.keys(unitsSoldByItem);
            const itemValues = Object.values(unitsSoldByItem);
            const itemTrace = {
                type: 'bar',
                x: items,
                y: itemValues,
            };
            Plotly.newPlot('unitsSoldByItem', [itemTrace], { title: 'Units Sold by Item' });

            // Assuming you want to plot regions (or other categories) against total sales
            const salesTrace = {
                type: 'scatter',
                mode: 'lines+markers',
                x: regions, // Use regions or other meaningful x-axis data
                y: regionValues, // Corresponding sales data
                marker: { color: 'blue' }, // Optional: Add color for markers
                line: { shape: 'linear' }  // Optional: Customize line shape
            };
            Plotly.newPlot('totalSalesAmount', [salesTrace], { title: 'Total Sales by Region' });


            // Average Sale Value per Unit - KPI Display
            const avgSaleTrace = {
                type: 'indicator',
                mode: 'number',
                value: avgSaleValuePerUnit,
                title: { text: 'Avg Sale Value per Unit' },
            };
            Plotly.newPlot('avgSaleValuePerUnit', [avgSaleTrace]);

            // Sales by Manager - Bar Chart
            const managers = Object.keys(salesByManager);
            const managerValues = Object.values(salesByManager);
            const managerTrace = {
                type: 'bar',
                x: managers,
                y: managerValues,
            };
            Plotly.newPlot('salesByManager', [managerTrace], { title: 'Sales by Manager' });
        }

        // Helper functions to aggregate and process data
        const salesByRegion = {};
        const unitsSoldByItem = {};
        const salesByManager = {};
        let totalSales = 0;
        let totalUnits = 0;
        let totalSaleAmt = 0;
        const avgSaleValues = [];

        // Process each sale entry
        data.forEach(entry => {
            const region = entry.Region;
            const item = entry.Item;
            const manager = entry.Manager;
            const units = entry.Units;

            // Convert Unit_price and Sale_amt to numbers (after removing commas)
            const unitPrice = parseFloat(String(entry.Unit_price).replace(',', '').replace('₹', ''));
            const saleAmt = parseFloat(String(entry.Sale_amt).replace(',', '').replace('₹', ''));

            // Aggregating sales by region
            if (!salesByRegion[region]) salesByRegion[region] = 0;
            salesByRegion[region] += saleAmt;

            // Aggregating units sold by item
            if (!unitsSoldByItem[item]) unitsSoldByItem[item] = 0;
            unitsSoldByItem[item] += units;

            // Aggregating sales by manager
            if (!salesByManager[manager]) salesByManager[manager] = 0;
            salesByManager[manager] += saleAmt;

            totalSales += saleAmt;
            totalUnits += units;
            totalSaleAmt += saleAmt;
            avgSaleValues.push(saleAmt / units); // Average sale value per unit
        });

        const avgSaleValuePerUnit = totalSaleAmt / totalUnits;

        // Plotting charts using Plotly.js
        // Sales by Region - Pie Chart
        const regions = Object.keys(salesByRegion);
        const regionValues = Object.values(salesByRegion);
        const regionTrace = {
            type: 'pie',
            labels: regions,
            values: regionValues,
        };
        Plotly.newPlot('salesByRegion', [regionTrace], { title: 'Sales by Region' });

        // Units Sold by Item - Bar Chart
        const items = Object.keys(unitsSoldByItem);
        const itemValues = Object.values(unitsSoldByItem);
        const itemTrace = {
            type: 'bar',
            x: items,
            y: itemValues,
        };
        Plotly.newPlot('unitsSoldByItem', [itemTrace], { title: 'Units Sold by Item' });

        // Assuming you want to plot regions (or other categories) against total sales
        const salesTrace = {
            type: 'scatter',
            mode: 'lines+markers',
            x: regions, // Use regions or other meaningful x-axis data
            y: regionValues, // Corresponding sales data
            marker: { color: 'blue' }, // Optional: Add color for markers
            line: { shape: 'linear' }  // Optional: Customize line shape
        };
        Plotly.newPlot('totalSalesAmount', [salesTrace], { title: 'Total Sales by Region' });


        // Average Sale Value per Unit - KPI Display
        const avgSaleTrace = {
            type: 'indicator',
            mode: 'number',
            value: avgSaleValuePerUnit,
            title: { text: 'Avg Sale Value per Unit' },
        };
        Plotly.newPlot('avgSaleValuePerUnit', [avgSaleTrace]);

        // Sales by Manager - Bar Chart
        const managers = Object.keys(salesByManager);
        const managerValues = Object.values(salesByManager);
        const managerTrace = {
            type: 'bar',
            x: managers,
            y: managerValues,
        };
        Plotly.newPlot('salesByManager', [managerTrace], { title: 'Sales by Manager' });


