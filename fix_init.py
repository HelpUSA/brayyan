import os
underscore = chr(95)
name = underscore + underscore + 'init' + underscore + underscore + '.py'
paths = [
 'D:/dev/brayyan/backend/routers',
 'D:/dev/brayyan/backend/models',
 'D:/dev/brayyan/backend/schemas',
 'D:/dev/brayyan/backend/services',
 'D:/dev/brayyan/backend/tasks',
]
for p in paths:
 fname = os.path.join(p, name)
 f = open(fname, 'w')
 f.close()
 print('Created:', fname)
print('Done')
