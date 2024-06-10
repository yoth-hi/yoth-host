import json
import re
from jinja2 import Template

with open('frontend/desktop/index.html', 'r') as file:
    d = file.read()
def PageMain(context):
  context["sdata"] = json.dumps(context.get("data", {}))
  html = d.replace("./app.js", "/s/desktop/app.js")
  html = Template(html)
  html = html.render(context)

  return   re.sub(r' {2,}', " ", html).encode('utf-8')

