"""把 Windows 凭据库里的 git PAT 输出到 stdout（供管道使用，不落盘、不打印日志）。
用法: TOKEN=$(python .tmp/cred-get.py git)   /   TOKEN=$(python .tmp/cred-get.py gh)
"""
import ctypes
import sys
from ctypes import wintypes

TARGETS = {
    "git": "git:https://github.com",
    "gh": "GitHub - https://api.github.com/shjdd134",
}

advapi32 = ctypes.WinDLL("advapi32", use_last_error=True)


class CREDENTIAL(ctypes.Structure):
    _fields_ = [
        ("Flags", wintypes.DWORD),
        ("Type", wintypes.DWORD),
        ("TargetName", wintypes.LPWSTR),
        ("Comment", wintypes.LPWSTR),
        ("LastWritten", wintypes.FILETIME),
        ("CredentialBlobSize", wintypes.DWORD),
        ("CredentialBlob", ctypes.POINTER(ctypes.c_byte)),
        ("Persist", wintypes.DWORD),
        ("AttributeCount", wintypes.DWORD),
        ("Attributes", ctypes.c_void_p),
        ("TargetAlias", wintypes.LPWSTR),
        ("UserName", wintypes.LPWSTR),
    ]


PCRED = ctypes.POINTER(CREDENTIAL)
pcred = PCRED()
which = sys.argv[1] if len(sys.argv) > 1 else "git"
target = TARGETS[which]

if not advapi32.CredReadW(target, 1, 0, ctypes.byref(pcred)):
    sys.stderr.write("未找到凭据: " + target + "\n")
    raise SystemExit(1)

c = pcred.contents
blob = ctypes.string_at(c.CredentialBlob, c.CredentialBlobSize)
advapi32.CredFree(pcred)
sys.stdout.write(blob.decode("utf-16-le", "ignore").strip())
