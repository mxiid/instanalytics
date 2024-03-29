import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import csvParser from 'csv-parser';

const s3 = new AWS.S3();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const params = {
            Bucket: 'your-bucket-name',
            Key: 'path/to/your/csv/file.csv',
        };

        const data = await s3.getObject(params).promise();

        if (!data.Body) {
            throw new Error('CSV file body is empty');
        }

        const csvData: string[] = [];

        // Parse CSV data
        data.Body.pipe(csvParser())
            .on('data', (row: Record<string, string>) => {
                csvData.push(JSON.stringify(row));
            })
            .on('end', () => {
                res.status(200).json({ csvData });
            });
    } catch (error) {
        console.error('Error fetching CSV file:', error);
        res.status(500).json({ error: 'Failed to fetch CSV file' });
    }
}
