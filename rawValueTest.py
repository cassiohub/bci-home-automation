from NeuroPy import NeuroPy
import serial

try:
    neuro = NeuroPy("COM3", 57600)
    neuro.start()
    print ("Neuropy found on COM3")
except:
    print "Not found"

value = 0

while True:
    value = neuro.attention
    print value
