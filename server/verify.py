import requests

url = "https://api.sendchamp.com/api/v1/verification/confirm"

payload = {
    "verification_reference": "MN-OTP-825f4530-0017-46d1-976c-2cac554fe425",
    "verification_code": "431173"
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "Authorization": "Bearer sendchamp_live_$2a$10$ME2sI3b9Er6HR1Fe2dStIuND79ZKiui7bOHWcIMXNZVfhAcZ3E2t6"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)