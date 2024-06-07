import json
import re

def PageMain(context):
  data = context.get("data")
  title = context.get("title","ye")
  sdata = json.dumps(data)
  html = f"""
  <!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
      <link rel="preload" href="s/desktop/app.js" as="script" />
      <script src="s/desktop/app.js" type="module" charset="utf-8"></script>
    </head>
    <body>
      <yed-app></yed-app>
      <script type="text/javascript" charset="utf-8">
        var response={sdata};
      </script>
    </body>
  </html>
  """
  return   re.sub(r' {2,}', " ", html).encode('utf-8')