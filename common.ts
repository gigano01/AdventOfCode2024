import * as fs from 'fs';
import * as path from 'path';

export async function decodeFile(filePath: string, decodeHandler: (lines: Array<string>) => Promise<void>) {
    if (!filePath) {
        console.error('Please provide a file path as a command line argument.');
        process.exit(1);
    }

    // Resolve the file path
    const resolvedPath = path.resolve(filePath);

    try {
        // Read the file content
        const data = fs.readFileSync(resolvedPath, 'utf8');

        // Split the data into an array of strings
        const lines = data.split('\n');
        await decodeHandler(lines);
    } catch (err) {
        console.error(`Error reading or parsing file: ${err.message}`);
        process.exit(1);
    }
}
