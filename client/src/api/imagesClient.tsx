const BASE_URL = 'https://artfolio-backend.vercel.app';

export async function getImagesByProject(id: number, limit?: number) {
  try {
    let url = `${BASE_URL}/images/${id}`
    if (limit !== undefined) 
      url += `/${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    return JSON.stringify({ status: "fail", message: error})
  }
}

export async function getImage(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/images/image/${id}`);
    const data = await response.json();
    return data[0];
  } catch(error) {
    return JSON.stringify({ status: "fail", message: error})
  }
}
