from NeuroPy import NeuroPy

object1=NeuroPy("COM3", 57600) #If port not given 57600 is automatically assumed

#object1=NeuroPy("/dev/rfcomm0") for linux
def rawValue_callback(rawValue_value):
    "this function will be called everytime NeuroPy has a new value for rawValue"
    print "Value of rawValue is",rawValue_value
#do other stuff (fire a rocket), based on the obtained value of rawValue_value
#do some more stuff
    return None

#set call back:
object1.setCallBack("rawValue",rawValue_callback)

#call start method
object1.start()

while True:
	rawValue_callback(object1.rawValue)
