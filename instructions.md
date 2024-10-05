# **Masterplan for Material Order Prediction Web Application (Updated)**

## **1. App Overview**
The Material Order Prediction System is a web-based application designed to predict door sales for a business that orders doors from Turkey for resale in Libya. Sales data will be uploaded to Supabase manually by the administrator, and the system will fetch this data from Supabase for analysis and predictions. The system uses historical sales data to predict future sales, enabling the company to manage lead times (typically 45 days) and ensure optimal stock levels for upcoming demand.

---

## **2. Target Audience**
- **Initial Users**: Production Engineer and Director, who will use the app to monitor predictions and make inventory decisions.
- **Future Users**: Sales managers or logistics personnel may use the system in future iterations.

---

## **3. Core Features and Functionality (Updated)**

### **Key Features**:

#### **1. Sales Predictions**:
   - Predict sales for the **next week**, **next month**, and **until the end of the year** based on historical data.
   - Display sales predictions as ranges (e.g., "likely to sell 100-120 units").
   - Use data fetched directly from the Supabase database.
   - The system will account for lead time, suggesting reorder points based on predicted sales and delivery lead times.
   
   **Step-by-step breakdown**:
   - **Step 1**: Fetch historical sales data from Supabase using the Supabase client in React.
   - **Step 2**: Process the data and generate predictions based on a moving average algorithm.
   - **Step 3**: Display predicted sales ranges in an easy-to-understand format (e.g., charts, tables).
   - **Step 4**: Allow users to download the predictions as CSV or PDF for external use.

#### **2. Data Management** (Updated):
   - No CSV file uploads will be needed.
   - The sales data will be manually uploaded by the administrator directly into Supabase.
   - The app will fetch this data from the Supabase database and display it to the users via the **Analytics Dashboard**.

   **Step-by-step breakdown**:
   - **Step 1**: Admins will use Supabase’s dashboard or SQL queries to manually upload and manage sales data in the `sales` table.
   - **Step 2**: The React app will use Supabase’s client-side API to fetch this data from the database.
   - **Step 3**: The app will perform analysis and display results to users without requiring any manual file uploads.

#### **3. Analytics Dashboard**:
   - A comprehensive page that visualizes historical data and future predictions.
   - The dashboard will have filter options to let users view sales trends by product type, date range, or region (if applicable).
   
   **Step-by-step breakdown**:
   - **Step 1**: Fetch both historical sales data and prediction data from Supabase.
   - **Step 2**: Render this data on the page using charting libraries like **Chart.js** or **Recharts** for visualizations (line charts, bar charts, etc.).
   - **Step 3**: Implement filters for product type and timeframe.
   - **Step 4**: Compare actual vs. predicted sales and generate accuracy metrics.

#### **4. Responsive Design**:
   - Ensure the entire app, including charts and forms, is fully responsive, working seamlessly on both desktop and mobile devices.
   
   **Step-by-step breakdown**:
   - **Step 1**: Use Tailwind CSS with utility classes to handle different screen sizes.
   - **Step 2**: Test layout, charts, and input forms on both mobile and desktop to ensure usability.
   - **Step 3**: Make sure interactive elements (charts, buttons) are touch-friendly for mobile users.

#### **5. Error Handling and Data Validation**:
   - Ensure that the data fetched from Supabase is clean and correctly formatted.
   - Implement error handling for any issues that arise during the data fetch (e.g., network issues or data inconsistencies).
   
   **Step-by-step breakdown**:
   - **Step 1**: Validate the format and completeness of data before processing it for predictions.
   - **Step 2**: If an error occurs while fetching data (e.g., network issues or incorrect permissions), notify the user with a friendly error message and log the error for debugging.
   - **Step 3**: Ensure that all processed data is consistent with the app's prediction algorithms.

---

## **4. High-Level Technical Stack Recommendations (Updated)**

### **Frontend (UI/UX)**:
- **React.js**: The core UI library used to build dynamic, responsive components.
- **Tailwind CSS**: A utility-first CSS framework for building a responsive, modern interface.
- **Shadcn**: A collection of prebuilt, customizable components for easy integration with React and Tailwind.
- **Lucide Icons**: A clean, lightweight icon library to give the app a polished, minimalistic look.
- **Chart.js** or **Recharts**: For rendering sales predictions and historical data visually. Both libraries support line charts, bar charts, and pie charts.

