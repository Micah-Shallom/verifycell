# import requests

# url = "https://api.sendchamp.com/api/v1/verification/create"

# payload = "channel=sms&sender=Sendchamp&token_type=numeric&token_length=6&expiration_time=10&customer_mobile_number=2349071111150&meta_data=&in_app_token=false"

# # payload = {
# #     "meta_data": { "first_name": "verifyme" },
# #     "channel": "sms",
# #     "sender": "Sendchamp",
# #     "token_type": "numeric",
# #     "token_length": 6,
# #     "expiration_time": 10,
# #     "customer_mobile_number": "+2349071111150",
# #     "token": "sendchamp_live_$2a$10$ME2sI3b9Er6HR1Fe2dStIuND79ZKiui7bOHWcIMXNZVfhAcZ3E2t6"
# # }

# headers = {
#     "Accept": "application/json,text/plain,*/*",
#     "Content-Type": "application/json",
#     "Authorization": "Bearer sendchamp_live_$2a$10$ME2sI3b9Er6HR1Fe2dStIuND79ZKiui7bOHWcIMXNZVfhAcZ3E2t6"
# }

# response = requests.request("POST", url, data=payload, headers=headers)

# print(response.text)


import requests

url = "https://api.sendchamp.com/api/v1/verification/create"

payload = {
    "meta_data": { "first_name": "verifyme" },
    "channel": "sms",
    "sender": "Sendchamp | Approved",
    "token_type": "numeric",
    "token_length": 6,
    "expiration_time": 10,
    "customer_mobile_number": "2349071111150",
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "Authorization": "Bearer sendchamp_live_$2a$10$ME2sI3b9Er6HR1Fe2dStIuND79ZKiui7bOHWcIMXNZVfhAcZ3E2t6"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)