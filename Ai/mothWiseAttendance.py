import matplotlib.pyplot as plt

# Month names
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

# Student attendance percentage month-wise
attendance = [85, 78, 92, 88, 40, 35, 95, 89, 73, 20, 90, 79]

# Create bar chart
plt.figure()
plt.bar(months, attendance)

plt.xlabel("Month")
plt.ylabel("Attendance Percentage")
plt.title("Month-wise Attendance of Student")
plt.xticks(rotation=45)

plt.show()