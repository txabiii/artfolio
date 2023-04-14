const BASE_URL = 'https://artfolio-backend.vercel.app';

export async function getAllProjects() {
  try {
    const response = await fetch(`${BASE_URL}/projects`);
    const data = await response.json();
    return data;
  } catch(error) {
    return JSON.stringify({ status: "fail", message: error})
  }
}

export async function getProjectById(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/projects/${id}`);
    const data = await response.json();
    return data;
  } catch(error) {
    return JSON.stringify({ status: "fail", message: error})
  }
}