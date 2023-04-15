const BASE_URL = 'http://localhost:5000';

export async function sendMessage(name: string, email: string, message: string) {
  const data = {
    sender_name: name,
    email_address: email,
    message: message
  }
  try {
    const response = await fetch(`${BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch(error) {
    return JSON.stringify({ status: "fail", message: error})
  }
}
