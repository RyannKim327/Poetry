import json

from db import database

a = database()

with open("file.json", "w") as f:
    b = list(a.query("SELECT * FROM poems;").fetchall())
    d = []
    for c in b:
        d.append({"title": c[1], "content": c[2]})
    f.write(json.dumps(d, indent=2))
