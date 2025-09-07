import ctypes
import time
import threading
import keyboard

# === SendInput struct & helper ===
PUL = ctypes.POINTER(ctypes.c_ulong)

class KEYBDINPUT(ctypes.Structure):
    _fields_ = [("wVk", ctypes.c_ushort),
                ("wScan", ctypes.c_ushort),
                ("dwFlags", ctypes.c_ulong),
                ("time", ctypes.c_ulong),
                ("dwExtraInfo", PUL)]

class MOUSEINPUT(ctypes.Structure):
    _fields_ = [("dx", ctypes.c_long),
                ("dy", ctypes.c_long),
                ("mouseData", ctypes.c_ulong),
                ("dwFlags", ctypes.c_ulong),
                ("time",ctypes.c_ulong),
                ("dwExtraInfo", PUL)]

class HARDWAREINPUT(ctypes.Structure):
    _fields_ = [("uMsg", ctypes.c_ulong),
                ("wParamL", ctypes.c_short),
                ("wParamH", ctypes.c_ushort)]

class _INPUTunion(ctypes.Union):
    _fields_ = [("ki", KEYBDINPUT),
                ("mi", MOUSEINPUT),
                ("hi", HARDWAREINPUT)]

class INPUT(ctypes.Structure):
    _fields_ = [("type", ctypes.c_ulong),
                ("union", _INPUTunion)]

INPUT_MOUSE = 0
INPUT_KEYBOARD = 1

KEYEVENTF_KEYUP = 0x0002
KEYEVENTF_SCANCODE = 0x0008


MOUSEEVENTF_RIGHTDOWN = 0x0008
MOUSEEVENTF_RIGHTUP = 0x0010
MOUSEEVENTF_LEFTDOWN = 0x0002
MOUSEEVENTF_LEFTUP = 0x0004

SendInput = ctypes.windll.user32.SendInput

def PressKey(scan_code):
    extra = ctypes.c_ulong(0)
    ii = _INPUTunion()
    ii.ki = KEYBDINPUT(0, scan_code, KEYEVENTF_SCANCODE, 0, ctypes.pointer(extra))
    x = INPUT(INPUT_KEYBOARD, ii)
    SendInput(1, ctypes.pointer(x), ctypes.sizeof(x))

def ReleaseKey(scan_code):
    extra = ctypes.c_ulong(0)
    ii = _INPUTunion()
    ii.ki = KEYBDINPUT(0, scan_code, KEYEVENTF_SCANCODE | KEYEVENTF_KEYUP, 0, ctypes.pointer(extra))
    x = INPUT(INPUT_KEYBOARD, ii)
    SendInput(1, ctypes.pointer(x), ctypes.sizeof(x))

def MouseEvent(flags):
    extra = ctypes.c_ulong(0)
    ii = _INPUTunion()
    ii.mi = MOUSEINPUT(0, 0, 0, flags, 0, ctypes.pointer(extra))
    x = INPUT(INPUT_MOUSE, ii)
    SendInput(1, ctypes.pointer(x), ctypes.sizeof(x))

# ==== ScanCodes ====
SCANCODE_S = 0x1F
SCANCODE_SHIFT = 0x2A
SCANCODE_SPACE = 0x39
SCANCODE_D = 0x20
SCANCODE_A = 0x1E
SCANCODE_R = 0x13
SCANCODE_H = 0x23
SCANCODE_W = 0x11 


# === GLOBAL MODE ===
current_mode = 1

def set_mode_bottle():
    global current_mode
    current_mode = 1
    print("[Mode] Bottle")

def set_mode_poolcue():
    global current_mode
    current_mode = 2
    print("[Mode] Poolcue")

# === MACROS ===
def macro_one_for_E_mode1():
    print("[Bottle] Newtick")
    MouseEvent(MOUSEEVENTF_RIGHTDOWN)
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_RIGHTUP)
    time.sleep(0.01)

    PressKey(SCANCODE_S)
    time.sleep(0.01)
    ReleaseKey(SCANCODE_S)
    time.sleep(0.01)

    MouseEvent(MOUSEEVENTF_LEFTDOWN)
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_LEFTUP)
    time.sleep(0.01)

    MouseEvent(MOUSEEVENTF_RIGHTDOWN)
    time.sleep(0.01)

    PressKey(SCANCODE_SPACE)
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_RIGHTUP)
    time.sleep(0.01)
    ReleaseKey(SCANCODE_SPACE)
    MouseEvent(MOUSEEVENTF_RIGHTDOWN)
    MouseEvent(MOUSEEVENTF_RIGHTUP)



def macro_one_for_E_mode2():
    print("[Poolcue] ไม้ยก")
    MouseEvent(MOUSEEVENTF_RIGHTDOWN)
    MouseEvent(MOUSEEVENTF_RIGHTUP)
    PressKey(SCANCODE_SHIFT)
    PressKey(SCANCODE_A)
    PressKey(SCANCODE_S)
    time.sleep(0.01)

    MouseEvent(MOUSEEVENTF_LEFTDOWN)
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_LEFTUP)
    time.sleep(0.01)
    ReleaseKey(SCANCODE_S)
    ReleaseKey(SCANCODE_A)
    time.sleep(0.01)

    MouseEvent(MOUSEEVENTF_RIGHTDOWN)
    time.sleep(0.03)

    PressKey(SCANCODE_SPACE)
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_RIGHTUP)
    time.sleep(0.01)
    ReleaseKey(SCANCODE_SPACE)
    time.sleep(0.05)
    ReleaseKey(SCANCODE_SHIFT)
    MouseEvent(MOUSEEVENTF_RIGHTDOWN)
    MouseEvent(MOUSEEVENTF_RIGHTUP)


