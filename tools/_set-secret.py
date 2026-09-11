# 一次性：把 DEEPL_KEY 写入仓库 Actions Secret（PyNaCl sealed box）。用后即删。
import json, sys, base64, urllib.request
from nacl import encoding, public

token = sys.argv[1]
key = open("tools/.deepl-key", encoding="utf8").read().strip()
H = {"Authorization": "Bearer " + token, "Accept": "application/vnd.github+json"}

def req(url, data=None, method=None):
    r = urllib.request.Request(url, data=json.dumps(data).encode() if data else None,
                               headers={**H, "Content-Type": "application/json"}, method=method)
    return urllib.request.urlopen(r, timeout=20)

pk = json.load(req("https://api.github.com/repos/SHJDD134/ciyue/actions/secrets/public-key"))
pk_obj = public.PublicKey(pk["key"].encode(), encoding.Base64Encoder())
sealed = public.SealedBox(pk_obj).encrypt(key.encode())
res = req("https://api.github.com/repos/SHJDD134/ciyue/actions/secrets/DEEPL_KEY",
          {"encrypted_value": base64.b64encode(sealed).decode(), "key_id": pk["key_id"]}, method="PUT")
print("secret DEEPL_KEY 写入:", res.status)
