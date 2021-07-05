from flask import Flask
import pymysql
from flask_cors import CORS, cross_origin
import json


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def dbconnect():
    db = pymysql.connect(
        user='',
        host='',
        port=,
        charset='utf8'
    )
    return db 

def get_json_from_query_res(query_res):
    res = {k: [] for k in query_res[0]}

    keys = list(res.keys())

    for i in range(len(query_res)):
        for key in keys:
            inp_val = query_res[i][key]
            # if key == "date":
            #     inp_val = inp_val.isoformat()
            res[key].append(inp_val)
    
    json_res = json.dumps(res)
    return json_res


@app.route('/<coin>')
@cross_origin()
def show_btc(coin):
    if coin == "btc":
        table = "btc_coin"
    elif coin == "xrp":
        table = "xrp_coin"
    elif coin == "doge":
        table = "doge_coin"
    elif coin == "ethereum":
        table = "eth_coin"
    elif coin == "etc":
        table = "etc_coin"

    db = dbconnect()
    cur = db.cursor(pymysql.cursors.DictCursor)

    sql = f"select * from(select * from mybtc.{table} order by date desc)sub order by date;"
    cur.execute(sql)
    result = cur.fetchall()

    return get_json_from_query_res(result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