### **Backend**:
- **Supabase**: For handling database storage (PostgreSQL) and real-time data updates.
  - **PostgreSQL**: A powerful relational database used to store historical sales data and predictions.
  - **Supabase Functions**: For any complex backend logic, such as recalculating predictions when new data is fetched.

### **Deployment**:
- **Vercel** or **Netlify**: For hosting the frontend React app with continuous integration (CI) pipelines to automate deployments.

---

## **5. Detailed File Structure (Updated)**

Since file uploads have been removed, the overall file structure is simplified. The app now focuses on fetching data from Supabase and displaying it to the users.

```
/project-root
│
├── /public                # Static assets (icons, images, etc.)
│   └── /images
│
├── /src                   # All source code for the application
│   ├── /components        # Reusable UI components
│   │   ├── Button.js
│   │   ├── Chart.js
│   │   └── Navbar.js
│   │
│   ├── /pages             # Main pages (Landing page, Dashboard)
│   │   ├── LandingPage.js
│   │   ├── Dashboard.js
│   │
│   ├── /hooks             # Custom hooks for data fetching and state management
│   │   ├── useFetchSalesData.js
│   │   ├── useFetchPredictions.js
│   │
│   ├── /services          # API services for interacting with Supabase
│   │   ├── salesService.js      # Service to fetch and store sales data
│   │   └── predictionService.js # Service for handling predictions
│   │
│   ├── /utils             # Utility functions and helper methods
│   │   └── predictionLogic.js   # Core logic for calculating predictions
│   │
│   ├── /styles            # Global and component-specific styles
│   │   └── global.css
│   │
│   ├── App.js             # Main React entry point
│   └── index.js           # Main file rendering React app
│
├── tailwind.config.js      # Tailwind CSS configuration
├── .env                    # Environment variables (Supabase keys, etc.)
├── package.json            # Project dependencies
├── README.md               # Project documentation
└── masterplan.md           # This document, serving as the overall project blueprint
```

---

## **6. Error Handling and Data Validation (Updated)**

Since the CSV upload functionality has been removed, validation will now focus on the data fetched from Supabase.

### **Error Handling**:
- **Frontend**:
  - Provide user-friendly error messages for failed data fetch requests (e.g., network issues or Supabase access issues).
  - If the data cannot be fetched, show a fallback UI to inform the user that predictions cannot be made due to a lack of data.

- **Backend**:
  - Log errors when fetching data from Supabase fails (e.g., permissions issues, missing data).
  - Ensure that any potential issues are caught and handled gracefully to avoid breaking the user experience.

### **Data Validation**:
- **Fetched Data**:
  - Ensure that the data fetched from Supabase matches the expected structure (i.e., correct columns like `date`, `product_code`, etc.).
  - Validate the completeness of the data (e.g., no missing dates or negative quantities).
  
---

## **7. Detailed Core Functionalities (Step-by-Step)**

### **1. Sales Predictions**:
   - **Step 1**: Fetch and preprocess historical sales data from Supabase.
   - **Step 2**: Calculate predictions based on a **moving average algorithm**.
   - **Step 3**: Display predicted sales in the **Analytics Dashboard**.
   - **Step 4**: Provide the option to download the predictions as CSV or PDF.

### **2. Analytics Dashboard**:
   - **Step 1**: Retrieve both historical sales data and prediction data from Supabase.
   - **Step 2**: Use **Chart.js** or **Recharts** to display data visually.
   - **Step 3**: Implement filters for product type and time ranges (e.g., weekly, monthly, or yearly view).
   - **Step 4**: Allow users to toggle between actual historical sales data and predicted sales data to view trends.
   - **Step 5**: Display accuracy metrics (e.g., the difference between actual and predicted sales) to track model performance.

### **3. Data Fetching and Display (Updated)**:
   - **Step 1**: Use the Supabase client in React to fetch data from the `sales` table in real-time.
   - **Step 2**: Ensure efficient queries by leveraging the indexed `date` column for faster filtering of large datasets.
   - **Step 3**: Display the fetched data in a user-friendly table on the **Analytics Dashboard**, with options to sort by product type, date, or sales quantity.
   - **Step 4**: Use pagination or infinite scrolling to improve performance when dealing with large data sets.

