import requests

def phone_number_verfification():
    """
    Function to verify phone number
    """
    pass



def send_otp(phone_number:str, token_length:str, expiration_time:str, api_key:str):
    """
    Function to send OTP
    """
    url = "https://api.sendchamp.com/api/v1/verification/create"

    payload = {
        "meta_data": { "first_name": "verifyme" },
        "channel": "sms",
        "sender": "Sendchamp | Approved",
        "token_type": "numeric",
        "token_length": token_length,
        "expiration_time": expiration_time,
        "customer_mobile_number": phone_number,
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    response = requests.post(url, json=payload, headers=headers)

    return response


def verify_otp(verification_reference:str, verification_code:str, api_key:str):
    """
    Function to verify OTP
    """
    url = "https://api.sendchamp.com/api/v1/verification/confirm"

    payload = {
        "verification_reference": verification_reference,
        "verification_code": verification_code
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    response = requests.post(url, json=payload, headers=headers)

    return response
