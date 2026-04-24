marks = [72, 65, 40, 55, 35, 35, 30]
attendance = [30, 78, 30, 60, 20, 55, 30]

performance_scores = []

for i in range(len(marks)):
    score = (marks[i] * 0.7) + (attendance[i] * 0.3)
    performance_scores.append(score)

class_performance = sum(performance_scores) / len(performance_scores)

print("Overall Class Performance Score:", round(class_performance, 2))

if class_performance >= 75:
    print("Class Performance: Excellent")
elif class_performance >= 60:
    print("Class Performance: Good")
elif class_performance >= 50:
    print("Class Performance: Average")
else:
    print("Class Performance: Poor")