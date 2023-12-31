from flask import Flask,request
from modules.Request import Request
from enums import urls_suap, urls_presencial, default_headers
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

req = Request()
req.enableProxy()

def fix_cookies(cookies_raw):
    cookies_raw = cookies_raw["headers"]["Set-Cookie"].split(";")
    cookies = {}
    for cookie in cookies_raw:
        if cookie.find("__Host") != -1:
            cookie_parts = cookie.split("=")
            cookies[cookie_parts[0].replace(" Secure, ", "")] = cookie_parts[1]
    return cookies

@app.route('/loginSuap', methods=['POST'])
def loginSuap():

    req.setAll(urls_suap["login"])
    req.new()

    cookies  = fix_cookies(req.data)

    payload = {'csrfmiddlewaretoken':cookies["__Host-csrftoken"],
		   'username':request.json.get('username'),
           'password':request.json.get('password')}
           


    req.setAll(urls_suap["login"],"post", default_headers, payload, cookies);
    req.new()
    token = fix_cookies(req.data)

    return token


@app.route('/loginPresencial', methods=['POST'])
def loginPresencial():
    cookies = {"MoodleSession":"nonegui"}
    payload = {'username':request.json.get('username'),
           'password':request.json.get('password')}
    req.setAll(urls_presencial["login"],"post", default_headers, payload, cookies)
    req.new()
    return req.data

@app.route('/getBoletim', methods=['GET'])
def getBoletim():
    token = {"__Host-sessionid":request.args.get('token')}
    id = request.args.get('id')
    
    req.setAll(urls_suap["boletim"].format(matricula=id), headers=default_headers, cookies=token)
    req.new()
    return req.data["response"]

if __name__ == '__main__':
    app.run(debug=True, port=8000)