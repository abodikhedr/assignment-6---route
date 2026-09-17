import { MongoClient } from 'mongodb'
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

const url = '';
const client = new MongoClient(url);


export const db = client.db("library_assignment_6");

export const connectionDB = async (app,port) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        })
    } catch (error) {
        console.log("database failed to connect\n", error);
    }
} 