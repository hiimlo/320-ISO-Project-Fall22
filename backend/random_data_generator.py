import csv
import pprint as pp
import random 






# to print list of strings
def to_printer(printerName, data):
    with open(printerName, 'w') as f:
        f.write(pp.pformat(data))


days = {
    'JAN': 31, 
    'FEB': 28, 
    'MAR': 31, 
    'APR': 30, 
    'MAY': 31, 
    'JUN': 30, 
    'JUL': 31, 
    'AUG': 31, 
    'SEP': 30, 
    'OCT': 31, 
    'NOV': 30, 
    'DEC': 31
}
month_to_base_lmp = {
    'JAN': 86, 
    'FEB': 88, 
    'MAR': 65, 
    'APR': 33, 
    'MAY': 31, 
    'JUN': 44, 
    'JUL': 54, 
    'AUG': 63, 
    'SEP': 44, 
    'OCT': 59, 
    'NOV': 76, 
    'DEC': 93
}
months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
years = ['2020, 2021, 2022']
hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
scenarios = 3
# LMP seems to spike in the middle of the day and then go back down

if __name__ == '__main__':
    with open('backend/dummy-data/dummy-node-data.csv', 'r') as f:
        data = f.readlines()[1:]
    data = [d.strip().split(',') for d in data]
    nodes = [d[1] for d in data]
    to_printer('dummy.txt', data)
    nodes = list(set(nodes))
    pp.pprint(nodes)
    print(len(nodes))

    newData = ['SCENARIO_ID,PNODE_NAME,PERIOD_ID,LMP\n']
    # 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 11, 10, 9, 8, 7, 
    def randLMP(lmp, i, s, h):
        return round(
            i*random.uniform(-1, 1) + 
            (s-1)*100+ 
            lmp * (1 + 0.05*(int(h) if int(h) <= 12 else 24- int(h))) + 
            8*random.uniform(-1, 1), 2
        )
    def randLMP2(i):
        # if i%3 == 1:
        return random.uniform(40, 80)
    for i, n in enumerate(nodes):
        for s in range(1, scenarios+1):
            y = '2020'
            for m in months:
                lmp = month_to_base_lmp[m]
                for d in range(1, days[m]+1):
                    for h in hours:
                        row = f'{s},{n},'
                        row += f'{d}-{m}-{y} {h},'
                        rowLMP = str(randLMP2(i))
                        if len(rowLMP.split('.')[1]) == 1:
                            rowLMP += '0'
                        row += f'{rowLMP}\n'
                        newData.append(row)
                lmp += 2
    
    with open('backend/dummy-data/dummy-node-data.csv', 'w') as f:
        f.writelines(newData)

