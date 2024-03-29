import {parse} from 'csv-parse';

export const parseCsv = (data, callback) => {
    parse(data, { columns: true }, (err, output) => {
        if (err) {
            console.error('Error parsing CSV:', err);
            callback([]);
        } else {
            callback(output);
        }
    });
};