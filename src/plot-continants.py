import plotly.express as px

# Example data, in reality, this should be replaced with the actual data.
# The values here are rough estimates and not accurate.
continents = ['Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia']
area = [44579000, 30370000, 24709000, 17840000, 14000000, 10180000, 8600000] # in square kilometers

# Create a vertical bar chart
fig = px.bar(x=continents, y=area, title="Area of Continents", labels={'x':'Continent', 'y':'Area (sq km)'})

# Show figure
fig.show()
