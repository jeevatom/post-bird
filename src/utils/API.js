const BASE_URL = 'https://post-bird.onrender.com';


const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Error ${response.status}: ${errorText}`);
    }

    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    } else {
        return { message: await response.text() }; 
    }
};

// 🔎 GET Request
export const getData = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        return await handleResponse(response);
    } catch (error) {
        console.error('GET error:', error.message);
        throw error;
    }
};

// 🚀 POST Request
export const postData = async (endpoint, payload) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        console.log("response>>>>>"+response.status);
          
         
         
  
        return await handleResponse(response);

    } catch (error) {
        console.error('POST error:', error.message);
        throw error;
    }
};
