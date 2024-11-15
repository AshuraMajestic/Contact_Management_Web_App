
# **Project Setup Guide**

The project is divided into two parts:
1. **Backend**
2. **Frontend**

---

## **Starting the Backend**

### **Step 1: Navigate to the Backend Directory**
In the terminal, run the following commands:
```bash
cd backend
npm install
```

### **Step 2: Configure the Environment**
Create a `.env` file in the `backend` directory and add the following line:
```
DATABASE_URL=URL
```
> **Note:** The `URL` will be shared with you separately. Alternatively, you can configure a local database.

### **Step 3: Run the Backend**
Start the backend server:
```bash
npm run dev
```

---

## **Starting the Frontend**

### **Step 1: Ensure the Backend is Running**
Ensure that the backend is running before starting the frontend.

### **Step 2: Navigate to the Frontend Directory**
In a new terminal, run the following commands:
```bash
cd frontend
npm install
npm start
```

