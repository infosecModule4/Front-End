import pymysql
import pandas as pd
import json

db = pymysql.connect(
    user='root',
    passwd='test1234',
    host='127.0.0.1',
    port = 13306,
    charset='utf8'
)

cur = db.cursor(pymysql.cursors.DictCursor)

sql = "select * from mycoin.bit;"
cur.execute(sql)
result = cur.fetchall()

res = dict.fromkeys(result[0], [])
keys = list(res.keys())
print(keys)
print(res)  
print(result[0])
for i in range(len(result)):
    res[keys[i]].append(result[i][keys[i]])

print(res)

# newresult=result.to_dict()
# print(newresult)

# print(json.dumps(newresult))


# for k in parsed.keys():
#     print(k," : ", end='')
#     print(parsed[k].values())