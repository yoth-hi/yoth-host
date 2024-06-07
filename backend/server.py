from http.server import BaseHTTPRequestHandler, HTTPServer
from pages import PageMain
import re

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
      if(re.match(r'^\/s\/', self.path)):
          path = re.sub(r'^\/s\/', "frontend/", self.path)
          with open(path, 'r') as file:
            content = file.read()
          self.send_response(200)
          self.send_header('Content-type', 'text/javascript')
          self.end_headers()
          self.wfile.write(content.encode())
      else:
          context = {}
          self.send_response(200)
          self.send_header('Content-type', 'text/html')
          self.end_headers()
          context["data"] = {}
          context["title"] = ""
          text = PageMain(context) 
          self.wfile.write(text)

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting httpd server on port {port}...')
    httpd.serve_forever()

if __name__ == "__main__":
    run()