import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

//corsOptions added to prevent cors errors when fetching data to the frontend from server
const cors = require('cors');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: `./hakaniemi_${(new Date().toJSON().slice(0,19).replace(/:/g,'-')).replace('T', '_')}.csv`,
    header: [
        {id: 'timestamp', title: 'Timestamp'},
        {id: 'reportingGroup', title: 'Reporting Group'},
        {id: 'locationName', title: 'Location Name'},
        {id: 'value', title: 'Value'},
        {id: 'unit', title: 'Unit'},
    ]
});

app.get('/api/hakaniemi/', async (req, res) => {
    console.log('/api/hakaniemi endpoint called')
    
    let startTime = req.query.startTime;
    let endTime = req.query.endTime;
    let format = req.query.format;

    //url for the external API
    const url = 
    `https://helsinki-openapi.nuuka.cloud/api/v1.0/EnergyData/Daily/ListByProperty?Record=LocationName&SearchString=1000%20Hakaniemen%20kauppahalli&ReportingGroup=Electricity&StartTime=${startTime}&EndTime=${endTime}`;
    const options = {
        "method": "GET",
    };

    //fetch data from the external API
    const response = await fetch(url, options)
        .then((res: any) => res.json())
        .catch((err: any) => {
            console.log(err);
    })
    //write the response to a .csv file
    writeCsvFile(response);

    /*
    if the format query parameter is set to "monthly", convert the response data to monthly format
    */
    if (format === "monthly") {
        res.json(convertDataToMonthlyFormat(response));
    }
    else {
        res.json({response});
    } 
});

const writeCsvFile = async (data: any) => { 
    //write a .csv file, catch and log any errors that may occur
    try {
        await csvWriter.writeRecords(data);
    } catch (err) {
        console.log(err);
    }
}

const convertDataToMonthlyFormat = (data: any) => {
    const startDate = new Date(data[0]['timestamp']);
    let currentMonth: number = startDate.getMonth();
    let currentYear: number = startDate.getFullYear();
    let monthlyValue: number = 0;
    let convertedData: Array<Object> = [];
   
    /*
    This loop converts the data into monthly format by adding each of the values per month.
    For each item in the array, the month from the timestamp is checked.
    When the timestamp changes to another month, the previous month is then pushed into the array.
    */
    for(let i = 0; i < data.length; i++) {    
        let date = new Date(data[i]['timestamp']);
        if (date.getMonth() === currentMonth) {
            monthlyValue += data[i]['value'];
        } else {
            convertedData.push({
                /*
                    get year and month from the timestamp of the previous item
                    unit property is taken from the first element since it's assumed
                    to be the same for all elements
                */
                month: (data[i - 1]['timestamp']).slice(0,7),                
                value: monthlyValue,
                unit: (data[0]['unit'])
            });
            currentMonth++;

            //reset the month counter back to january after december
            if (currentMonth > 11) {
                currentYear++;
                currentMonth = 0;
            }
            //set monthlyValue to the value of current element (first day of month)
            monthlyValue = data[i]['value'];
        }
    }
    //After the loop is done, push the data from the final month into the array as well
    convertedData.push({
        month: (data[data.length - 1]['timestamp']).slice(0,7),
        value: monthlyValue,
        unit: (data[0]['unit'])
    });
    console.log(convertedData);
    return convertedData;
};

app.listen(port, '127.0.0.1', () => {
    console.log(`Server is now listening on port ${port}`);
});

