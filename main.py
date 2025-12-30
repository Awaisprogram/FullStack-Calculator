from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from typing import Union

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/")
async def health_check():
    return {"message": "Calculator API is running"}

# Addition endpoint
@app.get("/add/{num1}/{num2}")
async def add_numbers(num1: Union[int, float], num2: Union[int, float]):
    """Add two numbers together"""
    result = num1 + num2
    return {
        "operation": "addition",
        "num1": num1,
        "num2": num2,
        "result": result
    }

# Multiplication endpoint
@app.get("/multiply/{num1}/{num2}")
async def multiply_numbers(num1: Union[int, float], num2: Union[int, float]):
    """Multiply two numbers together"""
    result = num1 * num2
    return {
        "operation": "multiplication",
        "num1": num1,
        "num2": num2,
        "result": result
    }

# Division endpoint
@app.get("/divide/{num1}/{num2}")
async def divide_numbers(num1: Union[int, float], num2: Union[int, float]):
    """Divide two numbers"""
    if num2 == 0:
        raise HTTPException(status_code=400, detail="Cannot divide by zero")
    result = num1 / num2
    return {
        "operation": "division",
        "num1": num1,
        "num2": num2,
        "result": result
    }

# Subtraction endpoint
@app.get("/subtract/{num1}/{num2}")
async def subtract_numbers(num1: Union[int, float], num2: Union[int, float]):
    """Subtract num2 from num1"""
    result = num1 - num2
    return {
        "operation": "subtraction",
        "num1": num1,
        "num2": num2,
        "result": result
    }

def Number_sum(num1, num2):
    user_input = int(num1 + num2)
    print(f"Sum : {user_input}")  
  
def Number_Multiply(num1, num2):
    user_input = int(num1 * num2)
    print(f"Multiplication : {user_input}")  

def Number_div(num1, num2):
    user_input = int(num1 % num2)
    print(f"Division : {user_input}")  

def Number_sub(num1, num2):
    user_input = int(num1 - num2)
    print(f"Sub : {user_input}")

if __name__ == "__main__":
    
    pass
