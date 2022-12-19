from pymongo import MongoClient
import datetime
import pprint as pp

client = MongoClient('mongodb+srv://joshuashen:OoFZT47ql2yXfWxi@cluster0.cbbumvi.mongodb.net')
#/testpy?retryWrites=true&w=majority

def to_printer(printerName, data):
    with open(printerName, 'w') as f:
        f.write(pp.pformat(data))

field_types = {
    'SCENARIO_ID': 'int',
    'GROUP_ID': 'int',
    'PNODE_NAME': 'string',
    'PERIOD_ID': 'datetime',
    'LMP': 'float',
    'AUTHOR_GROUP_ID': 'int'
}
month_to_number = {
    'JAN': 1, 
    'FEB': 2, 
    'MAR': 3, 
    'APR': 4, 
    'MAY': 5, 
    'JUN': 6, 
    'JUL': 7, 
    'AUG': 8, 
    'SEP': 9, 
    'OCT': 10, 
    'NOV': 11, 
    'DEC': 12
}

def typeCast(field, s):
    fieldType = field_types.get(field, 'string')
    if fieldType == 'string':
        return s
    if fieldType == 'int':
        return int(s)
    if fieldType == 'datetime':
        [d, m, y, h] = s.replace('-', ' ').split()
        return datetime.datetime(year=int(y), month=month_to_number[m], day=int(d), hour=int(h)-1)
    if fieldType == 'float':
        return float(s)

def loadDB():
    group_collection.drop()
    scenario_collection.drop()
    node_collection.drop()

    with open('dummy-groups.csv', 'r') as f:
        group_data = f.readlines()
        group_data = [l.strip().split(',') for l in group_data]
        group_schema = dict(enumerate(group_data[0]))
        group_data = group_data[1:]
        groups = []
        for g in group_data:
            obj = {}
            for i, attr in enumerate(g):
                obj[group_schema[i]] = typeCast(group_schema[i], attr)
            groups.append(obj)
    with open('dummy-scenarios.csv', 'r') as f:
        scenario_data = f.readlines()
        scenario_data = [l.strip().split(',') for l in scenario_data]
        scenario_schema = {
            0: 'SCENARIO_ID',
            1: 'SCENARIO_NAME',
            2: 'AUTHOR_GROUP_ID',
        }
        scenarios = []
        for g in scenario_data:
            obj = {}
            for i, attr in enumerate(g):
                obj[scenario_schema[i]] = typeCast(scenario_schema[i], attr)
            scenarios.append(obj)
    with open('new-dummy-data1.csv', 'r') as f:
        node_data = f.readlines()
        node_data = [l.strip().split(',') for l in node_data]
        node_schema = dict(enumerate(node_data[0]))
        node_data = node_data[1:]
        node_map = {} # node to list of its data
        for n in node_data:
            obj = {}
            n_name = ''
            for i, attr in enumerate(n):
                if node_schema[i] == 'PNODE_NAME':
                    n_name = attr
                    node_map[n_name] = node_map.get(n_name, [])
                else:
                    obj[node_schema[i]] = typeCast(node_schema[i], attr)
            node_map[n_name].append(obj)
        nodes = [{
            'PNODE_NAME': n,
            'TIME_SERIES': node_map[n]
            } 
            for n in node_map.keys()]

    
    # for s in scenarios: 
    #     s['NODES'] = node_collection.insert_many([n for n in nodes if n['SCENARIO_ID'] == s['SCENARIO_ID']]).inserted_ids

    node_collection.insert_many(nodes)
    for g in groups: 
        g['SCENARIOS'] = scenario_collection.insert_many([s for s in scenarios if s['AUTHOR_GROUP_ID'] == g['GROUP_ID']]).inserted_ids
    group_collection.insert_many(groups)

    # to_printer('group_data.txt', groups)
    # to_printer('scenario_data.txt', scenarios)
    # to_printer('node_data.txt', nodes)

def indexDB():
    node_collection.drop_indexes()
    #node_collection.create_index('TIME')
    pp.pprint(node_collection.index_information())


if __name__ == '__main__':
    db = client['test']
    group_collection = db['groups']
    scenario_collection = db['scenarios']
    node_collection = db['nodes']
    # loadDB()
    # indexDB()

    pass