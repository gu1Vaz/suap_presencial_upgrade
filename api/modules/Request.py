import os
import requests, json
import time

class Request():
	enabledProxy = False
	proxy = "http://specops@10.12.250.247:8080"

	url = ""
	method= "get"

	headers = None
	payload = None
	data= None
	cookies = None

	isJson = False
	contReq = 0
	
	def new(self):
		try:
			call = getattr(requests, self.method)
			r = call(self.url, data=self.payload, headers=self.headers, cookies=self.cookies)
			
			response = json.loads(r.text) if self.isJson else r.text;
			data = {
				'response':  response,
				'tam':  len(r.text),
				'headers': dict(r.headers),
				'status': r.status_code,
				'reason': r.reason
			}
		except requests.exceptions.RequestException as e:
			print("Erro na solicitação:", e)
			time.sleep(10)
			return 0
		self.data = data
		self.contReq += 1
	#proxy	
	def enableProxy(self):
		self.enabledProxy = True
		os.environ['http_proxy'] = self.proxy 
		os.environ['HTTP_PROXY'] = self.proxy
		
		
	def setProxy(self, href):
		self.proxy = href
	
	#url
	def setUrl(self, url):
		self.url = url
		
	#headers
	def setHeaders(self, headers):
		self.headers = headers

	#method
	def setMethod(self, method):
		self.method = method
	#payload
	def setPayload(self, payload):
		self.payload = payload
	
	#all
	def setAll(self, url, method="get", headers=None, payload=None, cookies=None):
		self.url = url
		self.method = method
		self.headers = headers
		self.payload = payload
		self.cookies = cookies

