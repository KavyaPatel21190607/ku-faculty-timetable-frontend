import json

with open(r'C:\Users\Patel Kavya\Desktop\Faculty-Timetable-Managemant\frontend\src\data\facultytimetable.json','r',encoding='utf-8') as f:
    data = json.load(f)

# Show SHS Monday slots
shs = data[0]
print('=== SHS Monday ===')
for s in shs['timetable'][0]['slots']:
    print('  P{}: {} | {} | {}'.format(s['period'], s['time'], s['type'], repr(s['subject'])))

print()
# Show UL Monday slots
ul = [d for d in data if d['faculty_name'] == 'Ms. Upasana Leela'][0]
print('=== UL Monday ===')
for s in ul['timetable'][0]['slots']:
    print('  P{}: {} | {} | {}'.format(s['period'], s['time'], s['type'], repr(s['subject'])))

print()
# D.AK Tuesday
dak = [d for d in data if d['faculty_name'] == 'Dr. Animesh Kumar Agrawal'][0]
print('=== D.AK Tuesday ===')
for s in dak['timetable'][1]['slots']:
    if s['type'] != 'Break':
        print('  P{}: {} | {}'.format(s['period'], s['type'], repr(s['subject'])))

print()
# Count types
theory = lab = brk = 0
for d in data:
    for day in d['timetable']:
        for s in day['slots']:
            if s['type'] == 'Theory': theory += 1
            elif s['type'] == 'Lab': lab += 1
            elif s['type'] == 'Break': brk += 1
print('Type counts: Theory={}, Lab={}, Break={}'.format(theory, lab, brk))
