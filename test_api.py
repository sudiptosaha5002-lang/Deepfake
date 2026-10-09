import urllib.request
import urllib.error
import json

base_url = "https://app.backboard.io/api"
api_key = "espr_wlDf8qpEIX5IJJk2KHHmnZvAhiQR3qVYaAQLxhvbgVA"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Accept": "application/json"
}

endpoints = [
    "/v1/models",
    "/models",
    "/user",
    "/me",
    "/users/me",
    "/agents"
]

for ep in endpoints:
    url = base_url + ep
    req = urllib.request.Request(url, headers=headers)
    print(f"Testing {url} ...")
    try:
        with urllib.request.urlopen(req) as response:
            print(f"  Status Code: {response.status}")
            print("  " + response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        print(f"  HTTP Error: {e.code}")
        print("  " + e.read().decode('utf-8'))
    except Exception as e:
        print(f"  Error: {e}")
