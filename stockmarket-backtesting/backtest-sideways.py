import numpy as np

np.random.seed(42)

start = 1.0
n_days = 252

mu = 0.0
sigma = 0.015

idx = [start]
for _ in range(n_days):
    r = np.random.normal(mu, sigma)
    idx.append(idx[-1] * (1 + r))

idx = np.array(idx)

bull = [1.0]
bear = [1.0]
for i in range(1, len(idx)):
    r = (idx[i] / idx[i-1]) - 1
    bull.append(bull[-1] * (1 + 3*r))
    bear.append(bear[-1] * (1 - 3*r))

bull = np.array(bull)
bear = np.array(bear)

portfolio = 20000 * bull + 10000 * bear

result = {
    'index_start': float(idx[0]),
    'index_end': float(idx[-1]),
    'index_return_pct': float((idx[-1]/idx[0]-1)*100),
    'bull_return_pct': float((bull[-1]/bull[0]-1)*100),
    'bear_return_pct': float((bear[-1]/bear[0]-1)*100),
    'portfolio_start': float(portfolio[0]),
    'portfolio_end': float(portfolio[-1]),
    'portfolio_return_pct': float((portfolio[-1]/portfolio[0]-1)*100)
}

import pandas as pd
pd.DataFrame([result]).to_csv('backtest_sideways_leveraged.csv', index=False)

result