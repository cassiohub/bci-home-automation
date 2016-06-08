from NeuroPy import NeuroPy
import serial

try:
    neuro = NeuroPy("COM5", 57600)
    neuro.start()
    print ("Neuropy found on COM5")
except:
    print "Not found"

value = 0

while True:
    value = neuro.rawValue
    print value
