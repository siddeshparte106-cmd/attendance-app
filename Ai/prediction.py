import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression


data = {
    "Attendance": [
        95, 88, 76, 65, 54, 92, 81, 73, 60, 47,
        85, 78, 69, 58, 90, 82, 74, 66, 59, 45,
        98, 83, 71, 62, 50, 87, 79, 68, 57, 43
    ],
    
    "Marks": [
        91, 84, 72, 55, 40, 89, 77, 68, 52, 35,
        80, 74, 60, 48, 86, 79, 70, 58, 46, 33,
        94, 81, 66, 54, 42, 83, 75, 63, 49, 30
    ],
    
    "IQ": [
        120, 115, 105, 98, 85, 118, 110, 102, 95, 80,
        112, 108, 100, 92, 117, 109, 103, 97, 90, 78,
        125, 113, 101, 96, 88, 114, 107, 99, 91, 75
    ],
    
    "Result": [
        1, 1, 1, 1, 0, 1, 1, 1, 1, 0,
        1, 1, 1, 0, 1, 1, 1, 1, 0, 0,
        1, 1, 1, 1, 0, 1, 1, 1, 0, 0
    ]
}

df = pd.DataFrame(data)

X = df[["Attendance", "Marks", "IQ"]]
y = df["Result"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LogisticRegression()
model.fit(X_train, y_train)

import pandas as pd

new_data = pd.DataFrame({
    "Attendance": [60],
    "Marks": [35],
    "IQ": [120]
})

prediction = model.predict(new_data)

print("Predicted Result:", "Pass" if prediction[0] == 1 else "Fail")

prob = model.predict_proba(new_data)
print("Pass Probability:", prob[0][1] * 100, "%")