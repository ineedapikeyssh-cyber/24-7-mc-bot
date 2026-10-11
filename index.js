const bedrock = require('bedrock-protocol');
const http = require('http');

// --- CRUCIAL RENDER FIX: Web Server Setup ---
const port = process.env.PORT || 10000;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bedrock AFK Bot is running online 24/7!\n');
});
server.listen(port, () => {
    console.log(`🌍 Keeping Render service active on port ${port}`);
});
// --------------------------------------------

function createBedrockBot() {
    console.log('🤖 Connecting to Bedrock Server acorezero.qzz.io on port 20313...');

    const client = bedrock.createClient({
        host: 'acorezero.qzz.io', 
        port: 20313,              
        username: 'AFK_Bot_247',  
        offline: true,            
        version: '1.21.0'        // Supported protocol version string
    });

    client.on('spawn', () => {
        console.log('✅ Success! The bot has spawned safely into the world.');
    });

    client.on('close', (reason) => {
        console.log(`❌ Disconnected from server. Reason: ${reason}`);
        console.log('🔄 Attempting to reconnect in 10 seconds...');
        setTimeout(createBedrockBot, 10000);
    });

    client.on('error', (err) => {
        console.error('⚠️ Protocol network error occurred:', err.message);
    });
}

createBedrockBot();
