import pandas as pd
import matplotlib.pyplot as plt

# Loads data from a given file folder and returns a DataFrame.
def loadData(data_dir = "dummy-data"):
    dataframe = pd.read_csv(f'{data_dir}/dummy-node-data.csv', header=15)
    df = pd.DataFrame(dataframe)
    return df

# Loads a node with the given name, and compares LMP for all three scenarios.
#
# Assumes a valid node name.
def loadNode(df, node):

    # Gets values from the data.
    node_data_a = df[(df['SCENARIO_ID'] == 1) & (df["PNODE_NAME"] == node)]
    node_data_b = df[(df["SCENARIO_ID"] == 2) & (df["PNODE_NAME"] == node)]
    node_data_c = df[(df["SCENARIO_ID"] == 3) & (df["PNODE_NAME"] == node)]

    # Sets x_axis to the time series 'PERIOD_ID' and y_axis to 'LMP'.
    x_axis = node_data_a['PERIOD_ID'].map(lambda x: x[-2:]).tolist()
    y_axis_a = node_data_a['LMP'].tolist()
    y_axis_b = node_data_b['LMP'].tolist()
    y_axis_c = node_data_c['LMP'].tolist()

    return (x_axis, y_axis_a, y_axis_b, y_axis_c)

def main():

    # Change the name of this to whatever node you want to graph.
    node = 'DR.SOUTH_EAST'

    df = loadData()
    x, y1, y2, y3 = loadNode(df, node)

    # Plots something.
    plt.plot(x, y1, label = 'Base Case')
    plt.plot(x, y2, label = 'Scenario A')
    plt.plot(x, y3, label = 'Scenario B')
    plt.legend(loc="upper left")
    plt.xlabel("17-JUL-2020 (Hour)")
    plt.ylabel("LMP")
    plt.title(f'Time Series on 17-JUL-2020 for {node}')
    plt.show()

if __name__ == '__main__':
    main()
