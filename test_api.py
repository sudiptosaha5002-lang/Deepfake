import urllib.request
import urllib.error
import json

url = "https://app.backboard.io/api/chat/completions"
api_key = "espr_FfCcaLn1XEd2YyFMxg1Tlhk6odUOq6voM0J6fLkOu0c"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "hi"}]
}

req = urllib.request.Request(url, headers=headers, data=json.dumps(data).encode('utf-8'))

try:
    with urllib.request.urlopen(req) as response:
        print(f"Status Code: {response.status}")
        print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
