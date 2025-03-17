
# Training data for a Brain.js model.
# This training data is for a simple classification task
# where we want to predict the species of an iris flower
# based on its sepal and petal lengths. The `iris` dataset
# is used, which contains 150 samples of iris flowers with
# 4 features (sepal length and width, and petal length and
# width) and 3 classes (setosa, versicolor, and virginica).

# The training data is split into a training set (`X_train`)
# and a test set (`X_test`), with a random state of 42 for
# reproducibility.
# The data is then normalized using the `StandardScaler`
# from scikit-learn to have similar scale for all features.

# The Brain.js model is trained on the scaled training data,
# and then used to make predictions on the test set.

import numpy as np
from sklearn import datasets
from sklearn.model_selection import train_test_split

# Load the iris dataset
iris = datasets.load_iris()
X = iris.data[:, :2]  # we only take the first two features.
y = iris.target

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Normalize the data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train a Brain.js model on the scaled data
model = BrainJS()
model.fit(X_train_scaled, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test_scaled)

