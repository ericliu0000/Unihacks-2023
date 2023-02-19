# https://stackoverflow.com/questions/52899174/real-time-ocr-in-python

# https://stackoverflow.com/questions/37745519/use-pytesseract-ocr-to-recognize-text-from-an-image

# https://docs.opencv.org/4.7.0/dd/d43/tutorial_py_video_display.html

import sys
import pytesseract
import PIL
import cv2 as cv

capture = cv.VideoCapture(0)

capture.set(cv.CAP_PROP_FRAME_WIDTH, 1280)
capture.set(cv.CAP_PROP_FRAME_HEIGHT, 720)


if not capture.isOpened():
    print("Cannot open camera")
    exit()

while True:
    # Capture frame-by-frame
    ret, frame = capture.read()
    # if frame is read correctly ret is True
    if not ret:
        print("Can't receive frame (stream end?). Exiting ...")
        break

    # print(type(frame))

    # Our operations on the frame come here
    gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    blur = cv.GaussianBlur(gray, (1, 1), 0)
    threshold = cv.threshold(blur, 0, 255, cv.THRESH_OTSU)[1]

    # threshold = cv.adaptiveThreshold(blur, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2)

    # Morph open to remove noise and invert image
    kernel = cv.getStructuringElement(cv.MORPH_RECT, (3, 3))
    opening = cv.morphologyEx(threshold, cv.MORPH_OPEN, kernel, iterations=1)
    # invert = 255 - opening
    invert = opening

    data = pytesseract.image_to_string(invert, lang='eng', config='--psm 11').strip()
    if len(data) > 0:
        print(data)

    # Display the resulting frame
    cv.imshow('frame', invert)
    if cv.waitKey(1) == ord('q'):
        break

# When everything done, release the capture
capture.release()
cv.destroyAllWindows()


# # Import ImageGrab if possible, might fail on Linux
# try:
#     from PIL import ImageGrab
#     use_grab = True
# except Exception as ex:
#     # Some older versions of pillow don't support ImageGrab on Linux
#     # In which case we will use XLib
#     if (sys.platform == 'linux'):
#         from Xlib import display, X
#         use_grab = False
#     else:
#         raise ex


# def screenGrab(rect):
#     """ Given a rectangle, return a PIL Image of that part of the screen.
#         Handles a Linux installation with and older Pillow by falling-back
#         to using XLib """
#     global use_grab
#     x, y, width, height = rect

#     if (use_grab):
#         image = PIL.ImageGrab.grab(bbox=[x, y, x+width, y+height])
#     else:
#         # ImageGrab can be missing under Linux
#         dsp = display.Display()
#         root = dsp.screen().root
#         raw_image = root.get_image(x, y, width, height, X.ZPixmap, 0xffffffff)
#         image = PIL.Image.frombuffer("RGB", (width, height), raw_image.data, "raw", "BGRX", 0, 1)
#         # DEBUG image.save( '/tmp/screen_grab.png', 'PNG' )
#     return image


# # Do some rudimentary command line argument handling
# # So the user can speicify the area of the screen to watch
# if (__name__ == "__main__"):
#     EXE = sys.argv[0]
#     del(sys.argv[0])

#     # EDIT: catch zero-args
#     if (len(sys.argv) != 4 or sys.argv[0] in ('--help', '-h', '-?', '/?')):  # some minor help
#         sys.stderr.write(EXE + ": monitors section of screen for text\n")
#         sys.stderr.write(EXE + ": Give x, y, width, height as arguments\n")
#         sys.exit(1)

#     # TODO - add error checking
#     x = int(sys.argv[0])
#     y = int(sys.argv[1])
#     width = int(sys.argv[2])
#     height = int(sys.argv[3])

#     # Area of screen to monitor
#     screen_rect = [x, y, width, height]
#     print(EXE + ": watching " + str(screen_rect))

#     # Loop forever, monitoring the user-specified rectangle of the screen
#     while (True):
#         image = screenGrab(screen_rect)              # Grab the area of the screen
#         text = pytesseract.image_to_string(image)   # OCR the image

#         # IF the OCR found anything, write it to stdout.
#         text = text.strip()
#         if (len(text) > 0):
#             print(text)