### **4. Data Processing and Prediction Logic**:
   - **Step 1**: Once the sales data is fetched from Supabase, process the data to clean and normalize it (e.g., handling any missing values, calculating totals).
   - **Step 2**: Implement the **moving average algorithm** to forecast future sales. Adjust the time window (e.g., 7-day, 30-day averages) based on the selected prediction timeframe (weekly, monthly, yearly).
   - **Step 3**: Store the predicted sales data in a separate state for displaying alongside historical data.
   - **Step 4**: In future iterations, consider refining the prediction algorithm by introducing more advanced techniques (e.g., ARIMA, machine learning models).

### **5. User Feedback and Interaction**:
   - **Step 1**: Allow users (production engineer and director) to provide feedback on the accuracy and reliability of the predictions.
   - **Step 2**: Implement a simple feedback form where users can report discrepancies or suggest adjustments to the prediction model.
   - **Step 3**: Store user feedback in Supabase for future analysis and model adjustments.

---

## **8. Regular Review and Adjustment of Prediction Models**

### **1. Actual vs. Predicted Sales Analysis**:
   - **Step 1**: After fetching new sales data from Supabase, compare actual sales with the previously predicted values.
   - **Step 2**: Implement accuracy metrics such as **Mean Absolute Error (MAE)** or **Root Mean Squared Error (RMSE)** to assess the performance of the predictions.
   - **Step 3**: Display these metrics in the dashboard to give users insight into the reliability of the current prediction model.

### **2. Model Tuning Based on Feedback**:
   - **Step 1**: Periodically review user feedback and performance metrics to identify potential improvements to the prediction model.
   - **Step 2**: Adjust the parameters of the **moving average algorithm** (e.g., changing the time window) based on the results of the analysis.
   - **Step 3**: Notify users when significant model updates or improvements are made.

### **3. Continuous Learning**:
   - **Step 1**: As more data is added to the Supabase database, continuously retrain or adjust the prediction model to improve accuracy.
   - **Step 2**: Implement a semi-automated process that updates the prediction model as new data becomes available.
   - **Step 3**: Provide users with insights on how predictions are evolving over time based on the growing dataset.

---

## **9. Updated Tech Stack Documentation**

### **Frontend**:
- **React.js**: For building the dynamic user interface and managing the frontend logic.
- **Tailwind CSS**: To ensure a responsive and modern design across both desktop and mobile.
- **Shadcn**: For easily integrating prebuilt, customizable components that align with the Tailwind framework.
- **Lucide Icons**: A lightweight, clean icon library for a polished look in the UI.
- **Chart.js** or **Recharts**: For rendering the historical sales data and predictions in various chart formats.

### **Backend**:
- **Supabase**: Acts as the backend service, handling the database (PostgreSQL), authentication, and real-time data updates.
  - **PostgreSQL**: Stores all sales data and predictions.
  - **Supabase Functions**: For handling more advanced data processing, such as recalculating predictions or retrieving large datasets efficiently.

### **Deployment**:
- **Vercel** or **Netlify**: These services provide easy deployment options for your frontend React application. They also offer built-in CI/CD pipelines that automate the deployment process from GitHub.

---

## **10. Conclusion (Updated)**

The updated plan focuses on a simplified approach where sales data will be manually uploaded to Supabase, and the React app will fetch the data directly from Supabase, removing the need for file uploads by users.

### Next Steps:
1. **Set up the project**: Set up the React app using the file structure provided and install the necessary dependencies (React, Tailwind CSS, Supabase client, Chart.js, etc.).
   
2. **Supabase Setup**:
   - Create the necessary tables in Supabase (`sales`).
   - Manually upload historical sales data into the database using Supabase's dashboard or SQL queries.
   
3. **Develop Core Features**:
   - **Sales Predictions**: Implement the logic for fetching data from Supabase and generating sales predictions based on the data.
   - **Analytics Dashboard**: Build the dashboard to visualize sales data and predictions in a user-friendly way.

4. **Test and Validate Predictions**: Once the core features are built, test the accuracy of the predictions using real sales data. Gather feedback from users and adjust the prediction models accordingly.

5. **Deploy the App**: Use Vercel or Netlify to deploy the React app and make it accessible to users.

6. **Iterate and Improve**: As more sales data is manually uploaded to Supabase, continuously refine the prediction model and expand the functionality of the app to meet evolving user needs.

---

This updated masterplan provides a clear roadmap for developing the **Material Order Prediction Web Application**, focusing on manually managing data in Supabase and fetching it via the React app. By simplifying the data handling process and removing CSV uploads, this plan ensures a more streamlined user experience while retaining the core predictive functionality.

Let me know if you’d like to adjust anything further or if you need additional help!