const BACKEND_URL =  'http://localhost:8000';



async function fetchAPI(endpoint:string ,options?: RequestInit) {
  const response =  await fetch(`${BACKEND_URL}${endpoint}`, options || {})
  
  // Handle different error status codes
  if (!response.ok) {
    if (response.status === 422) {
      throw new Error('Validation Error: Please check your input data');
    } else if (response.status === 400) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Bad Request');
    } else if (response.status === 404) {
      throw new Error('Resource not found');
    } else if (response.status === 500) {
      throw new Error('Server error: Please try again later');
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  }
  
  // Handle empty responses
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// Addition
export async function Addition(num1:number , num2:number){
  const response = fetchAPI(`/add/${num1}/${num2}`)
  return await response
}

// Subtraction

export async function Subtraction(num1:number , num2:number){
  const response = await fetchAPI(`/subtract/${num1}/${num2}`)
  return await response
}

// Multiplication

export async function Multiplication(num1:number , num2:number){
  const response = fetchAPI(`/multiply/${num1}/${num2}`)
  
  return await response
}


// Division

export async function Division(num1:number , num2:number){
  const response = fetchAPI(`/divide/${num1}/${num2}`)
  
  return await response
}


// User Management

// Get all users
export async function GetUsers() {
  return await fetchAPI("/users");
}

// Add a new user
export async function AddUser(id: string, name: string, email: string) {
  const response = await fetchAPI("/users", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, email })
  });
  
  if (response && response.user) {
    return response.user;
  }
  
  return response;
}


// Delete a user by email
export async function DeleteUser(email: string) {
  return await fetchAPI(`/users/${email}`, {
    method: "DELETE"
  });
}