def macro_one_for_R_mode1():
    print("[Bottle] เตะอีโม")
    PressKey(SCANCODE_SHIFT)
    MouseEvent(MOUSEEVENTF_LEFTDOWN)
    time.sleep(0.01)
    PressKey(SCANCODE_R)
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_LEFTUP)
    time.sleep(0.01)
    ReleaseKey(SCANCODE_R) 
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_RIGHTDOWN)
    time.sleep(0.01)
    PressKey(SCANCODE_SPACE)
    time.sleep(0.02)
    MouseEvent(MOUSEEVENTF_RIGHTUP)
    time.sleep(0.01)
    ReleaseKey(SCANCODE_SPACE)
    time.sleep(0.01)
    ReleaseKey(SCANCODE_SHIFT)

   

def macro_one_for_R_mode2():
    print("[Poolcue] ปิดตัวชุบ")
    PressKey(SCANCODE_S)
    time.sleep(0.01)
    ReleaseKey(SCANCODE_S)
    PressKey(SCANCODE_D)
    time.sleep(0.01)
    ReleaseKey(SCANCODE_D)
    time.sleep(0.02)
    PressKey(SCANCODE_SHIFT)
    PressKey(SCANCODE_A)
    PressKey(SCANCODE_S)
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_LEFTDOWN)
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_LEFTUP)
    time.sleep(0.01)
    ReleaseKey(SCANCODE_S)
    ReleaseKey(SCANCODE_A)
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_RIGHTDOWN)
    time.sleep(0.5)

    PressKey(SCANCODE_SPACE)
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_RIGHTUP)
    time.sleep(0.01)
    ReleaseKey(SCANCODE_SPACE)
    time.sleep(0.05)
    ReleaseKey(SCANCODE_SHIFT)
    MouseEvent(MOUSEEVENTF_RIGHTDOWN)
    MouseEvent(MOUSEEVENTF_RIGHTUP)


    # PressKey(SCANCODE_SHIFT)
    # PressKey(SCANCODE_D)
    # time.sleep(0.01)
    # ReleaseKey(SCANCODE_SHIFT)
    # time.sleep(0.11)
    # MouseEvent(MOUSEEVENTF_LEFTDOWN)
    # time.sleep(0.1)
    # MouseEvent(MOUSEEVENTF_RIGHTDOWN)
    # time.sleep(0.2)
    # PressKey(SCANCODE_W)
    # MouseEvent(MOUSEEVENTF_LEFTUP)
    # MouseEvent(MOUSEEVENTF_RIGHTUP)
    # ReleaseKey(SCANCODE_D)
    # ReleaseKey(SCANCODE_W)


def macro_one_for_booth():
    print("[Booth] คน")
    MouseEvent(MOUSEEVENTF_LEFTDOWN)
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_LEFTUP)
    time.sleep(0.01)
    PressKey(SCANCODE_R)
    time.sleep(0.03)

    MouseEvent(MOUSEEVENTF_RIGHTDOWN)
    time.sleep(0.07)

    PressKey(SCANCODE_SPACE)
    time.sleep(0.15)
    ReleaseKey(SCANCODE_SPACE)
    time.sleep(0.01)
    PressKey(SCANCODE_SPACE)
    time.sleep(0.05)
    ReleaseKey(SCANCODE_SPACE)
    time.sleep(0.01)
    MouseEvent(MOUSEEVENTF_RIGHTUP)
    ReleaseKey(SCANCODE_R)


# === MACRO EXECUTION WRAPPERS ===
def run_E_by_mode():
    if current_mode == 1:
        start_macro_thread(macro_one_for_E_mode1)
    elif current_mode == 2:
        start_macro_thread(macro_one_for_E_mode2)

def run_R_by_mode():
    if current_mode == 1:
        start_macro_thread(macro_one_for_R_mode1)
    elif current_mode == 2:
        start_macro_thread(macro_one_for_R_mode2)

def run_booth_by_mode():
    if current_mode == 1:
        start_macro_thread(macro_one_for_booth)
    elif current_mode == 2:
        start_macro_thread(macro_one_for_booth)        

def start_macro_thread(func):
    t = threading.Thread(target=func)
    t.start()

# === Bind hotkeys ===
keyboard.add_hotkey('7', set_mode_bottle)
keyboard.add_hotkey('8', set_mode_poolcue)
# keyboard.add_hotkey('r', run_booth_by_mode)
keyboard.add_hotkey('e', run_E_by_mode)
keyboard.add_hotkey('r', run_R_by_mode)

print("[*] Macro System Ready!")
print("  [7] ➜ Switch to Bottle")
print("  [8] ➜ Switch to Poolcue")
print("Press [ESC] to exit.")

keyboard.wait('F9')
print("[*] Exiting...")
