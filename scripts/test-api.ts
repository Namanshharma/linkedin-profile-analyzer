async function testAnalyzeEndpoint() {

    const testUrl = 'https://linkedin.com/in/namansharma812/';

    try {
        const response = await fetch('http://localhost:3000/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ profileUrl: testUrl }),
        });

        const data = await response.json();

        console.log("Status", response.status);
        console.log("Response:", JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('Test successful: Analysis request created.');
        } else {
            console.error('Test failed:', JSON.stringify(data));
        }

    } catch (error) {
        console.error('Error testing analyze endpoint:', error);
    }
}

console.log('Make sure your Next.js dev server is running (npm run dev)\n');
testAnalyzeEndpoint();